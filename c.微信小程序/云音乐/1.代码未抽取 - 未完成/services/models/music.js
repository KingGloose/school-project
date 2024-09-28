import { MusicRequestInstance } from "../index";

// 获取歌曲轮播图
export const getMusicBanner = () => {
  return MusicRequestInstance.get({
    url: "/banner",
  });
};

// 获取推荐歌曲
export const getRecommendMusicList = (id = 3778678) => {
  return MusicRequestInstance.get({
    url: "/playlist/detail",
    data: { id },
  });
};

// 获取全部歌单
export const getPlayMenuList = (cat = "全部", limit = 6, offset = 0) => {
  return MusicRequestInstance.get({
    url: "/top/playlist",
    data: { cat, limit, offset },
  });
};

// 获取歌单所有的标签
export const getMusicTag = () => {
  return MusicRequestInstance.get({
    url: "/playlist/hot",
  });
};

// 获取歌曲的排行榜
export const getMusicRanking = (id) => {
  return MusicRequestInstance.get({
    url: "/playlist/detail",
    data: { id },
  });
};
