import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/lazy";
import screenfull from "screenfull";
import PlayerControl from "./PlayerControl";
import animeApi from "../../Api/animeApi";
import watched from "../../appwrite/watched";
import PlayerLoader from "./PlayerLoader";
import { loadDetailInfo } from "../../features/content/contentSlice";
import getSkipTimes from "../../utils/getSkipTimes";
import PlayerSkipBtns from "./PlayerSkipBtns";

let count = 0;

function Player() {
  const { name, id, epNo } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const controlRef = useRef(null);

  const [sources, setSources] = useState([]);
  const [playBackQuality, setPlayBackQuality] = useState("auto");
  const { detailInfo } = useSelector((state) => state.content);
  const { status, userData } = useSelector((state) => state.auth);
  const { isAutoPlayEnabled, isAutoNextEnabled } = useSelector(
    (state) => state.preference
  );

  const [markWatchedTill, setMarkWatchedTill] = useState(0);
  const [playerState, setPlayerState] = useState({
    url: null,
    pip: false,
    playing: false,
    volume: 0.8, //  value -> 0-1
    muted: false,
    played: 0, //  value -> 0-1
    duration: 0,
    loaded: 0,
    // controls: false,
    // light: false,
    // playbackRate: 1.0,
    // loop: false,
    buffering: false,
    playerFullScreen: false,
    skipTimes: [],
  });

  const handleSeekToUnwatched = async () => {
    const previouslyWatchedTill = await watched.getWatchedTill(userData.$id, {
      animeId: id,
      episodeNo: Number(epNo),
    });
    if (previouslyWatchedTill) {
      playerRef.current.seekTo(previouslyWatchedTill * playerState.duration);
    }
  };

  const setWatched = async () => {
    await watched.setWatchedTill(userData.$id, {
      animeId: id,
      episodeNo: Number(epNo),
      watchedTill: playerState.played,
    });
  };

  const handleEnded = () => {
    if (isAutoNextEnabled) {
      const currentEpIdx = detailInfo?.episodes.findIndex(
        (ep) => ep.id === decodeURIComponent(name)
      );
      const nextEp = detailInfo?.episodes[currentEpIdx + 1];
      if (nextEp?.id) {
        screenfull.exit(document.getElementById("Player"));
        if (screen.orientation.unlock) screen.orientation.unlock();
        setPlayerState({
          ...playerState,
          playerFullScreen: false,
        });

        navigate(
          `/watch/${detailInfo?.id}/${nextEp.number}/${
            nextEp.id
          }?dub=${searchParams.get("dub")}`,
          {
            replace: true,
            state: { episode: nextEp },
          }
        );
      }
    } else {
      setPlayerState({ ...playerState, playing: false });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (!detailInfo) {
          dispatch(
            loadDetailInfo({
              id,
              params: {
                dub: JSON.parse(searchParams.get("dub").toLowerCase()),
                provider: "gogoanime",
              },
            })
          );
        }
        const res = await animeApi.getStreamingLinks(name);
        setSources(res.data?.sources);
        setPlayBackQuality(res.data?.sources[0]?.quality);
      } catch (error) {
        console.error(error.message);
      }
    })();

    // before name change update watchTill
    return () => {
      if (status) {
        setWatched();
      }
    };
    // check if already played if played then seek to that part
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (detailInfo?.malId && playerState.duration != 0) {
      setPlayerState((prev) => ({ ...prev, skipTimes: [] }));
      (async () => {
        const skipTimes = await getSkipTimes(
          detailInfo?.malId,
          epNo,
          playerState.duration
        );
        if (skipTimes) {
          setPlayerState((prev) => ({ ...prev, skipTimes }));
        }
      })();
    }
  }, [detailInfo?.malId, epNo, playerState.duration]);

  useEffect(() => {
    const loadVideo = (url) => {
      setPlayerState({
        ...playerState,
        url,
        playing: isAutoPlayEnabled,
        played: playerState.played,
        loaded: 0,
        pip: false,
      });
    };
    const objId = sources.findIndex((u) => u?.quality == playBackQuality);
    const selectedUrl = sources[objId]?.url;
    // setWatched();
    loadVideo(selectedUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playBackQuality, sources]);

  useEffect(() => {
    const handlePlaybackProgress = () => {
      const { played } = playerState;
      if (played >= markWatchedTill + 0.04) {
        setMarkWatchedTill(played);
        if (status) setWatched();
      }
    };
    handlePlaybackProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState.played]);

  const handleMouseMove = () => {
    controlRef.current.style.visibility = "visible";
    document.getElementById("root").style.cursor = "auto";
    count = 0;
  };

  const handleMouseLeave = () => {
    count = 0;
  };

  return (
    <div
      id="Player"
      className={`w-full ${
        playerState.playerFullScreen
          ? "flex justify-center"
          : "rounded-lg overflow-hidden"
      }`}>
      <div
        ref={playerContainerRef}
        className="relative max-w-full aspect-[16/9]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseMove}>
        <ReactPlayer
          ref={playerRef}
          // controls
          // playsinline
          url={playerState?.url}
          width="100%"
          height="minContent"
          pip={playerState?.pip}
          playing={playerState?.playing}
          volume={playerState?.volume}
          muted={playerState?.muted}
          onDuration={(duration) => {
            setPlayerState({ ...playerState, duration });
          }}
          onProgress={(value) => {
            if (count > 3) {
              controlRef.current.style.visibility = "hidden";
              document.getElementById("root").style.cursor = "none";
              count = 0;
            }
            if (controlRef.current.style.visibility == "visible") {
              count++;
            }
            setPlayerState({
              ...playerState,
              loaded: value.loaded,
              played: value.played,
            });
          }}
          onReady={() => console.log("onReady")}
          onStart={() => {
            // find intro & outro
            if (status) {
              setWatched();
              handleSeekToUnwatched();
            }
          }}
          onPlay={() => console.log("play start")}
          onBuffer={() => setPlayerState({ ...playerState, buffering: true })}
          // onPlaybackRateChange={this.handleOnPlaybackRateChange}
          onSeek={(e) => {
            console.log("onSeek", e);
            if (playerState.buffering == true) {
              setPlayerState({ ...playerState, buffering: false });
            }
          }}
          onEnded={handleEnded}
          onError={(e) => console.log("onError", e)}
          onPlaybackQualityChange={(e) =>
            console.log("onPlaybackQualityChange", e)
          }
          config={{
            file: {
              forceHLS: true, // change this
            },
          }}
        />
        <PlayerControl
          ref={controlRef}
          playerRef={playerRef}
          playerState={playerState}
          setPlayerState={setPlayerState}
          sources={sources}
          playBackQuality={playBackQuality}
          setPlayBackQuality={setPlayBackQuality}
        />
        <PlayerSkipBtns playerState={playerState} playerRef={playerRef} />
        <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 top-0 z-10">
          <PlayerLoader playerState={playerState} />
        </div>
      </div>
    </div>
  );
}

export default Player;
