import { MusicRequestInstance } from "../index";

// 请求MV列表
export const getTopMvList = (offset = 0, limit = 20) => {
  return MusicRequestInstance.get({
    url: "/top/mv",
    data: { offset, limit },
  });
};

// 请求MV视频
export const getMvVideoById = (id) => {
  return MusicRequestInstance.get({
    url: "/mv/url",
    data: { id },
  });
};

// 请求MV信息
export const getMvInfoById = (mvid) => {
  return MusicRequestInstance.get({
    url: "/mv/detail",
    data: { mvid },
  });
};

// 请求MV相关视频
export const getMvRelatedById = (id) => {
  return MusicRequestInstance.get({
    url: "/related/allvideo",
    data: { id },
  });
};

// 请求视频的信息
export const getVideoInfoById = (id) => {
  return MusicRequestInstance.get({
    url: "/video/detail",
    data: { id },
  });
};
