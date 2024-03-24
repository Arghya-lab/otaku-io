import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import screenfull from "screenfull";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { StreamingServers } from "@consumet/extensions";
import { usePreference } from "@/components/PreferenceProvider";
import useWindowSize from "@/hooks/useWindowSize";
import { getStreamingLinks } from "@/services/getAnime";
import { getSkipTimes } from "@/services/getSkipTimes";
import PlayerSkipBtns from "./PlayerSkipBtns";
import PlayerControl from "./PlayerControl";
import PlayerLoader from "./PlayerLoader";
import reducer from "./reducerFunc";
import { DetailAnimeInfoType } from "@/types/anime";

let count = 0;

function Player({
  animeId,
  epNo,
  epId,
  isDub,
  detailInfo,
}: {
  animeId: string;
  epNo: string;
  epId: string;
  isDub: boolean;
  detailInfo: DetailAnimeInfoType;
}) {
  const { windowWidth, windowHeight } = useWindowSize();
  const router = useRouter();
  const { data: session } = useSession();

  const playerContainerRef = useRef(null);
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
    url: null,
    // pip: false,
    playing: false,
    volume: 0.9, //  value -> 0-1
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
    playerFullScreen: false,
    skipTimes: [],
  });

  // const [playerState, setPlayerState] = useState<any>({
  //   url: null,
  //   // pip: false,
  //   playing: false,
  //   volume: 0.9, //  value -> 0-1
  //   muted: false,
  //   played: 0, //  value -> 0-1
  //   duration: 0,
  //   loaded: 0,
  //   // controls: false,
  //   // light: false,
  //   // playbackRate: 1.0,
  //   // loop: false,
  //   sources: [],
  //   currentSource: null,
  //   playbackQuality: playbackQuality || "360p",
  //   buffering: false,
  //   playerFullScreen: false,
  //   skipTimes: [],
  // });

  const handleSeekToUnwatched = async () => {
    const { data } = await axios.get(
      `/api/anime/watched-till?animeId=${animeId}&episodeNo=${epNo}`
    );
    const previouslyWatchedTill = data.watchedTill;

    if (previouslyWatchedTill && playerRef.current) {
      // playerRef.current.seekTo(previouslyWatchedTill * playerState.duration);
      playerRef.current.seekTo(previouslyWatchedTill * state.duration);
    }
  };

  const setWatched = useCallback(async () => {
    await axios.patch("/api/anime/watched-till", {
      animeId,
      episodeNo: epNo,
      // watchedTill: playerState.played,
      watchedTill: state.played,
    });
  }, [animeId, epNo, state.played]);

  // const setWatched = async () => {
  //   await axios.patch("/api/anime/watched-till", {
  //     animeId,
  //     episodeNo: epNo,
  //     // watchedTill: playerState.played,
  //     watchedTill: state.played,
  //   });
  // };

  const handleEnded = () => {
    if (isAutoNextEnabled && detailInfo?.episodes) {
      const currentEpIdx = detailInfo.episodes.findIndex(
        (ep) => ep.id === epId
      );
      const nextEp = detailInfo.episodes[currentEpIdx + 1];
      screenfull.exit();
      if (screen.orientation.unlock) screen.orientation.unlock();
      // setPlayerState((prev: any) => ({ ...prev, playerFullScreen: false }));
      dispatch({ type: "minimizeMaximize", payload: false });

      router.push(
        `/watch/${detailInfo.id}/${nextEp.number}/${nextEp.id}?dub=${isDub}`
      );
    } else {
      // setPlayerState((prev: any) => ({ ...prev, playing: false }));
      dispatch({ type: "pausePlaying" });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getStreamingLinks(epId, StreamingServers.GogoCDN);
        if (data) {
          // setPlayerState((prev: any) => ({
          //   ...prev,
          //   sources: data.sources,
          //   currentSource:
          //     data.sources.find(
          //       (source) => source.quality == prev.playbackQuality
          //     ) || data.sources[0],
          //   url: data.sources[0].url,
          //   playing: isAutoPlayEnabled,
          //   played: prev.played,
          //   loaded: 0,
          //   // pip: false,
          // }));
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
    // if (detailInfo?.malId && playerState.duration != 0) {
    if (detailInfo?.malId && state.duration != 0) {
      // setPlayerState((prev: any) => ({ ...prev, skipTimes: [] }));
      (async () => {
        if (detailInfo.malId) {
          const skipTimes = await getSkipTimes(
            detailInfo.malId,
            epNo,
            // playerState.duration
            state.duration
          );

          if (skipTimes) {
            // setPlayerState((prev: any) => ({ ...prev, skipTimes }));
            dispatch({ type: "setSkipTimes", payload: skipTimes });
          }
        }
      })();
    }
    // }, [detailInfo?.malId, epNo, playerState.duration]);
  }, [detailInfo?.malId, epNo, state.duration]);

  useEffect(() => {
    const handlePlaybackProgress = () => {
      // const { played } = playerState;
      // if (played >= markWatchedTill + 0.04) {
      if (state.played >= markWatchedTill + 0.04) {
        // setMarkWatchedTill(played);
        setMarkWatchedTill(state.played);
        if (session) setWatched();
      }
    };
    handlePlaybackProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [playerState.played]);
  }, [state.played, markWatchedTill, session, setWatched]);

  const handleMouseMove = () => {
    if (controllerRef.current && appElement) {
      controllerRef.current.style.visibility = "visible";
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
      className={` ${
        // playerState.playerFullScreen
        state.playerFullScreen
          ? "flex justify-center items-center"
          : "xxs:rounded-lg overflow-hidden"
      }`}>
      <div
        ref={playerContainerRef}
        className={`relative ${
          windowWidth / windowHeight > 16 / 9
            ? "h-full max-w-full"
            : "w-full max-h-full"
        } aspect-[16/9]`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseMove}>
        <ReactPlayer
          ref={playerRef}
          // controls
          // playsinline
          // url={playerState.url}
          url={state.currentSource?.url}
          width="100%"
          height="minContent"
          // pip={playerState.pip}
          // playing={playerState.playing}
          // volume={playerState.volume}
          // muted={playerState.muted}
          playing={state.playing}
          volume={state.volume}
          muted={state.muted}
          onDuration={(duration) => {
            // setPlayerState((prev: any) => ({ ...prev, duration }));
            dispatch({ type: "updateDuration", payload: duration });
          }}
          onProgress={(value) => {
            if (count > 3 && appElement && controllerRef.current) {
              controllerRef.current.style.visibility = "hidden";
              appElement.style.cursor = "none";
              count = 0;
            }
            if (controllerRef.current?.style.visibility == "visible") {
              count++;
            }
            // setPlayerState((prev: any) => ({
            //   ...prev,
            //   loaded: value.loaded,
            //   played: value.played,
            // }));
            dispatch({
              type: "updateProgress",
              payload: { loaded: value.loaded, played: value.played },
            });
          }}
          onReady={() => console.log("onReady")}
          onStart={async () => {
            // find intro & outro
            if (session) {
              await handleSeekToUnwatched();
              await setWatched();
            }
          }}
          onPlay={() => console.log("play start")}
          onBuffer={() =>
            // setPlayerState((prev: any) => ({ ...prev, buffering: true }))
            dispatch({ type: "updateBuffering", payload: true })
          }
          // onPlaybackRateChange={this.handleOnPlaybackRateChange}
          onSeek={(e) => {
            console.log("onSeek", e);
            if (state.buffering == true) {
              dispatch({ type: "updateBuffering", payload: false });
            }
            // if (playerState.buffering == true) {
            //   setPlayerState((prev: any) => ({ ...prev, buffering: false }));
            // }
          }}
          onEnded={handleEnded}
          // onEnablePIP={() =>
          //   setPlayerState((prevState) => ({ ...prevState, pip: true }))
          // }
          // onDisablePIP={() =>
          //   setPlayerState((prevState) => ({ ...prevState, pip: false }))
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
        <PlayerControl
          ref={controllerRef}
          playerRef={playerRef}
          state={state}
          dispatch={dispatch}
          // playerState={playerState}
          // setPlayerState={setPlayerState}
          setWatched={setWatched}
        />
        <PlayerSkipBtns state={state} playerRef={playerRef} />
        <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 top-0 z-10">
          <PlayerLoader state={state} />
        </div>
      </div>
    </div>
  );
}

export default Player;
