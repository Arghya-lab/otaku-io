"use client";

import { themes } from "@/theme";
import { shade } from "@/utils/color";
import chroma from "chroma-js";
import { usePreference } from "../providers/PreferenceProvider";

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
  const { themeId } = usePreference();
  const theme = themes.find((theme) => theme.id === themeId) || themes[0];

  return (
    <div>
      {name && (
        <div className="pl-4">
          <p style={{ color: theme.textColor, textTransform: "capitalize" }}>
            {name}
          </p>
        </div>
      )}
      <select
        className="min-w-44 max-w-52 cursor-pointer rounded-[45px] py-1.5 pl-3 pr-6 text-left text-gray-900 shadow-lg focus:outline-none focus:ring-2"
        style={{
          backgroundColor: isWatchPage
            ? chroma(theme.secondaryColor).alpha(0.2).hex()
            : shade(color || theme.primaryColor, 0, 0.2).hex(),
          color: !isWatchPage ? "#fff" : theme.textColor,
        }}
        defaultValue={JSON.stringify(selected)}
        onChange={(e) => onChange(JSON.parse(e.target.value))}
      >
        {list.map((item, id) => (
          <option
            key={id}
            style={{
              backgroundColor:
                selected.value === item.value
                  ? chroma(theme.primaryColor).darken(0.5).hex()
                  : theme.primaryColor,
              color:
                selected.value === item.value
                  ? theme.secondaryColor
                  : theme.textColor,
            }}
            value={JSON.stringify(item)}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
