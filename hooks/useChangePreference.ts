import {
  UpdateTypeEnum,
  usePreference,
} from "@/components/providers/PreferenceProvider";

const useChangePreference = () => {
  const { updatePreference } = usePreference();

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
    value?: string | number;
    name?: string;
  }) => {
    if (value) {
      updatePreference(UpdateTypeEnum.CHANGE_SEEK_SECONDS, value);
    }
  };

  const handleChangePlaybackQuality = ({
    value,
    name,
  }: {
    value?: string | number;
    name?: string;
  }) => {
    if (value) {
      updatePreference(UpdateTypeEnum.CHANGE_PLAYBACK_QUALITY, value);
    }
  };

  return {
    handleChangeAutoPlay,
    handleChangeAutoSkip,
    handleChangeAutoNext,
    handleChangeSeekSeconds,
    handleChangePlaybackQuality,
  };
};

export default useChangePreference;
