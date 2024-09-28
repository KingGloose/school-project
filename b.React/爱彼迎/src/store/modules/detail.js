import { createSlice } from "@reduxjs/toolkit";
import { sessionCache } from "@/utils/cache";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detailInfo: sessionCache.getCache("detailInfo") ?? {}
  },
  reducers: {
    changeDetailInfoAction(state, { payload }) {
      sessionCache.setCache("detailInfo", payload);
      state.detailInfo = payload;
    }
  }
});

export const { changeDetailInfoAction } = detailSlice.actions;

export default detailSlice.reducer;
