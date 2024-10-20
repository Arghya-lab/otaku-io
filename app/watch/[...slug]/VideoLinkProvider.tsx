"use client";

import { ApiSuccessType } from "@/types/apiResponse";
import setWatchedTill from "@/utils/setWatchedTill";
import { ISource } from "@consumet/extensions";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface VideoStateInterface {
  sources: {
    src: string;
    quality: string;
  }[];
  chapters: {
    name: string;
    startTime: number;
    endTime: number;
    color?: string;
    skipAble?: boolean;
  }[];
  captions?: {
    src: string;
    srclang: string;
  }[];
}

export interface VideoLinkContextInterface {
  videoRef: RefObject<HTMLVideoElement> | null;
  videoState: VideoStateInterface;
  setVideoState: Dispatch<SetStateAction<VideoStateInterface>>;
  changeVideoServer: (server?: VideoServerType) => unknown;
}

export type VideoServerType =
  | "vidstreaming"
  | "streamsb"
  | "streamtape"
  | "mp4upload"
  | "streamwish"
  | "vidcloud"
  | "streamhub"
  | "vizcloud";

export const defaultVideoState: VideoStateInterface = {
  sources: [],
  chapters: [],
};

export const VideoLinkContext = createContext<VideoLinkContextInterface>({
  videoState: defaultVideoState,
  videoRef: null,
  setVideoState: () => {},
  changeVideoServer: () => {},
});

export const useVideoLink = () => useContext(VideoLinkContext);

const VideoLinkProvider = ({
  animeId,
  epNo,
  epId,
  children,
}: {
  animeId: string;
  epNo: string;
  epId: string;
  children: ReactNode;
}) => {
  const { data: session } = useSession();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] =
    useState<VideoStateInterface>(defaultVideoState);

  // On initial page load or episode change fetch streaming links
  useEffect(() => {
    changeVideoServer();

    const video = videoRef.current;

    // before name change update watchTill
    return () => {
      const currentTime = video?.currentTime;
      (async () => {
        if (currentTime) {
          await setWatchedTill(animeId, epNo, currentTime, session);
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epId]);

  const changeVideoServer = async (server?: VideoServerType) => {
    try {
      const { data }: { data: ApiSuccessType<ISource> } = await axios.get(
        `/api/anime/streaming-links/${epId}`,
        {
          params: {
            server,
          },
        }
      );
      if (data.success) {
        setVideoState({
          sources: data.data.sources
            .filter((source) => source.quality !== "backup")
            .map((source) => ({
              src: source.url,
              quality: source.quality || "unknown",
            }))
            .reverse(),
          chapters: [],
          captions: data.data.subtitles?.map((subtitle) => ({
            src: subtitle.url,
            srclang: subtitle.lang,
          })),
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.message);
      }
    }
  };

  return (
    <VideoLinkContext.Provider
      value={{ videoRef, videoState, setVideoState, changeVideoServer }}
    >
      {children}
    </VideoLinkContext.Provider>
  );
};

export default VideoLinkProvider;
