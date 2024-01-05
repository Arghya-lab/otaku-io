import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import PlayerControl from "./PlayerControl";

function Player() {
  const [playerState, setPlayerState] = useState({
    // url: null,
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

  // setInterval(() => {
  //   console.log(playerState);
  // }, 10000);

  return (
    <div id="Player" className="relative">
      <ReactPlayer
        // controls
        // playsinline
        url="https://www107.vipanicdn.net/streamhls/395c00c8e81e269aa76202288b5c4727/ep.1.1703922413.360.m3u8"
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
      />
    </div>
  );
}

export default Player;
