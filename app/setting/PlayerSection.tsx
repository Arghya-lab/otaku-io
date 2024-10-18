"use client";

import { usePreference } from "@/components/providers/PreferenceProvider";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import useChangePreference from "@/hooks/useChangePreference";
import { playbackQualityList, seekTimeList } from "@/types/constants";

function PlayerSection() {
  const {
    autoPlay: isAutoPlayEnabled,
    autoSkip: isAutoSkipEnabled,
    autoNext: isAutoNextEnabled,
    seekSeconds,
    playbackQuality,
  } = usePreference();

  const {
    handleChangeAutoNext,
    handleChangeAutoPlay,
    handleChangeAutoSkip,
    handleChangePlaybackQuality,
    handleChangeSeekSeconds,
  } = useChangePreference();

  return (
    <section className="flex flex-col gap-2 border-b border-zinc-500 pb-16 pt-6">
      <h3 className="pb-6 text-xl">Player</h3>
      <div className="flex flex-col gap-3 xs:pl-12">
        <div className="flex items-center gap-4">
          <p className="text-sm">Auto Play</p>
          <Radio
            enabled={isAutoPlayEnabled}
            handleChange={handleChangeAutoPlay}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">Auto Skip (Into, Outro, Recap)</p>
          <Radio
            enabled={isAutoSkipEnabled}
            handleChange={handleChangeAutoSkip}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">Auto Next</p>
          <Radio
            enabled={isAutoNextEnabled}
            handleChange={handleChangeAutoNext}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">Seek time</p>
          <Select
            list={seekTimeList}
            selected={
              seekTimeList[
                seekTimeList.findIndex((item) => item.value === seekSeconds)
              ]
            }
            onChange={handleChangeSeekSeconds}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">Default playback quality</p>
          <Select
            list={playbackQualityList}
            selected={
              playbackQualityList[
                playbackQualityList.findIndex(
                  (item) => item.value === playbackQuality
                )
              ]
            }
            onChange={handleChangePlaybackQuality}
          />
        </div>
      </div>
    </section>
  );
}

export default PlayerSection;
