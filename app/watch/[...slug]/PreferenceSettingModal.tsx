import { X } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog';
import useWindowSize from "@/hooks/useWindowSize";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import { usePreference } from "@/components/providers/PreferenceProvider";
import { seekTimeList } from "@/types/constants";
import { themes } from "@/theme";
import useChangePreference from "@/hooks/useChangePreference";

function PreferenceSettingModal({isOpen, handleOpenChange}:{
  isOpen: boolean;
  handleOpenChange: (value?:boolean)=>void
}) {
    const {windowWidth}= useWindowSize();
    const {
      themeId,
      autoPlay,
      autoSkip,
      autoNext,
      seekSeconds
    } = usePreference();
    const theme = themes.find((theme) => theme.id === themeId) || themes[0];
    
    const {
      handleChangeAutoNext,
      handleChangeAutoPlay,
      handleChangeAutoSkip,
      handleChangeSeekSeconds
    }= useChangePreference()

    return (
      <Dialog.Root open={isOpen} onOpenChange={value=>handleOpenChange(value)} >
      <Dialog.Content className="DialogContent">        
      <div className="absolute bottom-0 top-0 left-0 right-0 xs:top-auto xs:left-[calc(50%-10rem)] xs:right-auto bg-black z-40 xs:rounded-t-lg xs:w-80 p-2 text-white overflow-y-auto" style={{
        transform: "translate-3d(-50%, 0,0)"
      }}>
        <div className="p-1 md:p-2 pb-2 md:pb-4 border-opacity-90 border-white/50 border-b-2 flex justify-between">
          <p> 
            Preferences
          </p>
          {windowWidth<640 && (<button className="text-red-500" onClick={()=>handleOpenChange(false)}><X /></button>)}
        </div>
        <div className="my-6 flex flex-col gap-4 px-4">
        <div className="flex gap-4 items-center justify-between">
          <p className="text-sm">Auto Play</p>
          <Radio
            color={theme.secondaryColor}
            enabled={autoPlay}
            setEnabled={handleChangeAutoPlay}
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <p className="text-sm">Auto Skip (Into, Outro, Recap)</p>
          <Radio
            color={theme.secondaryColor}
            enabled={autoSkip}
            setEnabled={handleChangeAutoSkip}
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <p className="text-sm">Auto Next</p>
          <Radio
            color={theme.secondaryColor}
            enabled={autoNext}
            setEnabled={handleChangeAutoNext}
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
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
  </Dialog.Root>)
}

export default PreferenceSettingModal