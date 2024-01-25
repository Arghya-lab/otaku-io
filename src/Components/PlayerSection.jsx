import { useDispatch, useSelector } from "react-redux";
import {
  changeAutoNext,
  changeAutoPlay,
  changeAutoSkip,
  changePlaybackQuality,
  changeSeekSeconds,
} from "../features/preference/preferenceSlice";
import Radio from "./Ui/Radio";
import Select from "./Ui/Select";
import { seekTimeList, playbackQualityList } from "../constants";

function PlayerSection() {
  const dispatch = useDispatch();
  const {
    preferenceId,
    isAutoPlayEnabled,
    isAutoNextEnabled,
    isAutoSkipEnabled,
    videoSeekSeconds,
    playbackQuality,
    theme,
  } = useSelector((state) => state.preference);

  const handleChangeAutoPlay = () => {
    dispatch(
      changeAutoPlay({
        preferenceId,
        autoPlay: !isAutoPlayEnabled,
      })
    );
  };

  const handleChangeAutoSkip = () => {
    dispatch(
      changeAutoSkip({
        preferenceId,
        autoSkip: !isAutoSkipEnabled,
      })
    );
  };

  const handleChangeAutoNext = () => {
    dispatch(
      changeAutoNext({
        preferenceId,
        autoNext: !isAutoNextEnabled,
      })
    );
  };

  const handleChangeSeekSeconds = (data) => {
    dispatch(
      changeSeekSeconds({
        preferenceId,
        seekSeconds: data.value,
      })
    );
  };

  const handleChangePlaybackQuality = (data) => {
    dispatch(
      changePlaybackQuality({
        preferenceId,
        playbackQuality: data.value,
      })
    );
  };

  return (
    <div className="flex flex-col gap-2 pb-16 pt-6 border-b border-zinc-500">
      <p className="text-xl text-black dark:text-white pb-6">Player</p>
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 items-center">
          <p className="text-gray-950 dark:text-slate-100 text-sm">Auto Play</p>
          <Radio
            color={theme.secondaryColor}
            enabled={isAutoPlayEnabled}
            setEnabled={handleChangeAutoPlay}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-gray-950 dark:text-slate-100 text-sm">
            Auto Skip (Into, Outro, Recap)
          </p>
          <Radio
            color={theme.secondaryColor}
            enabled={isAutoSkipEnabled}
            setEnabled={handleChangeAutoSkip}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-gray-950 dark:text-slate-100 text-sm">Auto Next</p>
          <Radio
            color={theme.secondaryColor}
            enabled={isAutoNextEnabled}
            setEnabled={handleChangeAutoNext}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-gray-950 dark:text-slate-100 text-sm">Seek time</p>
          <Select
            list={seekTimeList}
            selected={
              seekTimeList[
                seekTimeList.findIndex(
                  (item) => item.value === videoSeekSeconds
                )
              ]
            }
            onChange={handleChangeSeekSeconds}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-gray-950 dark:text-slate-100 text-sm">
            Default playback quality
          </p>
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
    </div>
  );
}

export default PlayerSection;
