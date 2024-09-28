import * as activeType from "./constants";

import { fetchEntireRoomList } from "@/services/modules/entire";

// 数据改变
export const changeCurrentPageAction = (currentPage) => ({
  type: activeType.CHANGE_CURRENT_PAGE,
  currentPage
});

export const changeRoomListAction = (roomList) => ({
  type: activeType.CHANGE_ROOM_LIST,
  roomList
});

export const changeTotalCountAction = (totalCount) => ({
  type: activeType.CHANGE_TOTAL_COUNT,
  totalCount
});

export const changeIsLoadingAction = (isLoading) => ({
  type: activeType.CHANGE_IS_LOADING,
  isLoading
});

// 网络请求
export const fetchRoomListAction = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(changeCurrentPageAction(page));

    const pageSize = getState().entire.size;
    const offset = pageSize * page;

    dispatch(changeIsLoadingAction(true));
    const res = await fetchEntireRoomList(offset, pageSize);
    dispatch(changeIsLoadingAction(false));

    dispatch(changeTotalCountAction(res.totalCount));
    dispatch(changeRoomListAction(res.list));
  };
};
