import {
  fetchHomeGoodScore,
  fetchHomeHighScore,
  fetchHomeDiscount,
  fetchRecommend,
  fetchLongfor,
  fetchHomePlus
} from "@/services/modules/home";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeDataAction = createAsyncThunk("fetchHomeDataAction", (payload, { dispatch }) => {
  fetchHomeGoodScore().then((res) => {
    dispatch(fetchHomeGoodScoreAction(res));
  });
  fetchHomeHighScore().then((res) => {
    dispatch(fetchHomeHighScoreAction(res));
  });
  fetchHomeDiscount().then((res) => {
    dispatch(fetchHomeDiscountAction(res));
  });
  fetchRecommend().then((res) => {
    dispatch(fetchRecommendAction(res));
  });
  fetchLongfor().then((res) => {
    dispatch(fetchLongforAction(res));
  });
  fetchHomePlus().then((res) => {
    dispatch(fetchHomePlusAction(res));
  });
});

const homeSlice = createSlice({
  name: "home",
  initialState: {
    homeGoodScore: {},
    homeHighScore: {},
    homeDiscount: {},
    homeRecommend: {},
    homeLongfor: {},
    homePlus: {}
  },
  reducers: {
    fetchHomeGoodScoreAction(state, { payload }) {
      state.homeGoodScore = payload;
    },
    fetchHomeHighScoreAction(state, { payload }) {
      state.homeHighScore = payload;
    },
    fetchHomeDiscountAction(state, { payload }) {
      state.homeDiscount = payload;
    },
    fetchRecommendAction(state, { payload }) {
      state.homeRecommend = payload;
    },
    fetchLongforAction(state, { payload }) {
      state.homeLongfor = payload;
    },
    fetchHomePlusAction(state, { payload }) {
      state.homePlus = payload;
    }
  },
  extraReducers: (builder) => {}
});

export const {
  fetchHomeGoodScoreAction,
  fetchHomeHighScoreAction,
  fetchHomeDiscountAction,
  fetchRecommendAction,
  fetchLongforAction,
  fetchHomePlusAction
} = homeSlice.actions;

export default homeSlice.reducer;
