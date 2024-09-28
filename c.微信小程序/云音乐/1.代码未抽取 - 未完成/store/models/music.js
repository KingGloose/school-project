import { HYEventStore } from "hy-event-store";
import {
  getRecommendMusicList,
  getPlayMenuList,
  getMusicRanking,
} from "../../services/models/music";

export const MusicRanking = {
  newMusic: 3779629, // 新歌
  oriMusic: 2884035, // 原创
  topMusic: 19723756, // 飙升
};

const useMusicStore = new HYEventStore({
  state: {
    recommendList: [], // 推荐歌曲

    topPlayList: [], // 推荐歌单
    recPlayList: [], // 热门歌单

    newMusic: {}, // 新歌排行榜
    oriMusic: {}, // 原创排行榜
    topMusic: {}, // 飙升排行榜
  },
  actions: {
    // 获取推荐歌曲
    fetchRecommendListAction(context) {
      getRecommendMusicList().then((res) => {
        context.recommendList = res.data.playlist;
      });
    },
    // 获取推荐歌单
    fetchTopPlayList(context) {
      getPlayMenuList().then((res) => {
        context.topPlayList = res.data.playlists;
      });
      getPlayMenuList("华语").then((res) => {
        context.recPlayList = res.data.playlists;
      });
    },
    // 获取巅峰榜
    fetchMusicRankingAction(context) {
      for (const item in MusicRanking) {
        getMusicRanking(MusicRanking[item]).then((res) => {
          context[item] = res.data.playlist;
        });
      }
    },
  },
});

useMusicStore.dispatch("fetchMusicRankingAction");

export default useMusicStore;
