import { MusicRequestInstance } from "../index";

// 获取歌曲详细信息
export const getMusicDetail = (id) => {
  return MusicRequestInstance.get({
    url: "/song/detail",
    data: { ids: id },
  });
};

// 获取歌曲歌词
export const getMusicLyric = (id) => {
  return MusicRequestInstance.get({
    url: "/lyric",
    data: { id },
  });
};
