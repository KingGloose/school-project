import { throttle } from "underscore";

import { getMusicBanner } from "../../services/models/music";
import { querySelectorElement } from "../../utils/querySelector";

import { useMusicStore, usePlayerStore } from "../../store/index";
import { MusicRanking } from "../../store/models/music";

const querySelectorElementThrottle = throttle(querySelectorElement, 150);
const app = getApp();

Page({
  data: {
    searchValue: "", // 搜索框

    bannerHeight: 0, // 初始banner的高度
    bannersList: [], // 轮播图数据

    recommendShow: [], // 首页热门歌曲数据

    screenWidth: app.globalData.screenWidth, // 手机屏幕宽度
    topPlayList: [], // 推荐歌单数据
    recPlayList: [], // 热门歌单数据

    musicRankList: {},
  },
  onLoad() {
    this.getMusicBanner();

    // 获取歌曲数据
    useMusicStore.onState("recommendList", (value) => {
      if (value.length !== 0)
        this.setData({ recommendShow: value.tracks.slice(0, 6) });
    });
    useMusicStore.dispatch("fetchRecommendListAction");

    // 获取推荐歌单数据
    useMusicStore.onState("topPlayList", (value) => {
      this.setData({ topPlayList: value });
    });
    useMusicStore.onState("recPlayList", (value) => {
      this.setData({ recPlayList: value });
    });
    useMusicStore.dispatch("fetchTopPlayList");

    // 获取巅峰榜数据
    useMusicStore.onState("newMusic", this.handleMusicRanking);
    useMusicStore.onState("oriMusic", this.handleMusicRanking);
    useMusicStore.onState("topMusic", this.handleMusicRanking);
    useMusicStore.dispatch("fetchMusicRankingAction");
  },
  // 处理musicRank中onState的函数
  handleMusicRanking(value) {
    let newMusicRankList = this.data.musicRankList;

    for (const key in MusicRanking) {
      if (value.id === MusicRanking[key]) {
        newMusicRankList[key] = value;
      }
    }

    this.setData({ musicRankList: newMusicRankList });
  },

  // 获取轮播图数据
  async getMusicBanner() {
    const result = await getMusicBanner();
    this.setData({
      bannersList: result.data.banners,
    });
  },

  // 获取image组件的高度
  async onImageLoadFinsh(event) {
    const height = await querySelectorElementThrottle(".image");
    this.setData({ bannerHeight: height });
  },

  // 点击搜索框
  searchClickHandler() {
    wx.navigateTo({
      url: "/pages/detail-search/detail-search",
    });
  },
  // 点击推荐歌曲 - 更多
  musicMoreClickEvent(event) {
    wx.navigateTo({ url: `/pages/detail-music/detail-music?type=recommend` });
  },
  // 点击推荐歌单 - 更多
  menuMoreClickEvent() {
    wx.navigateTo({
      url: "/pages/detail-menu/detail-menu?type=menu",
    });
  },
  // 点击巅峰榜
  rankingClickEvent(event) {
    const itemName = event.detail;

    wx.navigateTo({
      url: `/pages/detail-music/detail-music?type=ranking&value=${itemName}`,
    });
  },
  // 点击歌曲
  musicItemClickEvent(event) {
    const id = event.detail;
    const index = event.currentTarget.dataset.index;

    usePlayerStore.setState("playMusicList", this.data.recommendShow);
    usePlayerStore.setState("playMusicIndex", index);

    wx.navigateTo({ url: `/pages/music-play/music-play?id=${id}` });
  },
});
