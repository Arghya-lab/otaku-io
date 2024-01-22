import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { themeTypes } from "../../themes";
import { getUser, login, logout, signup } from "../auth/authSlice";
import preferences from "../../appwrite/preferences";

// First, create the thunk
const changeLanguagePref = createAsyncThunk(
  "preference/changeLanguagePref",
  async (value) => {
    const preference = await preferences.changeLanguagePref(value);
    return { preference };
  }
);

const changeTheme = createAsyncThunk(
  "preference/changeTheme",
  async (value) => {
    const preference = await preferences.changeTheme(value);
    return { preference };
  }
);

const changeAutoPlay = createAsyncThunk(
  "preference/changeAutoPlay",
  async (value) => {
    const preference = await preferences.changeAutoPlay(value);
    return { preference };
  }
);

const changeAutoNext = createAsyncThunk(
  "preference/changeAutoNext",
  async (value) => {
    const preference = await preferences.changeAutoNext(value);
    return { preference };
  }
);

const changeAutoSkip = createAsyncThunk(
  "preference/changeAutoSkip",
  async (value) => {
    const preference = await preferences.changeAutoSkip(value);
    return { preference };
  }
);

const changeSeekSeconds = createAsyncThunk(
  "preference/changeSeekSeconds",
  async (value) => {
    const preference = await preferences.changeSeekSeconds(value);
    return { preference };
  }
);

const toggleBookMark = createAsyncThunk(
  "preference/toggleBookMark",
  async ({ userId, animeId }) => {
    const preference = await preferences.toggleBookMark(userId, animeId);
    return { preference };
  }
);

const initialState = {
  preferenceId: null,
  isDubEnabled: false,
  isAutoPlayEnabled: true,
  isAutoNextEnabled: true,
  isAutoSkipEnabled: false,
  videoSeekSeconds: 10,
  bookmarks: [],
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? themeTypes[1]
    : themeTypes[0],
};

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, handlePreferenceUpdate);
    builder.addCase(login.fulfilled, handlePreferenceUpdate);
    builder.addCase(getUser.fulfilled, handlePreferenceUpdate);
    builder.addCase(logout.fulfilled, (state) => {
      (state.preferenceId = null), (state.isDubEnabled = false);
      state.isAutoPlayEnabled = false;
      state.isAutoNextEnabled = false;
      state.videoSeekSeconds = 10;
      state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themeTypes[1]
        : themeTypes[0];
    });
    // language change change
    builder.addCase(changeLanguagePref.fulfilled, handlePreferenceUpdate);
    builder.addCase(changeLanguagePref.rejected, (state, action) => {
      console.error(action.error.message);
    });
    // theme change
    builder.addCase(changeTheme.fulfilled, handlePreferenceUpdate);
    builder.addCase(changeTheme.rejected, (state, action) => {
      console.error(action.error.message);
    });
    // change auto play
    builder.addCase(changeAutoPlay.fulfilled, handlePreferenceUpdate);
    builder.addCase(changeAutoPlay.rejected, (state, action) => {
      console.error(action.error.message);
    });
    // change auto next
    builder.addCase(changeAutoNext.fulfilled, handlePreferenceUpdate);
    builder.addCase(changeAutoNext.rejected, (state, action) => {
      console.error(action.error.message);
    });
    // change auto skip
    builder.addCase(changeAutoSkip.fulfilled, handlePreferenceUpdate);
    builder.addCase(changeAutoSkip.rejected, (state, action) => {
      console.error(action.error.message);
    });
    // change seek time
    builder.addCase(changeSeekSeconds.fulfilled, handlePreferenceUpdate);
    builder.addCase(changeSeekSeconds.rejected, (state, action) => {
      console.error(action.error.message);
    });
    // change seek time
    builder.addCase(toggleBookMark.fulfilled, handlePreferenceUpdate);
    builder.addCase(toggleBookMark.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

const handlePreferenceUpdate = (state, action) => {
  const { preference } = action.payload;

  state.preferenceId = preference?.$id;
  state.isDubEnabled = preference?.isDub;
  state.isAutoPlayEnabled = preference?.autoPlay;
  state.isAutoNextEnabled = preference?.autoNext;
  state.isAutoSkipEnabled = preference?.autoSkip;
  state.videoSeekSeconds = preference?.seekSeconds;
  state.bookmarks = preference?.bookmarks || [];
  if (preference?.themeId) {
    state.theme = themeTypes.find((theme) => theme.id === preference?.themeId);
  }
};

// Action creators are generated for each case reducer function
export const { setTheme } = preferenceSlice.actions;
export {
  changeLanguagePref,
  changeTheme,
  changeAutoPlay,
  changeAutoNext,
  changeAutoSkip,
  changeSeekSeconds,
  toggleBookMark,
};

export default preferenceSlice.reducer;
