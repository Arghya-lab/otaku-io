"use server";

import { cookies } from "next/headers";

const setThemeInCookie = async (themeId: number | string) => {
  cookies().set("themeId", themeId.toString());
};

export default setThemeInCookie;
