import { PlayerActionType, PlayerStateType } from "@/types/player";
import { Check, X } from "lucide-react";
import { Dispatch } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import useWindowSize from "@/hooks/useWindowSize";
import useChangePreference from "@/hooks/useChangePreference";

function QualitySelectModal({state,setWatched,dispatch}:{
  state: PlayerStateType;
  setWatched: () => Promise<void>;
  dispatch: Dispatch<PlayerActionType>;}) {
    const {windowWidth}= useWindowSize();
    const { handleChangePlaybackQuality }= useChangePreference();

    return (
      <Dialog.Root open={state.isQualitySelectionOpen} onOpenChange={value=>dispatch({type: "qualityOpenChange",payload:value})} >
      <Dialog.Content className="DialogContent">        
      <div className="absolute bottom-0 top-0 left-0 right-0 xs:top-auto xs:left-[calc(50%-8rem)] xs:right-auto bg-black z-40 xs:rounded-t-lg xs:w-64 p-2 text-white overflow-y-auto" style={{
        transform: "translate-3d(-50%, 0,0)"
      }}>
        <div className="p-1 md:p-2 pb-2 md:pb-4 border-opacity-90 border-white/50 border-b-2 flex justify-between">
          <p>
            Quality
          </p>
          {windowWidth<640 && (<button className="text-red-500" onClick={()=>dispatch({type: "qualityOpenChange", payload:false})}><X /></button>)}
        </div>
        <div className="my-2">
          {state.sources.map((source) => (
            <div
              role="button"
              className="mx-2 px-2 md:px-4 py-1 md:py-2 text-sm font-nunito hover:bg-white/10 rounded flex justify-between select-none"
              key={source?.quality}
              onClick={
                () => {
                  setWatched();
                  dispatch({
                    type: "updateStreamingLinks",
                    payload: {
                      sources: state.sources,
                      currentSource: source,
                      playing: state.playing,
                    },
                  });
                  if(source?.quality && ["360p", "480p", "720p", "1080p"].includes(source.quality)){
                    handleChangePlaybackQuality({value: source?.quality})
                  }
                  dispatch({type: "qualityOpenChange", payload:false});
                }
              }>
              {source?.quality}
              <Check
                className={
                  source?.quality == state.currentSource?.quality
                    ? "text-white"
                    : "text-transparent"
                }
              />
            </div>
          ))}
        </div>
      </div>
      </Dialog.Content>
  </Dialog.Root>)
}

export default QualitySelectModal