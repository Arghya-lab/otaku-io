import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import preferenceSlice from "../features/preference/preferenceSlice";
import contentSlice from "../features/content/contentSlice";
import selectedSlice from "../features/selected/selectedSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    preference: preferenceSlice,
    content: contentSlice,
    selected: selectedSlice,
  },
});

export default store;
