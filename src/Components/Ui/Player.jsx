import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import PlayerControl from "./PlayerControl";
import { useNavigate, useParams } from "react-router-dom";
import animeApi from "../../Api/animeApi";
import { useSelector } from "react-redux";

let count = 0;

function Player() {
  const { name } = useParams();
  const navigate = useNavigate();

  const playerRef = useRef(null);
  const controlRef = useRef(null);

  const [sources, setSources] = useState([]);
  const [playBackQuality, setPlayBackQuality] = useState("auto");
  const { detailInfo } = useSelector((state) => state.content);
  const { isAutoPlayEnabled, isAutoNextEnabled } = useSelector(
    (state) => state.preference
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await animeApi.getStreamingLinks(name);
        setSources(res.data?.sources);
        setPlayBackQuality(res.data?.sources[0]?.quality);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [name]);

  const [playerState, setPlayerState] = useState({
    url: null,
    pip: false,
    playing: false,
    // controls: false,
    // light: false,
    volume: 0.8, //  value -> 0-1
    muted: false,
    played: 0, //  value -> 0-1
    duration: 0,
    loaded: 0,
    // playbackRate: 1.0,
    // loop: false,
  });

  const loadVideo = (url) => {
    setPlayerState((prev) => ({
      ...prev,
      url,
      playing: isAutoPlayEnabled,
      played: 0,
      loaded: 0,
      pip: false,
    }));
  };

  const handleEnded = () => {
    if (isAutoNextEnabled) {
      const currentEpIdx = detailInfo.episodes.findIndex(
        (ep) => ep.id === decodeURIComponent(name)
      );
      const nextEp = detailInfo.episodes[currentEpIdx + 1];
      if (nextEp?.id) {
        navigate(`/watch/${detailInfo?.id}/${nextEp.id}`, {
          state: { episode: nextEp },
        });
      }
    } else {
      setPlayerState({ ...playerState, playing: false });
    }
  };

  useEffect(() => {
    const objId = sources.findIndex((u) => u?.quality == playBackQuality);
    const selectedUrl = sources[objId]?.url;
    loadVideo(selectedUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playBackQuality, sources]);

  const handleMouseMove = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };

  const handleMouseLeave = () => {
    count = 0;
  };

  return (
    <div
      id="Player"
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseMove}>
      <ReactPlayer
        ref={playerRef}
        // controls
        // playsinline
        url={playerState?.url}
        width="100%"
        height="100%"
        pip={playerState?.pip}
        playing={playerState?.playing}
        volume={playerState?.volume}
        muted={playerState?.muted}
        onDuration={(v) => setPlayerState((prev) => ({ ...prev, duration: v }))}
        onProgress={(value) => {
          if (count > 3) {
            controlRef.current.style.visibility = "hidden";
            document.getElementById("root").style.cursor = "none";
            count = 0;
          }
          if (controlRef.current.style.visibility == "visible") {
            count++;
          }
          setPlayerState((prev) => ({
            ...prev,
            loaded: value.loaded,
            played: value.played,
          }));
        }}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onPlay={() => {
          console.log("play start");
        }}
        onBuffer={() => console.log("onBuffer")}
        // onPlaybackRateChange={this.handleOnPlaybackRateChange}
        onSeek={(e) => console.log("onSeek", e)}
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
    </div>
  );
}

export default Player;
