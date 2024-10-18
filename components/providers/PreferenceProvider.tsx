"use client";

import { PreferenceType } from "@/types/States";
import { PreferenceApiSuccessResType } from "@/types/apiResponse";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const defaultPreference = {
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
}

export interface PreferenceContextInterface {
  autoNext: boolean;
  autoPlay: boolean;
  autoSkip: boolean;
  isDub: boolean;
  playbackQuality: string;
  seekSeconds: number;
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
    try {
      const { data }: { data: PreferenceApiSuccessResType } =
        await axios.get("/api/preference");

      setPreferences(data.data);
      localStorage.setItem("preferences", JSON.stringify(data.data));
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    const savePreferences = JSON.parse(
      localStorage.getItem("preferences") || JSON.stringify(defaultPreference)
    ) as PreferenceType;

    localStorage.setItem("preferences", JSON.stringify(savePreferences));

    setPreferences(savePreferences);

    if (session) {
      fetchPreferences();
    }
  }, [session]);

  const updatePreferences = async (
    updateType: UpdateTypeEnum,
    payload: string | number | undefined | void = undefined
  ) => {
    if (session) {
      let preferencesData;

      try {
        if (updateType === UpdateTypeEnum.TOGGLE_AUTO_NEXT) {
          const { data }: { data: PreferenceApiSuccessResType } =
            await axios.patch("/api/preference/auto-next");
          preferencesData = data.data;
        } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_PLAY) {
          const { data }: { data: PreferenceApiSuccessResType } =
            await axios.patch("/api/preference/auto-play");
          preferencesData = data.data;
        } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_SKIP) {
          const { data }: { data: PreferenceApiSuccessResType } =
            await axios.patch("/api/preference/auto-skip");
          preferencesData = data.data;
        } else if (updateType === UpdateTypeEnum.TOGGLE_IS_DUB) {
          const { data }: { data: PreferenceApiSuccessResType } =
            await axios.patch("/api/preference/isDub");
          preferencesData = data.data;
        } else if (updateType === UpdateTypeEnum.CHANGE_PLAYBACK_QUALITY) {
          if (
            !payload ||
            !["360p", "480p", "720p", "1080p"].includes(payload.toString())
          ) {
            console.error("Error: invalid preference update payload.");
          } else {
            const { data }: { data: PreferenceApiSuccessResType } =
              await axios.patch("/api/preference/playback-quality", {
                playbackQuality: payload.toString(),
              });
            preferencesData = data.data;
          }
        } else if (updateType === UpdateTypeEnum.CHANGE_SEEK_SECONDS) {
          if (!payload || ![5, 10, 15, 20].includes(Number(payload))) {
            console.error("Error: invalid preference update payload.");
          } else {
            const { data }: { data: PreferenceApiSuccessResType } =
              await axios.patch("/api/preference/seek-seconds", {
                seekSeconds: Number(payload),
              });
            preferencesData = data.data;
            preferencesData = data.data;
          }
        } else {
          console.error("Error: invalid preference update type.");
        }
      } catch (error) {
        console.error("Error updating preferences:", error);
      }
      if (preferencesData) {
        setPreferences(preferencesData);
        localStorage.setItem("preferences", JSON.stringify(preferencesData));
      }
    } else {
      let data = preferences;

      if (updateType === UpdateTypeEnum.TOGGLE_AUTO_NEXT) {
        data = { ...data, autoNext: !data.autoNext };
      } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_PLAY) {
        data = { ...data, autoPlay: !data.autoPlay };
      } else if (updateType === UpdateTypeEnum.TOGGLE_AUTO_SKIP) {
        data = { ...data, autoSkip: !data.autoSkip };
      } else if (updateType === UpdateTypeEnum.TOGGLE_IS_DUB) {
        data = { ...data, isDub: !data.isDub };
      } else if (updateType === UpdateTypeEnum.CHANGE_PLAYBACK_QUALITY) {
        if (
          !payload ||
          !["360p", "480p", "720p", "1080p"].includes(payload.toString())
        ) {
          console.error("Error: invalid preference update payload.");
        }
        if (typeof payload === "string") {
          data = { ...data, playbackQuality: payload };
        }
      } else if (updateType === UpdateTypeEnum.CHANGE_SEEK_SECONDS) {
        if (!payload || ![5, 10, 15, 20].includes(Number(payload))) {
          console.error("Error: invalid preference update payload.");
        } else {
          data = { ...data, seekSeconds: Number(payload) };
        }
      } else {
        console.error("Error: invalid preference update type.");
      }
      localStorage.setItem("preferences", JSON.stringify(data));
      setPreferences(data);
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
