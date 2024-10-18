"use client";

import {
  UpdateTypeEnum,
  usePreference,
} from "@/components/providers/PreferenceProvider";
import Radio from "@/components/ui/Radio";
import Select from "@/components/ui/Select";
import { useTheme } from "next-themes";

function GeneralSection() {
  const { isDub, updatePreference } = usePreference();
  const { setTheme, themes, resolvedTheme } = useTheme();

  const handleChangeLanguage = () => {
    updatePreference(UpdateTypeEnum.TOGGLE_IS_DUB);
  };

  const themeList: { value?: string | number; name: string }[] = themes.map(
    (theme) => ({ name: theme, value: theme })
  );

  return (
    <section className="flex flex-col gap-2 border-b border-zinc-500 pb-16 pt-6">
      <h3 className="pb-6 text-xl">General</h3>
      <div className="flex flex-col gap-2 xs:pl-12">
        <div className="flex gap-4">
          <p className="text-sm">Dub as auto select language</p>
          <Radio enabled={isDub} handleChange={handleChangeLanguage} />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm">Seek time</p>
          <Select
            list={themeList}
            selected={{ name: resolvedTheme || "", value: resolvedTheme }}
            onChange={({ value }) => setTheme(value as string)}
          />
        </div>
      </div>
    </section>
  );
}

export default GeneralSection;
