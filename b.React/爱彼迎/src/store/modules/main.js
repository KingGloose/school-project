import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    AppHeaderConfig: {
      isFixed: true,
      topAlpha: false
    }
  },
  reducers: {
    changeAppHeaderConfigAction(state, { payload }) {
      state.AppHeaderConfig = payload;
    }
  }
});

export const { changeAppHeaderConfigAction } = mainSlice.actions;
export default mainSlice.reducer;
