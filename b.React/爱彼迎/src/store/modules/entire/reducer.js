import * as activeType from "./constants";

const initialState = {
  currentPage: 0, // 当前页码
  roomList: [], // 房间列表
  totalCount: 0, // 总数据
  size: 20, // 一页多少数据

  isLoading: true // 是否正在加载
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case activeType.CHANGE_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case activeType.CHANGE_ROOM_LIST:
      return { ...state, roomList: action.roomList };
    case activeType.CHANGE_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount };
    case activeType.CHANGE_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}

export default reducer;
