import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import screenfull from "screenfull";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { StreamingServers } from "@consumet/extensions";
import { usePreference } from "@/app/PreferenceProvider";
import useWindowSize from "@/hooks/useWindowSize";
import { getStreamingLinks } from "@/services/getAnime";
import { getSkipTimes } from "@/services/getSkipTimes";
import PlayerSkipBtns from "./PlayerSkipBtns";
import PlayerControl from "./PlayerControl";
import PlayerLoader from "./PlayerLoader";
import reducer from "./reducerFunc";
import { AnimeStreamingSourceType, DetailAnimeInfoType } from "@/types/anime";
import isMobileDevice from "@/utils/getIsMobileDevice";
import classNames from "classnames";

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
  title: string | undefined;
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
    // url: null,
    // pip: false,
    playing: false,
    volume: isMobileDevice() ? 1 : 0.85, //  value -> 0-1
    muted: false,
    played: 0, //  value -> 0-1
    duration: 0,
    loaded: 0,
    // controls: false,
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
  });

  const handleSeekToUnwatched = async () => {
    const { data } = await axios.get(
      `/api/anime/watched-till?animeId=${animeId}&episodeNo=${epNo}`
    );
    const previouslyWatchedTill = data.watchedTill;

    if (previouslyWatchedTill && playerRef.current) {
      playerRef.current.seekTo(previouslyWatchedTill * state.duration);
    }
  };

  const setWatched = useCallback(async () => {
    await axios.patch("/api/anime/watched-till", {
      animeId,
      episodeNo: epNo,
      watchedTill: state.played,
    });
  }, [animeId, epNo, state.played]);

  // const setWatched = async () => {
  //   await axios.patch("/api/anime/watched-till", {
  //     animeId,
  //     episodeNo: epNo,
  //     watchedTill: state.played,
  //   });
  // };

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
        dispatch({ type: "pausePlaying" });
      }

      const nextEp = detailInfo.episodes[currentEpIdx + 1];
      router.push(
        `/watch/${detailInfo.id}/${nextEp.number}/${nextEp.id}?dub=${isDub}`
      );
    } else {
      dispatch({ type: "pausePlaying" });
    }
  };

  // On initial page load or episode change
  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: AnimeStreamingSourceType } = await axios.get(
          `/api/anime/streaming-links/${epId}`
        );
        if (data) {
          dispatch({
            type: "updateStreamingLinks",
            payload: {
              sources: data.sources,
              currentSource:
                data.sources.find(
                  (source) => source.quality === state.playbackQuality
                ) || data.sources[0],
              playing: isAutoPlayEnabled,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();

    // before name change update watchTill
    return () => {
      if (session) {
        setWatched();
      }
    };
    // check if already played if played then seek to that part
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epId]);

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

  useEffect(() => {
    const handlePlaybackProgress = () => {
      if (state.played >= markWatchedTill + 0.04) {
        // setMarkWatchedTill(played);
        setMarkWatchedTill(state.played);
        if (session) setWatched();
      }
    };
    handlePlaybackProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.played, markWatchedTill, session, setWatched]);

  const handleMouseMove = () => {
    if (appElement) {
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
      className={classNames({
        "flex justify-center items-center": state.playerFullScreen,
        "w-full aspect-video bg-black xxs:rounded-lg overflow-hidden":
          state.loaded === 0,
      })}>
      <div
        ref={playerContainerRef}
        className={classNames("relative bg-black", {
          "h-full max-w-full":
            state.playerFullScreen && windowWidth / windowHeight >= 16 / 9,
          "w-full max-h-full":
            state.playerFullScreen && windowWidth / windowHeight < 16 / 9,
          "m-auto xxs:rounded-lg overflow-hidden": !state.playerFullScreen,
          "max-h-[calc(100vh-6rem)]":
            !state.playerFullScreen && windowWidth >= 800,
        })}
        style={{
          aspectRatio: windowWidth >= 800 ? state.videoAspectRatio : "auto",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseMove}>
        <ReactPlayer
          ref={playerRef}
          // controls
          // playsinline
          url={state.currentSource?.url}
          className="flex-1"
          width="100%"
          height="100%"
          // pip={state.pip}
          // playing={state.playing}
          // volume={state.volume}
          // muted={state.muted}
          playing={state.playing}
          volume={state.volume}
          muted={state.muted}
          onDuration={(duration) => {
            dispatch({ type: "updateDuration", payload: duration });
          }}
          onProgress={(value) => {
            if (count > 3 && appElement) {
              dispatch({ type: "changeControllerVisibility", payload: false });
              appElement.style.cursor = "none";
              count = 0;
            }

            if (state.controllerVisibility) count++;

            dispatch({
              type: "updateProgress",
              payload: { loaded: value.loaded, played: value.played },
            });
          }}
          onReady={() => {
            console.log("onReady");
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
            // find intro & outro
            if (session) {
              await handleSeekToUnwatched();
              await setWatched();
            }
          }}
          onPlay={() => console.log("play start")}
          onBuffer={() => dispatch({ type: "updateBuffering", payload: true })}
          onSeek={(e) => {
            console.log("onSeek", e);
            if (state.buffering == true) {
              dispatch({ type: "updateBuffering", payload: false });
            }
          }}
          onEnded={handleEnded}
          // onEnablePIP={() =>
          //   setstate((prevState) => ({ ...prevState, pip: true }))
          // }
          // onDisablePIP={() =>
          //   setstate((prevState) => ({ ...prevState, pip: false }))
          // }
          onError={(e) => console.log("onError", e)}
          onPlaybackQualityChange={(e: any) =>
            console.log("onPlaybackQualityChange", e)
          }
          config={{
            file: {
              forceHLS: true, // change this
            },
          }}
        />
        {state.playerFullScreen &&
          title &&
          playerContainerRef.current &&
          state.controllerVisibility && (
            <>
              <p
                className="select-none text-white absolute top-3 left-5 font-medium opacity-90"
                style={{
                  fontSize:
                    playerContainerRef.current.clientWidth /
                    (windowWidth > 1000 ? 45 : 30),
                  textShadow: "0.25vw 0.25vw 6px rgba(0, 0, 0, 0.65)",
                }}>
                {title}
                {detailInfo?.episodes && detailInfo?.episodes.length !== 1 && (
                  <p style={{ fontSize: "70%" }}>Ep-{epNo}</p>
                )}
              </p>
            </>
          )}
        {state.controllerVisibility && (
          <PlayerControl
            ref={controllerRef}
            playerRef={playerRef}
            state={state}
            dispatch={dispatch}
            setWatched={setWatched}
          />
        )}
        <PlayerSkipBtns state={state} playerRef={playerRef} />
        <div className="flex items-center justify-center">
          <PlayerLoader state={state} />
        </div>
      </div>
    </div>
  );
}

export default Player;
