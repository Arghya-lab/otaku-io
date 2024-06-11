import { usePreference } from "@/components/providers/PreferenceProvider";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import useChangePreference from "@/hooks/useChangePreference";
import useWindowSize from "@/hooks/useWindowSize";
import { themes } from "@/theme";
import { seekTimeList } from "@/types/constants";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

function PreferenceSettingModal({
  isOpen,
  handleOpenChange,
}: {
  isOpen: boolean;
  handleOpenChange: (value?: boolean) => void;
}) {
  const { windowWidth } = useWindowSize();
  const { themeId, autoPlay, autoSkip, autoNext, seekSeconds } =
    usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  const {
    handleChangeAutoNext,
    handleChangeAutoPlay,
    handleChangeAutoSkip,
    handleChangeSeekSeconds,
  } = useChangePreference();

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(value) => handleOpenChange(value)}
    >
      <Dialog.Content className="DialogContent">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 z-40 overflow-y-auto bg-black p-2 text-white xs:left-[calc(50%-10rem)] xs:right-auto xs:top-auto xs:w-80 xs:rounded-t-lg"
          style={{
            transform: "translate-3d(-50%, 0,0)",
          }}
        >
          <div className="flex justify-between border-b-2 border-white/50 border-opacity-90 p-1 pb-2 md:p-2 md:pb-4">
            <p>Preferences</p>
            {windowWidth < 640 && (
              <button
                className="text-red-500"
                onClick={() => handleOpenChange(false)}
              >
                <X />
              </button>
            )}
          </div>
          <div className="my-6 flex flex-col gap-4 px-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm">Auto Play</p>
              <Radio
                color={theme.secondaryColor}
                enabled={autoPlay}
                setEnabled={handleChangeAutoPlay}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm">Auto Skip (Into, Outro, Recap)</p>
              <Radio
                color={theme.secondaryColor}
                enabled={autoSkip}
                setEnabled={handleChangeAutoSkip}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm">Auto Next</p>
              <Radio
                color={theme.secondaryColor}
                enabled={autoNext}
                setEnabled={handleChangeAutoNext}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm">Seek time</p>
              <Select
                list={seekTimeList}
                color={theme.secondaryColor}
                selected={
                  seekTimeList[
                    seekTimeList.findIndex((item) => item.value === seekSeconds)
                  ]
                }
                onChange={handleChangeSeekSeconds}
              />
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default PreferenceSettingModal;
