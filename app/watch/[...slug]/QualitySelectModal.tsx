import useChangePreference from "@/hooks/useChangePreference";
import useWindowSize from "@/hooks/useWindowSize";
import { PlayerActionType, PlayerStateType } from "@/types/player";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { Dispatch } from "react";

function QualitySelectModal({
  state,
  setWatched,
  dispatch,
}: {
  state: PlayerStateType;
  setWatched: () => Promise<void>;
  dispatch: Dispatch<PlayerActionType>;
}) {
  const { windowWidth } = useWindowSize();
  const { handleChangePlaybackQuality } = useChangePreference();

  return (
    <Dialog.Root
      open={state.isQualitySelectionOpen}
      onOpenChange={(value) =>
        dispatch({ type: "qualityOpenChange", payload: value })
      }
    >
      <Dialog.Content className="DialogContent">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 z-40 overflow-y-auto bg-black p-2 text-white xs:left-[calc(50%-8rem)] xs:right-auto xs:top-auto xs:w-64 xs:rounded-t-lg"
          style={{
            transform: "translate-3d(-50%, 0,0)",
          }}
        >
          <div className="flex justify-between border-b-2 border-white/50 border-opacity-90 p-1 pb-2 md:p-2 md:pb-4">
            <p>Quality</p>
            {windowWidth < 640 && (
              <button
                className="text-red-500"
                onClick={() =>
                  dispatch({ type: "qualityOpenChange", payload: false })
                }
              >
                <X />
              </button>
            )}
          </div>
          <div className="my-2">
            {state.sources.map((source) => (
              <div
                role="button"
                className="mx-2 flex select-none justify-between rounded px-2 py-1 font-nunito text-sm hover:bg-white/10 md:px-4 md:py-2"
                key={source?.quality}
                onClick={() => {
                  setWatched();
                  dispatch({
                    type: "updateStreamingLinks",
                    payload: {
                      sources: state.sources,
                      currentSource: source,
                      playing: state.playing,
                    },
                  });
                  if (
                    source?.quality &&
                    ["360p", "480p", "720p", "1080p"].includes(source.quality)
                  ) {
                    handleChangePlaybackQuality({ value: source?.quality });
                  }
                  dispatch({ type: "qualityOpenChange", payload: false });
                }}
              >
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
    </Dialog.Root>
  );
}

export default QualitySelectModal;
