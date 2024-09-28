const modeName = ["order", "repeat", "random"];

Component({
  properties: {
    itemData: { type: Object, value: {} }, // 项目数据
    contentHeight: { type: Number, value: 0 }, // 内容高度
    currentTime: { type: Number, value: 0 }, // 当前播放时间
    durationTime: { type: Number, value: 0 }, // 歌曲总时间
    sliderValue: { type: Number, value: 0 }, // 滑条时间
    currentLyricText: { type: String, value: "等待歌词加载~" }, // 当前歌词
  },
  data: {
    isPlaying: true,
    playModeIndex: 0,
    playModeName: "order",
  },
  methods: {
    changeSliderHandler(event) {
      this.triggerEvent("changeSliderEvent", event.detail.value);
    },
    changingSliderHandler(event) {
      this.triggerEvent("changingSliderEvent", event.detail.value);
    },
    playBtnHandler() {
      this.setData({ isPlaying: !this.data.isPlaying });
      this.triggerEvent("playBtnEvent", this.data.isPlaying);
    },
    playPrevHandler() {
      this.triggerEvent("playPrevEvent");
    },
    playNextHandler() {
      this.triggerEvent("playNextEvent");
    },
    playModeHandler() {
      let index = this.data.playModeIndex;
      index = index + 1;
      if (index === 3) index = 0;

      this.setData({
        playModeIndex: index,
        playModeName: modeName[index],
      });

      this.triggerEvent("playModeEvent", this.data.playModeIndex);
    },
  },
});
