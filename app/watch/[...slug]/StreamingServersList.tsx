"use client";

import { Button } from "@/components/ui/button";
import { useVideoLink } from "./VideoLinkProvider";

// enum servers {
//   AsianLoad = "asianload",
//   GogoCDN = "gogocdn", //
//   StreamSB = "streamsb", //
//   MixDrop = "mixdrop",
//   Mp4Upload = "mp4upload", //
//   UpCloud = "upcloud",
//   VidCloud = "vidcloud",
//   StreamTape = "streamtape", //
//   VizCloud = "vizcloud",
//   MyCloud = "mycloud",
//   Filemoon = "filemoon",
//   VidStreaming = "vidstreaming", //
//   SmashyStream = "smashystream",
//   StreamHub = "streamhub",
//   StreamWish = "streamwish", //
//   VidMoly = "vidmoly",
//   Voe = "voe",
// }

function StreamingServersList({ epNo }: { epNo: string }) {
  const { changeVideoServer } = useVideoLink();

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-2 rounded-lg sm:grid-cols-[280px_1fr]">
      <p className="flex h-full flex-grow flex-col items-center justify-center rounded-lg bg-card p-4">
        <span className="text-xs text-muted-foreground xl:text-sm">
          You are Watching
        </span>
        <span className="text-sm font-medium text-foreground">
          Episode {epNo}
        </span>
        <span className="flex flex-col items-center justify-center text-center text-xs !leading-tight text-muted-foreground xl:text-sm">
          If current server doesn&apos;t work please try other servers beside.
        </span>
      </p>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-card px-4 py-3 xxs:px-8 md:w-fit md:flex-shrink-0">
        <div className="flex flex-row flex-wrap items-center gap-2 xxs:gap-5">
          {/* <span className="flex flex-row items-center gap-1 font-medium">
            <Captions />
            SUB:{" "}
          </span> */}
          <Button size="sm" onClick={() => changeVideoServer()}>
            Default
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("vidstreaming")}>
            VidStreaming
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("streamsb")}>
            StreamSB
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("streamtape")}>
            StreamTape
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("mp4upload")}>
            Mp4Upload
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("streamwish")}>
            StreamWish
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("vidcloud")}>
            VidCloud
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("streamhub")}>
            StreamHub
          </Button>
          <Button size="sm" onClick={() => changeVideoServer("vizcloud")}>
            VizCloud
          </Button>
        </div>
        {/* <div className="flex flex-row flex-wrap items-center gap-2 xxs:gap-5">
          <span className="flex flex-row items-center gap-1 font-medium">
            <Mic />
            DUB:
          </span>
          <Button>Default</Button>
          <Button>VidStreaming</Button>
          <Button>StreamSB</Button>
          <Button>StreamTape</Button>
          <Button>Mp4Upload</Button>
          <Button>StreamWish</Button>
          <Button>VidCloud</Button>
          <Button>StreamHub</Button>
          <Button>VizCloud</Button>
        </div> */}
      </div>
    </div>
  );
}

export default StreamingServersList;
