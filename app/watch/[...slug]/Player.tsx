import { usePreference } from "@/components/providers/PreferenceProvider";
import useChangePreference from "@/hooks/useChangePreference";
import { AnimeStreamingSourceType, DetailAnimeInfoType } from "@/types/anime";
import { ApiSuccessType } from "@/types/apiResponse";
import getPreviouslyWatchedTill from "@/utils/getPreviouslyWatchedTill";
import { getSkipTimes } from "@/utils/getSkipTimes";
import setWatchedTill from "@/utils/setWatchedTill";
import ReactVideo from "@arghya-lab/react-video";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import screenfull from "screenfull";
// Dynamically import the ReactVideo component with SSR disabled
// const ReactVideo = dynamic(() => import("@arghya-lab/react-video"), {
//   ssr: false,
// });

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
  const router = useRouter();
  const { data: session } = useSession();
  const videoRef = useRef<HTMLVideoElement>(null);
  const markWatchedTill = useRef(0);

  const {
    autoPlay,
    autoNext: isAutoNextEnabled,
    playbackQuality,
    seekSeconds,
  } = usePreference();
  const { handleChangePlaybackQuality } = useChangePreference();

  const [videoState, setVideoState] = useState<{
    sources: { src: string; quality: string }[];
    chapters: {
      name: string;
      startTime: number;
      endTime: number;
      color?: string;
      skipAble?: boolean;
    }[];
  }>({
    sources: [],
    chapters: [],
  });

  const handleSeekToUnwatched = async () => {
    // console.log("seeking to prev watched");

    const previouslyWatchedTill = await getPreviouslyWatchedTill(
      animeId,
      epNo,
      session
    );

    if (previouslyWatchedTill && videoRef.current) {
      videoRef.current.currentTime = previouslyWatchedTill;
    }
  };

  // On initial page load or episode change fetch streaming links
  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: ApiSuccessType<AnimeStreamingSourceType> } =
          await axios.get(`/api/anime/streaming-links/${epId}`);
        if (data.success) {
          setVideoState({
            sources: data.data.sources
              .filter((source) => source.quality !== "backup")
              .map((source) => ({
                src: source.url,
                quality: source.quality || "unknown",
              })),
            chapters: [],
          });
        }
      } catch (error) {
        if (isAxiosError(error)) {
          // console.log(error.message);
        }
      }
    })();

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

  // On initial page load or episode change and on load of video playing duration fetch skip times
  const handleDurationUpdate = async (duration: number) => {
    if (detailInfo?.malId && duration !== 0 && detailInfo.malId) {
      const skipTimes = await getSkipTimes(detailInfo.malId, epNo, duration);

      if (skipTimes) {
        setVideoState((prev) => ({
          ...prev,
          chapters: skipTimes.map((skipTime) => ({
            name: skipTime.type,
            startTime: skipTime.startTime,
            endTime: skipTime.endTime,
            skipAble: true,
            color:
              skipTime.type === "intro"
                ? "#a855f7"
                : skipTime.type === "outro"
                  ? "#facc15"
                  : skipTime.type === "mix-intro"
                    ? "#a3e635"
                    : skipTime.type === "mix-outro"
                      ? "#fb923c"
                      : "#3b82f6",
          })),
        }));
      }
    }
  };

  const handleEnded = () => {
    // console.log("handled ended");

    if (isAutoNextEnabled && detailInfo?.episodes) {
      const currentEpIdx = detailInfo.episodes.findIndex(
        (ep) => ep.id === epId
      );

      screenfull.exit();
      if (screen.orientation.unlock) screen.orientation.unlock();

      // if the current episode is last episode
      if (
        detailInfo.episodes[detailInfo.episodes.length - 1].id ===
        detailInfo.episodes[currentEpIdx].id
      ) {
        videoRef.current?.pause();
        // console.log("run end of episodes");
      } else {
        // console.log("run router push");

        const nextEp = detailInfo.episodes[currentEpIdx + 1];
        router.push(
          `/watch/${detailInfo.id}/${nextEp.number}/${nextEp.id}?dub=${isDub}`
        );
      }
    } else {
      videoRef.current?.pause();
    }
  };

  // on specific time during video playing the video played till save in DB
  const handleProgress = async ({ currentTime }: { currentTime: number }) => {
    const duration = videoRef.current?.duration;
    // console.log({ duration, currentTime });

    if (duration && currentTime / duration >= markWatchedTill.current + 0.04) {
      // console.log(videoState);
      // console.log("uploading current watch time.", currentTime);

      markWatchedTill.current = currentTime / duration;
      await setWatchedTill(animeId, epNo, currentTime, session);
    }
  };

  return (
    <ReactVideo
      ref={videoRef}
      source={videoState.sources}
      autoPlay={autoPlay}
      defaultQuality={playbackQuality}
      chapters={videoState.chapters}
      showSkipableChapter
      videoSkipSec={seekSeconds}
      loadingPoster={detailInfo.cover}
      width="100%"
      infoText={{
        title: title || "",
        summery:
          detailInfo?.episodes && detailInfo?.episodes.length !== 1
            ? `Ep-${epNo}`
            : "",
      }}
      fullscreenOnlyInfoText
      onStart={handleSeekToUnwatched}
      onDuration={handleDurationUpdate}
      onProgress={handleProgress}
      onEnded={handleEnded}
      onQualityChange={(sourceItem) => {
        if (
          ["360p", "480p", "720p", "1080p"].includes(String(sourceItem.quality))
        ) {
          handleChangePlaybackQuality({ value: sourceItem.quality });
        }
      }}
    />
  );
}

export default Player;
