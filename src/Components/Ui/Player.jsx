import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import PlayerControl from "./PlayerControl";
import { useParams } from "react-router-dom";
import animeApi from "../../Api/animeApi";

function Player() {
  const { name } = useParams();
  const [sources, setSources] = useState([]);
  const [playBackQuality, setPlayBackQuality] = useState("auto");

  useEffect(() => {
    (async () => {
      try {
        const res = await animeApi.getStreamingLinks(name);
        // console.log(res.data);
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
    volume: 0.8,
    muted: false,
    played: 0, //  value -> 0-1
    duration: 0,
    loaded: 0,
    // playbackRate: 1.0,
    // loop: false,
  });

  useEffect(() => {
    const objId = sources.findIndex((u) => u?.quality == playBackQuality);
    const selectedUrl = sources[objId]?.url;
    setPlayerState((prev) => ({ ...prev, url: selectedUrl }));
  }, [playBackQuality, sources]);

  return (
    <div id="Player" className="relative">
      <ReactPlayer
        // controls
        // playsinline
        url={playerState?.url}
        width="100%"
        height="100%"
        pip={playerState?.pip}
        playing={playerState?.playing}
        volume={playerState?.volume}
        muted={playerState?.muted}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onPlay={() => {
          console.log("play start");
        }}
        onDuration={(v) => setPlayerState((prev) => ({ ...prev, duration: v }))}
        onProgress={(value) =>
          setPlayerState((prev) => ({
            ...prev,
            loaded: value.loaded,
            played: value.played,
          }))
        }
        onBuffer={() => console.log("onBuffer")}
        // onPlaybackRateChange={this.handleOnPlaybackRateChange}
        onSeek={(e) => console.log("onSeek", e)}
        // onEnded={this.handleEnded}
        onError={(e) => console.log("onError", e)}
        onPlaybackQualityChange={(e) =>
          console.log("onPlaybackQualityChange", e)
        }
        // config={{
        //   file: {
        //     playerVars: { showinfo: 1 },
        //   },
        //   facebook: {
        //     appId: "12345",
        //   },
        // }}
      />
      <PlayerControl
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
