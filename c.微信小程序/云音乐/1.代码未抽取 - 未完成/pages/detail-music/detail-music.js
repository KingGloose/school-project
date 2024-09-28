import { useMusicStore, usePlayerStore } from "../../store/index";
import { getMusicRanking } from "../../services/models/music";

Page({
  data: {
    musicList: [],
    type: "",
  },
  onLoad(options) {
    const { type, value } = options;

    if (type === "ranking") {
      useMusicStore.onState(value, (value) => {
        this.setData({ musicList: value, type });
      });
    } else if (type === "recommend") {
      useMusicStore.onState("recommendList", (value) => {
        this.setData({ musicList: value, type });
      });
    } else if (type === "menu") {
      getMusicRanking(value).then((res) => {
        this.setData({ musicList: res.data.playlist, type });
      });
    }

    // 设置标题
    wx.setNavigationBarTitle({
      title: this.data.musicList.name || "YunMusicApp",
    });
  },
  // 点击歌曲
  musicItemClickEvent(event) {
    const id = event.detail;
    const index = event.currentTarget.dataset.index;

    usePlayerStore.setState("playMusicList", this.data.musicList.tracks);
    usePlayerStore.setState("playMusicIndex", index);

    wx.navigateTo({ url: `/pages/music-play/music-play?id=${id}` });
  },
});
