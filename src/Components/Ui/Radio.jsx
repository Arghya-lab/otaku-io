import PropType from "prop-types";
import { Switch } from "@headlessui/react";
import { shade } from "../../utils/color"

function Radio({ color = "#fff", enabled, setEnabled }) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="
          relative inline-flex h-[27px] w-[58px] shrink-0 cursor-pointer rounded-3xl border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      style={{
        backgroundColor: enabled ? shade(color, 1, 0.2) : shade(color, -1, 0.2),
      }}>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-[30px]" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-3xl
            , shadow-lg ring-0 transition duration-200 ease-in-out`}
        style={{
          backgroundColor: enabled ? shade(color, 0) : shade(color, 0.25),
        }}
      />
    </Switch>
  );
}

Radio.propTypes = {
  color: PropType.string,
  enabled: PropType.bool.isRequired,
  setEnabled: PropType.func.isRequired,
};

export default Radio;
