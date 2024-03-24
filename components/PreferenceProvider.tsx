"use client";

import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { themes } from "@/theme";
import setThemeInCookie from "@/actions/actions";

export const defaultPreference = {
  themeId: 23,
  autoNext: false,
  autoPlay: true,
  autoSkip: false,
  isDub: false,
  playbackQuality: "360p",
  seekSeconds: 10,
};

export enum UpdateTypeEnum {
  TOGGLE_AUTO_NEXT = "TOGGLE_AUTO_NEXT",
  TOGGLE_AUTO_PLAY = "TOGGLE_AUTO_PLAY",
  TOGGLE_AUTO_SKIP = "TOGGLE_AUTO_SKIP",
  TOGGLE_IS_DUB = "TOGGLE_IS_DUB",
  CHANGE_PLAYBACK_QUALITY = "CHANGE_PLAYBACK_QUALITY",
  CHANGE_SEEK_SECONDS = "CHANGE_SEEK_SECONDS",
  CHANGE_THEME_ID = "CHANGE_THEME_ID",
}

export interface PreferenceContextInterface {
  autoNext: boolean;
  autoPlay: boolean;
  autoSkip: boolean;
  isDub: boolean;
  playbackQuality: string;
  seekSeconds: number;
  themeId: number;
  updatePreference: (
    updateType: UpdateTypeEnum,
    value: string | number | undefined | void
  ) => void;
}

export const PreferencesContext = createContext<PreferenceContextInterface>({
  ...defaultPreference,
  updatePreference: () => {}, // Placeholder function
});

export const usePreference = () => useContext(PreferencesContext);

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [preferences, setPreferences] = useState(defaultPreference);

  const fetchPreferences = async () => {
    if (!localStorage.getItem("preferences")) {
      localStorage.setItem("preferences", JSON.stringify(defaultPreference));
    }
    try {
      const res = await axios.get("/api/preference");

      setPreferences(res.data);
      localStorage.setItem("preferences", JSON.stringify(res.data));
    } catch (err) {
      console.warn("Error occur while fetching data from server error ::", err);
    }
  };

  useEffect(() => {
    if (session) {
      setPreferences(
        JSON.parse(
          localStorage.getItem("preferences") ||
            JSON.stringify(defaultPreference)
        )
      );
      fetchPreferences();
    }
  }, [session]);

  const updatePreferences = async (
    updateType: UpdateTypeEnum,
    payload: string | number | undefined | void = undefined
  ) => {
    try {
      if (session) {
        let data;

        if (updateType === UpdateTypeEnum.TOGGLE_AUTO_NEXT) {
          ({ data } = await axios.patch("/api/preference/auto-next"));
        } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_PLAY) {
          ({ data } = await axios.patch("/api/preference/auto-play"));
        } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_SKIP) {
          ({ data } = await axios.patch("/api/preference/auto-skip"));
        } else if (updateType === UpdateTypeEnum.TOGGLE_IS_DUB) {
          ({ data } = await axios.patch("/api/preference/isDub"));
        } else if (updateType === UpdateTypeEnum.CHANGE_PLAYBACK_QUALITY) {
          if (
            !payload ||
            !["360p", "480p", "720p", "1080p"].includes(payload.toString())
          ) {
            console.error("Error: invalid preference update payload.");
          } else {
            ({ data } = await axios.patch("/api/preference/playback-quality", {
              playbackQuality: payload.toString(),
            }));
          }
        } else if (updateType === UpdateTypeEnum.CHANGE_SEEK_SECONDS) {
          if (!payload || ![5, 10, 15, 20].includes(Number(payload))) {
            console.error("Error: invalid preference update payload.");
          } else {
            ({ data } = await axios.patch("/api/preference/seek-seconds", {
              seekSeconds: Number(payload),
            }));
          }
        } else if (updateType === UpdateTypeEnum.CHANGE_THEME_ID) {
          payload = Number(payload);
          setThemeInCookie(payload);

          if (!payload || payload < 1 || payload > themes.length) {
            console.error("Error: invalid preference update payload.");
          } else {
            ({ data } = await axios.patch("/api/preference/themeid", {
              themeId: Number(payload),
            }));
          }
        } else {
          console.error("Error: invalid preference update type.");
        }

        if (data) {
          setPreferences(data);
          localStorage.setItem("preferences", JSON.stringify(data));
        }
      } else {
        if (updateType === UpdateTypeEnum.TOGGLE_AUTO_NEXT) {
          setPreferences((prev) => ({ ...prev, autoNext: !prev.autoNext }));
        } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_PLAY) {
          setPreferences((prev) => ({ ...prev, autoPlay: !prev.autoPlay }));
        } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_SKIP) {
          setPreferences((prev) => ({ ...prev, autoSkip: !prev.autoSkip }));
        } else if (updateType === UpdateTypeEnum.TOGGLE_IS_DUB) {
          setPreferences((prev) => ({ ...prev, isDub: !prev.isDub }));
        } else if (updateType === UpdateTypeEnum.CHANGE_PLAYBACK_QUALITY) {
          if (
            !payload ||
            !["360p", "480p", "720p", "1080p"].includes(payload.toString())
          ) {
            console.error("Error: invalid preference update payload.");
          }
          if (typeof payload === "string") {
            setPreferences({
              ...preferences,
              playbackQuality: payload,
            });
          }
        } else if (updateType === UpdateTypeEnum.CHANGE_SEEK_SECONDS) {
          if (!payload || ![5, 10, 15, 20].includes(Number(payload))) {
            console.error("Error: invalid preference update payload.");
          } else {
            setPreferences((prev) => ({
              ...prev,
              seekSeconds: Number(payload),
            }));
          }
        } else if (updateType === UpdateTypeEnum.CHANGE_THEME_ID) {
          payload = Number(payload);
          setThemeInCookie(payload);

          if (!payload || payload < 1 || payload > themes.length) {
            console.error("Error: invalid preference update payload.");
          } else {
            setPreferences((prev) => ({
              ...prev,
              themeId: Number(payload),
            }));
          }
          // cookies().set("themeId", payload.toString())
        } else {
          console.error("Error: invalid preference update type.");
        }
        localStorage.setItem("preferences", JSON.stringify(preferences));
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  const value = { ...preferences, updatePreference: updatePreferences }; // Combine data and update function

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
