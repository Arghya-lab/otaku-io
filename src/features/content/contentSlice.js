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
  console.log(res.data);
  return res.data;
});

const loadDetailInfo = createAsyncThunk(
  "content/loadDetailInfo",
  async ({ id, params }) => {
    const res = await animeApi.getDetails(id, { dub: true, ...params });
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
  imdbInfo: {},
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    resetImdbInfo: (state) => {
      state.imdbInfo = {};
    },
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
    }),
      builder.addCase(loadHomePage.rejected, (state, action) => {
        console.log(action.error.message);
      });

    // filter
    builder.addCase(applyFilter.fulfilled, (state, action) => {
      state.filterContent = [
        ...state.filterContent,
        ...(action.payload?.results || []),
      ];
      state.hasMoreFilterContent = action.payload?.hasNextPage || false;
      state.currentFilterContentPage = action.payload?.currentPage;
    }),
      builder.addCase(applyFilter.rejected, (state, action) => {
        console.log(action.error.message);
      });

    // loadDetailInfo of an anime
    builder.addCase(loadDetailInfo.fulfilled, (state, action) => {
      state.detailInfo = action.payload;
    }),
      builder.addCase(loadDetailInfo.rejected, (state, action) => {
        console.log(action.error.message);
      });
    // loadImdbInfo of an anime
    builder.addCase(loadImdbInfo.fulfilled, (state, action) => {
      if (!(action.payload?.Response == "False" || action.payload?.Error)) {
        state.imdbInfo = action.payload;
      }
    }),
      builder.addCase(loadImdbInfo.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetImdbInfo, clearFilterData } = contentSlice.actions;
export { loadHomePage, applyFilter, loadDetailInfo, loadImdbInfo };
export default contentSlice.reducer;
