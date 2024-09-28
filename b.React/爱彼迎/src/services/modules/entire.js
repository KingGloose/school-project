import RequestService from "..";

// 获取roomlist数据
export const fetchEntireRoomList = (offset = 0, size = 20) => {
  return RequestService.get({
    url: "/entire/list",
    params: {
      offset,
      size
    }
  });
};
