import { usePreference } from "@/components/providers/PreferenceProvider";
import useWindowSize from "@/hooks/useWindowSize";
import { AnimeStreamingSourceType, DetailAnimeInfoType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import { ScreenFullTypeEnum } from "@/types/player";
import isMobileDevice from "@/utils/getIsMobileDevice";
import getPreviouslyWatchedTill from "@/utils/getPreviouslyWatchedTill";
import { getSkipTimes } from "@/utils/getSkipTimes";
import setWatchedTill from "@/utils/setWatchedTill";
import axios, { isAxiosError } from "axios";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import PlayerControl from "./PlayerControl";
import PlayerLoader from "./PlayerLoader";
import PlayerSkipBtns from "./PlayerSkipBtns";
import PreferenceSettingModal from "./PreferenceSettingModal";
import QualitySelectModal from "./QualitySelectModal";
import reducer from "./reducerFunc";

let count = 0;

function Player({
  animeId,
  title,
  epNo,
  epId,
  isDub,
  detailInfo,
}: {
  animeId: string;
  title?: string;
  epNo: string;
  epId: string;
  isDub: boolean;
  detailInfo: DetailAnimeInfoType;
}) {
  const { windowWidth, windowHeight } = useWindowSize();
  const router = useRouter();
  const { data: session } = useSession();

  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReactPlayer | null>(null);
  const controllerRef = useRef<HTMLDivElement | null>(null);

  const {
    autoPlay: isAutoPlayEnabled,
    autoNext: isAutoNextEnabled,
    playbackQuality,
  } = usePreference();
  const appElement = document.getElementById("App");

  const [markWatchedTill, setMarkWatchedTill] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    pip: false,
    playing: false,
    volume: isMobileDevice() ? 1 : 0.85, //  value -> 0-1
    muted: false,
    played: 0, //  value -> 0-1
    duration: 0,
    loaded: 0,
    // light: false,
    // playbackRate: 1.0,
    // loop: false,
    sources: [],
    currentSource: null,
    playbackQuality: playbackQuality || "360p",
    buffering: false,
    videoAspectRatio: 16 / 9,
    playerFullScreen: false,
    FullScreenType: 0, // value -> 0=>>default 1=>>maxWidth 2=>>16:9
    isMobileDevice: isMobileDevice(),
    controllerVisibility: true,
    skipTimes: [],
    isQualitySelectionOpen: false,
    isSettingSectionOpen: false,
  });

  const handleSeekToUnwatched = async () => {
    const previouslyWatchedTill = await getPreviouslyWatchedTill(
      animeId,
      epNo,
      session
    );

    if (previouslyWatchedTill && playerRef.current) {
      playerRef.current.seekTo(previouslyWatchedTill * state.duration);
    }
  };

  const handleEnded = () => {
    if (isAutoNextEnabled && detailInfo?.episodes) {
      const currentEpIdx = detailInfo.episodes.findIndex(
        (ep) => ep.id === epId
      );
      screenfull.exit();
      if (screen.orientation.unlock) screen.orientation.unlock();
      dispatch({ type: "minimizeMaximize", payload: false });

      // if the current episode is last episode
      if (
        detailInfo.episodes[detailInfo.episodes.length - 1].id ===
        detailInfo.episodes[currentEpIdx].id
      ) {
        dispatch({ type: "disablePlaying" });
      }

      const nextEp = detailInfo.episodes[currentEpIdx + 1];
      router.push(
        `/watch/${detailInfo.id}/${nextEp.number}/${nextEp.id}?dub=${isDub}`
      );
    } else {
      dispatch({ type: "disablePlaying" });
    }
  };

  // On initial page load or episode change fetch streaming links
  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: ApiSuccessType<AnimeStreamingSourceType> } =
          await axios.get(`/api/anime/streaming-links/${epId}`);
        dispatch({
          type: "updateStreamingLinks",
          payload: {
            sources: data.data.sources,
            currentSource:
              data.data.sources.find(
                (source) => source.quality === state.playbackQuality
              ) || data.data.sources[0],
            playing: isAutoPlayEnabled,
          },
        });
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.message);
        }
      }
    })();

    // before name change update watchTill
    return () => {
      (async () => {
        await setWatchedTill(animeId, epNo, state.played, session);
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epId]);

  // On initial page load or episode change and on load of video playing duration fetch skip times
  useEffect(() => {
    if (detailInfo?.malId && state.duration != 0) {
      (async () => {
        if (detailInfo.malId) {
          const skipTimes = await getSkipTimes(
            detailInfo.malId,
            epNo,
            state.duration
          );

          if (skipTimes) {
            dispatch({ type: "setSkipTimes", payload: skipTimes });
          }
        }
      })();
    }
  }, [detailInfo?.malId, epNo, state.duration]);

  // on specific time during video playing the video played till save in db
  useEffect(() => {
    const handlePlaybackProgress = async () => {
      if (state.played >= markWatchedTill + 0.04) {
        setMarkWatchedTill(state.played);
        await setWatchedTill(animeId, epNo, state.played, session);
      }
    };
    handlePlaybackProgress();
  }, [state.played, markWatchedTill, session, animeId, epNo]);

  const handleMouseMove = () => {
    if (appElement && controllerRef?.current) {
      controllerRef.current.style.display = "block";
      setTimeout(function () {
        if (controllerRef?.current) controllerRef.current.style.opacity = "1";
      }, 100);
      dispatch({ type: "changeControllerVisibility", payload: true });
      appElement.style.cursor = "auto";
      count = 0;
    }
  };

  const handleMouseLeave = () => {
    count = 0;
  };

  return (
    <div
      id="Player"
      className={classNames("relative", {
        "flex items-center justify-center": state.playerFullScreen,
        "aspect-video w-full overflow-hidden bg-black xxs:rounded-lg":
          state.loaded === 0,
      })}
    >
      <div
        ref={playerContainerRef}
        className={classNames("w-full bg-black", {
          "h-full": state.loaded === 0,
          "h-full max-w-full":
            state.playerFullScreen &&
            windowWidth / windowHeight >= 16 / 9 &&
            state.FullScreenType === ScreenFullTypeEnum.DEFAULT,
          "max-h-full":
            state.playerFullScreen && windowWidth / windowHeight < 16 / 9,
          "m-auto overflow-hidden xxs:rounded-lg": !state.playerFullScreen,
        })}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseMove}
      >
        <ReactPlayer
          ref={playerRef}
          // controls
          // playsinline
          url={state.currentSource?.url}
          width="100%"
          height="100%"
          pip={state.pip}
          playing={state.playing}
          volume={state.volume}
          muted={state.muted}
          onDuration={(duration) => {
            dispatch({ type: "updateDuration", payload: duration });
          }}
          onProgress={(value) => {
            if (count > 3 && appElement && controllerRef?.current) {
              appElement.style.cursor = "none";
              controllerRef.current.style.opacity = "0";
              setTimeout(function () {
                if (controllerRef?.current)
                  controllerRef.current.style.display = "none";
              }, 500);
              count = 0;
              dispatch({ type: "changeControllerVisibility", payload: false });
            }

            if (
              controllerRef?.current &&
              controllerRef.current.style.display === "block"
            ) {
              count++;
            }

            dispatch({
              type: "updateProgress",
              payload: { loaded: value.loaded, played: value.played },
            });
          }}
          onReady={() => {
            if (playerRef?.current) {
              const videoElement = playerRef.current.getInternalPlayer();
              dispatch({
                type: "setVideoAspectRatio",
                payload: ((videoElement.videoWidth as number) /
                  videoElement.videoHeight) as number,
              });
            }
          }}
          onStart={async () => {
            await handleSeekToUnwatched();
            await setWatchedTill(animeId, epNo, state.played, session);
          }}
          onPlay={() => dispatch({ type: "enablePlaying" })}
          onPause={() => dispatch({ type: "disablePlaying" })}
          onBuffer={() => dispatch({ type: "updateBuffering", payload: true })}
          onBufferEnd={() =>
            dispatch({ type: "updateBuffering", payload: false })
          }
          onSeek={(e) => {
            if (state.buffering == true) {
              dispatch({ type: "updateBuffering", payload: false });
            }
          }}
          onEnded={handleEnded}
          onEnablePIP={() => dispatch({ type: "enablePip" })}
          onDisablePIP={() => dispatch({ type: "disablePip" })}
          onError={(e) => console.log("onError", e)}
          // onPlaybackQualityChange={(e: any) =>
          //   console.log("onPlaybackQualityChange", e)
          // }
          config={{
            file: {
              forceHLS: state.currentSource?.isM3U8,
            },
          }}
        />
      </div>
      <AnimatePresence>
        {!state.pip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PlayerControl
              ref={controllerRef}
              playerRef={playerRef}
              state={state}
              dispatch={dispatch}
            />
            <AnimatePresence>
              {state.playerFullScreen &&
                title &&
                playerContainerRef.current &&
                state.controllerVisibility && (
                  <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute left-5 top-3 z-50 select-none text-2xl font-medium text-white opacity-80"
                    style={{
                      textShadow: "0.25vw 0.25vw 6px rgba(0, 0, 0, 0.65)",
                    }}
                  >
                    {title}
                    {detailInfo?.episodes &&
                      detailInfo?.episodes.length !== 1 && (
                        <p style={{ fontSize: "70%" }}>Ep-{epNo}</p>
                      )}
                  </motion.article>
                )}
            </AnimatePresence>
            <PlayerSkipBtns state={state} playerRef={playerRef} />
            <QualitySelectModal
              state={state}
              dispatch={dispatch}
              setWatched={async () =>
                await setWatchedTill(animeId, epNo, state.played, session)
              }
            />
            <PreferenceSettingModal
              isOpen={state.isSettingSectionOpen}
              handleOpenChange={(value) =>
                dispatch({ type: "settingOpenChange", payload: value })
              }
            />
            <PlayerLoader state={state} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Player;
