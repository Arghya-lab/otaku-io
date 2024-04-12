"use client";

import { seekTimeList, playbackQualityList } from "@/types/constants";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import { themes } from "@/theme";
import {
  UpdateTypeEnum,
  usePreference,
} from "@/components/providers/PreferenceProvider";

function PlayerSection() {
  const {
    themeId,
    autoPlay: isAutoPlayEnabled,
    autoSkip: isAutoSkipEnabled,
    autoNext: isAutoNextEnabled,
    seekSeconds,
    playbackQuality,
    updatePreference,
  } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const handleChangeAutoPlay = () => {
    updatePreference(UpdateTypeEnum.TOGGLE_AUTO_PLAY);
  };

  const handleChangeAutoSkip = () => {
    updatePreference(UpdateTypeEnum.TOGGLE_AUTO_SKIP);
  };

  const handleChangeAutoNext = () => {
    updatePreference(UpdateTypeEnum.TOGGLE_AUTO_NEXT);
  };

  const handleChangeSeekSeconds = ({
    value,
    name,
  }: {
    value: string | number | undefined;
    name: string;
  }) => {
    if (value) {
      updatePreference(UpdateTypeEnum.CHANGE_SEEK_SECONDS, value);
    }
  };

  const handleChangePlaybackQuality = ({
    value,
    name,
  }: {
    value: string | number | undefined;
    name: string;
  }) => {
    if (value) {
      updatePreference(UpdateTypeEnum.CHANGE_PLAYBACK_QUALITY, value);
    }
  };

  return (
    <section className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
      <h3 className="text-xl pb-6" style={{ color: theme.textColor }}>
        Player
      </h3>
      <div className="flex flex-col gap-3 xs:pl-12">
        <div className="flex gap-4 items-center">
          <p className="text-sm">Auto Play</p>
          <Radio
            color={theme.secondaryColor}
            enabled={isAutoPlayEnabled}
            setEnabled={handleChangeAutoPlay}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-sm">Auto Skip (Into, Outro, Recap)</p>
          <Radio
            color={theme.secondaryColor}
            enabled={isAutoSkipEnabled}
            setEnabled={handleChangeAutoSkip}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-sm">Auto Next</p>
          <Radio
            color={theme.secondaryColor}
            enabled={isAutoNextEnabled}
            setEnabled={handleChangeAutoNext}
          />
        </div>
        <div className="flex gap-4 items-center">
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
        <div className="flex gap-4 items-center">
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
