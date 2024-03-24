import { shade } from "@/utils/color";
import { Switch } from "@headlessui/react";

function Radio({
  color = "#fff",
  enabled,
  setEnabled,
}: {
  color?: string;
  enabled: boolean;
  setEnabled: () => void;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-3xl border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      style={{
        backgroundColor: enabled
          ? shade(color, 1, 0.2).toString()
          : shade(color, -1, 0.2).toString(),
      }}>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-[20px]" : "translate-x-0"}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-3xl
            , shadow-lg ring-0 transition duration-200 ease-in-out`}
        style={{
          backgroundColor: enabled
            ? shade(color, 0).toString()
            : shade(color, 0.25).toString(),
        }}
      />
    </Switch>
  );
}

export default Radio;
