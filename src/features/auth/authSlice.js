import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../appwrite/auth";

// First, create the thunk
const signup = createAsyncThunk("auth/signup", async (user) => {
  return await authService.createUser(user);
});

const login = createAsyncThunk("auth/login", async (user) => {
  return await authService.loginUser(user);
});

const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logoutUser();
});

const getUser = createAsyncThunk("auth/getUser", async () => {
  return await authService.getCurrentUser();
});

const initialState = {
  status: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Initial home page load
    builder.addCase(signup.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.status = true;
    }),
      builder.addCase(signup.rejected, (state, action) => {
        console.error(action.error.message);
      });

    builder.addCase(login.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.status = true;
    }),
      builder.addCase(login.rejected, (state, action) => {
        console.error(action.error.message);
      });

    builder.addCase(logout.fulfilled, (state) => {
      state.status = false;
    }),
      builder.addCase(logout.rejected, (state, action) => {
        console.error(action.error.message);
      });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.status = true;
    }),
      builder.addCase(getUser.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});

// Action creators are generated for each case reducer function
// export const { resetImdbInfo } = authSlice.actions;
export { signup, login, logout, getUser };
export default authSlice.reducer;
