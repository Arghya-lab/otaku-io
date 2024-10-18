"use client";

import { shade } from "@/utils/color";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";

function Select({
  name,
  color,
  list,
  selected,
  onChange,
  isWatchPage = false,
}: {
  name?: string;
  color?: string;
  list: { value?: string | number; name: string }[];
  selected: { value?: string | number; name: string };
  onChange: (value: { value?: string | number; name: string }) => void;
  isWatchPage?: boolean;
}) {
  return (
    <div>
      {name && (
        <div className="pl-4">
          <p className="capitalize">{name}</p>
        </div>
      )}
      <span
        className={classNames("relative min-w-min text-foreground", {
          "text-white": !isWatchPage,
        })}
      >
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 py-1.5" />
        <select
          className={classNames(
            "min-w-44 max-w-52 cursor-pointer rounded-[45px] py-1.5 pl-3 pr-7 text-left text-inherit shadow-lg focus:outline-none focus:ring-2",
            {
              "border-primary bg-primary": isWatchPage,
              "border-[1px] bg-muted focus:border-accent": !isWatchPage,
            }
          )}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundColor: color ? shade(color, 0, 0.2).hex() : undefined,
            borderColor: color ? shade(color, 0, 0.2).hex() : undefined,
          }}
          defaultValue={JSON.stringify(selected)}
          onChange={(e) => onChange(JSON.parse(e.target.value))}
        >
          {list.map((item, id) => (
            <option
              key={id}
              className={classNames("hover:bg-primary", {
                "text-primary": selected.value === item.value,
              })}
              value={JSON.stringify(item)}
            >
              {item.name}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

export default Select;
