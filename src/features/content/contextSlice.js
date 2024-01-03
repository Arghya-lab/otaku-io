import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import animeApi from "../../Api/animeApi";

// First, create the thunk
const loadHomePage = createAsyncThunk("content/loadHomePage", async () => {
  const trendingRes = await animeApi.getTrending({ page: 1, perPage: 10 });
  const popularRes = await animeApi.getPopular({ page: 1, perPage: 10 });
  return {
    trending: trendingRes.data,
    popular: popularRes.data,
  };
});

const initialState = {
  isHomePageLoaded: false,
  trending: [],
  // additional trending content related info like currentPage, hasNextPage
  popular: [],
  // additional popular content related info like currentPage, hasNextPage
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadHomePage.fulfilled, (state, action) => {
      const { trending, popular } = action.payload;

      state.trending = trending?.results || [];
      state.popular = popular?.results || [];

      state.isHomePageLoaded = true;
    }),
      builder.addCase(loadHomePage.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = contentSlice.actions;
export { loadHomePage };
export default contentSlice.reducer;
