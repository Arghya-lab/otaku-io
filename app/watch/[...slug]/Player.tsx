import { usePreference } from "@/components/providers/PreferenceProvider";
import useChangePreference from "@/hooks/useChangePreference";
import getPreviouslyWatchedTill from "@/utils/getPreviouslyWatchedTill";
import { getSkipTimes } from "@/utils/getSkipTimes";
import setWatchedTill from "@/utils/setWatchedTill";
import ReactVideo from "@arghya-lab/react-video";
import { IAnimeInfo } from "@consumet/extensions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import screenfull from "screenfull";
import { useVideoLink } from "./VideoLinkProvider";

export interface PlayerPropType {
  animeId: string;
  infoText?: {
    title: string;
    summery?: string;
  };
  epNo: string;
  epId: string;
  isDub: boolean;
  animeInfo: IAnimeInfo;
}

function Player({
  animeId,
  infoText,
  epNo,
  epId,
  isDub,
  animeInfo,
}: PlayerPropType) {
  const router = useRouter();
  const { data: session } = useSession();
  // const videoRef = useRef<HTMLVideoElement>(null);
  const markWatchedTill = useRef(0);

  const {
    autoPlay,
    autoNext: isAutoNextEnabled,
    playbackQuality,
    seekSeconds,
  } = usePreference();
  const { handleChangePlaybackQuality } = useChangePreference();
  const { videoRef, videoState, setVideoState } = useVideoLink();

  const handleSeekToUnwatched = async () => {
    const previouslyWatchedTill = await getPreviouslyWatchedTill(
      animeId,
      epNo,
      session
    );

    if (
      previouslyWatchedTill &&
      videoRef &&
      videoRef.current &&
      videoRef.current.duration - previouslyWatchedTill > 5
    ) {
      videoRef.current.currentTime = previouslyWatchedTill;
    }
  };

  // On initial page load or episode change and on load of video playing duration fetch skip times
  const handleDurationUpdate = async (duration: number) => {
    if (animeInfo?.malId && duration !== 0 && animeInfo.malId) {
      const skipTimes = await getSkipTimes(animeInfo.malId, epNo, duration);

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
    if (videoRef) {
      if (isAutoNextEnabled && animeInfo?.episodes) {
        const currentEpIdx = animeInfo.episodes.findIndex(
          (ep) => ep.id === epId
        );

        screenfull.exit();
        if (screen.orientation.unlock) screen.orientation.unlock();

        // if the current episode is last episode
        if (
          animeInfo.episodes[animeInfo.episodes.length - 1].id ===
          animeInfo.episodes[currentEpIdx].id
        ) {
          videoRef.current?.pause();
        } else {
          const nextEp = animeInfo.episodes[currentEpIdx + 1];
          router.push(
            `/watch/${animeInfo.id}/${nextEp.number}/${nextEp.id}?dub=${isDub}`
          );
        }
      } else {
        videoRef.current?.pause();
      }
    }
  };

  // on specific time during video playing the video played till save in DB
  const handleProgress = async ({ currentTime }: { currentTime: number }) => {
    if (videoRef && videoRef.current) {
      const duration = videoRef.current.duration;

      if (
        duration &&
        currentTime / duration >= markWatchedTill.current + 0.04
      ) {
        markWatchedTill.current = currentTime / duration;
        await setWatchedTill(animeId, epNo, currentTime, session);
      }
    }
  };

  return (
    <ReactVideo
      ref={videoRef}
      source={videoState.sources}
      width="100%"
      className="max-h-[calc(100svh-4rem-4rem)]"
      autoPlay={autoPlay}
      defaultQuality={playbackQuality}
      chapters={videoState.chapters}
      showSkipableChapter
      captions={videoState.captions}
      videoSkipSec={seekSeconds}
      loadingPoster={animeInfo.cover}
      infoText={infoText}
      fullscreenOnlyInfoText
      onReady={handleSeekToUnwatched}
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
