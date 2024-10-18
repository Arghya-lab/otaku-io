"use client";

import { shade } from "@/utils/color";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

function Radio({
  color,
  enabled,
  handleChange,
  isWatchPage = false,
}: {
  color?: string;
  enabled: boolean;
  handleChange: () => void;
  isWatchPage?: boolean;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={classNames(
        "relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-3xl border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75",
        {
          "bg-opacity-25": isWatchPage && enabled,
          "bg-opacity-15": isWatchPage && !enabled,
        }
      )}
      // style={{
      //   backgroundColor: enabled
      //     ? !isWatchPage
      //       ? shade(color, 1, 0.2).toString()
      //       : chroma(theme.secondaryColor).alpha(0.25).toString() //
      //     : !isWatchPage
      //       ? shade(color, -1, 0.2).toString()
      //       : chroma(theme.secondaryColor).alpha(0.15).toString(), //
      // }}
      style={
        !isWatchPage && color
          ? {
              backgroundColor: enabled
                ? shade(color, 1, 0.2).toString()
                : shade(color, -1, 0.2).toString(),
            }
          : undefined
      }
    >
      <span
        aria-hidden="true"
        className={classNames(
          `${enabled ? "translate-x-[20px]" : "translate-x-0"}`,
          "pointer-events-none inline-block h-[18px] w-[18px] transform rounded-3xl bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
          {
            "bg-opacity-75": isWatchPage && enabled,
            "bg-opacity-50": isWatchPage && !enabled,
          }
        )}
        // style={{
        //   backgroundColor: enabled
        //     ? !isWatchPage
        //       ? shade(color, 0).toString()
        //       : chroma(theme.secondaryColor).alpha(0.75).toString()
        //     : !isWatchPage
        //       ? shade(color, 0.25).toString()
        //       : chroma(theme.secondaryColor).alpha(0.5).toString(),
        // }}
        style={
          !isWatchPage && color
            ? {
                backgroundColor: enabled
                  ? shade(color, 0).toString()
                  : shade(color, 0.25).toString(),
              }
            : undefined
        }
      />
    </Switch>
  );
}

export default Radio;
