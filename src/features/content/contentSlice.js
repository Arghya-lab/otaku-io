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

const applyFilter = createAsyncThunk("content/applyFilter", async (params) => {
  const res = await animeApi.advancedSearch(params);
  return res.data;
});

const loadDetailInfo = createAsyncThunk(
  "content/loadDetailInfo",
  async ({ id, params }) => {
    const res = await animeApi.getDetails(id, params);
    return res.data;
  }
);
const loadImdbInfo = createAsyncThunk(
  "content/loadImdbInfo",
  async (params) => {
    const res = await animeApi.getImdbData(params);
    return res.data;
  }
);

const initialState = {
  isHomePageLoaded: false,
  trending: [],
  // additional trending content related info like currentPage, hasNextPage
  popular: [],
  // additional popular content related info like currentPage, hasNextPage
  filterContent: [],
  hasMoreFilterContent: false,
  currentFilterContentPage: 0,

  detailInfo: {},
  detailInfoLoaded: false,
  imdbInfo: {},
  imdbInfoLoaded: false,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    clearFilterData: (state) => {
      state.filterContent = [];
      state.hasMoreFilterContent = false;
      state.currentFilterContentPage = 0;
    },
  },
  extraReducers: (builder) => {
    // Initial home page load
    builder.addCase(loadHomePage.fulfilled, (state, action) => {
      const { trending, popular } = action.payload;

      state.trending = trending?.results || [];
      state.popular = popular?.results || [];

      state.isHomePageLoaded = true;
    });
    builder.addCase(loadHomePage.rejected, (state, action) => {
      console.error(action.error.message);
    });

    // filter
    builder.addCase(applyFilter.fulfilled, (state, action) => {
      state.filterContent = [
        ...state.filterContent,
        ...(action.payload?.results || []),
      ];
      state.hasMoreFilterContent = action.payload?.hasNextPage || false;
      state.currentFilterContentPage = action.payload?.currentPage;
    });
    builder.addCase(applyFilter.rejected, (state, action) => {
      console.error(action.error.message);
    });

    // loadDetailInfo of an anime
    builder.addCase(loadDetailInfo.pending, (state) => {
      state.detailInfoLoaded = false;
    });
    builder.addCase(loadDetailInfo.fulfilled, (state, action) => {
      state.detailInfo = action.payload;
      state.detailInfoLoaded = true;
    });
    builder.addCase(loadDetailInfo.rejected, (state, action) => {
      state.detailInfoLoaded = true;
      console.error(action.error.message);
    });
    // loadImdbInfo of an anime
    builder.addCase(loadImdbInfo.pending, (state) => {
      state.imdbInfoLoaded = false;
    });
    builder.addCase(loadImdbInfo.fulfilled, (state, action) => {
      if (!(action.payload?.Response == "False" || action.payload?.Error)) {
        state.imdbInfo = action.payload;
      }
      state.imdbInfoLoaded = true;
    });
    builder.addCase(loadImdbInfo.rejected, (state, action) => {
      state.imdbInfoLoaded = true;
      console.error(action.error.message);
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearFilterData } = contentSlice.actions;
export { loadHomePage, applyFilter, loadDetailInfo, loadImdbInfo };
export default contentSlice.reducer;
