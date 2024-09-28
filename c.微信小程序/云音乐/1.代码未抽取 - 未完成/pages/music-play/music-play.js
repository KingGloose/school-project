import { throttle } from "underscore";
import { getMusicDetail, getMusicLyric } from "../../services/models/player";
import { parseLyric } from "../../utils/parseLyric";
import { usePlayerStore } from "../../store/index";

const app = getApp();
const audioContext = wx.createInnerAudioContext();

Page({
  data: {
    currentIndex: 0, // 顶部状态栏设置
    contentHeight: app.globalData.contentHeight,
    navbarBottomPadding: app.globalData.navbarBottomPadding,
    navbarTopPadding: app.globalData.navbarTopPadding,

    // 歌曲信息
    detail: {},
    lyric: {},

    // 播放记录
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isChangingSlider: false,
    isWait: false,
    currentLyricText: "",
    currentLyricIndex: 0,
    lyricPreTime: 450, // 歌词有延迟，该变量设置歌词提前得时间
    lyricScrollTop: 0,
    isFristShowPlay: true, // 该变量控制手机端autoplay问题
    isFristEntre: true, // 是否是首次进入页面
    playModeIndex: 0, // 播放模式 0:顺序播放 1:单曲循环 2:随机播放

    // 播放列表
    playMusicList: [],
    playMusicIndex: 0,
  },
  onLoad(options) {
    // 进入页面播放音乐
    const { id } = options;
    this.setupMusicHandler(id);

    // 数据监听
    usePlayerStore.onStates(["playMusicList", "playMusicIndex"], (value) => {
      const { playMusicList, playMusicIndex } = value;
      if (playMusicIndex >= 0) this.setData({ playMusicIndex });
      if (playMusicList) this.setData({ playMusicList });
    });
  },
  // 歌曲播放核心逻辑
  setupMusicHandler(id) {
    this.data.isFristShowPlay = true;

    // 获取歌曲详情
    getMusicDetail(id).then((res) => {
      this.setData({
        detail: res.data.songs[0],
        durationTime: res.data.songs[0].dt,
      });
    });

    // 获取歌曲歌词
    getMusicLyric(id).then((res) => {
      const lyric = parseLyric(res.data.lrc.lyric);
      this.setData({ lyric });
    });

    // 播放歌曲
    audioContext.stop(); // 播放之前先停止之前的音乐
    const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    audioContext.src = url;
    audioContext.autoplay = true;

    const setSliderValueHandlerThrottle = throttle(
      this.setSliderValueHandler,
      500,
      { leading: false, trailing: false }
    );

    // audioContext监听
    if (this.data.isFristEntre) {
      this.data.isFristEntre = false;

      audioContext.onTimeUpdate(() => {
        // 1、更新歌曲进度
        if (!this.data.isChangingSlider && !this.data.isWait)
          setSliderValueHandlerThrottle();

        // 2、匹配歌词
        this.setCurrentLyric();

        // 3、更新歌词滚动
        this.setLyricScrollHandler();
      });

      audioContext.onWaiting(() => {
        if (this.data.isFristShowPlay) return;
        audioContext.pause();
      });

      audioContext.onCanplay(() => {
        audioContext.play();
      });

      audioContext.onEnded(() => {
        if (audioContext.loop) {
          this.setData({ isFristShowPlay: true });
          return;
        }
        this.playNextEvent();
      });
    }
  },
  // 更新滚动条
  setSliderValueHandler() {
    this.setData({ currentTime: audioContext.currentTime * 1000 });
    const sliderValue = (this.data.currentTime / this.data.durationTime) * 100;
    this.setData({ sliderValue });
  },
  // 获取当前歌词
  setCurrentLyric() {
    if (!this.data.lyric.length) return;
    const { lyric, currentTime } = this.data;
    let index = lyric.length - 1;

    for (let i = 0; i <= lyric.length; i++) {
      if (currentTime < lyric[i].time - this.data.lyricPreTime) {
        index = i - 1;
        break;
      }
    }

    if (this.data.currentLyricIndex === index) return;
    this.setData({
      currentLyricText: lyric[index]?.text,
      currentLyricIndex: index,
    });
  },
  // 更新歌词滚动
  setLyricScrollHandler() {
    this.setData({ lyricScrollTop: this.data.currentLyricIndex * 40 });
  },

  // =========================== 组件事件传递 ===========================
  // 组件 - 滚动条事件监听
  changeSliderEvent(event) {
    this.data.isFristShowPlay = false;

    this.data.isWait = true;
    setTimeout(() => {
      this.data.isWait = false;
    }, 1000);

    const value = event.detail;
    const currentTime = (value / 100) * this.data.durationTime;

    audioContext.seek(currentTime / 1000);

    this.setData({ currentTime, isChangingSlider: false });
  },
  // 组件 - 滚动条持续滚动监听
  changingSliderEventThrottle: throttle(function (event) {
    this.data.isFristShowPlay = false;

    const value = event.detail;
    const currentTime = (value / 100) * this.data.durationTime;

    this.setData({ currentTime });
    this.data.isChangingSlider = true; // 表示正在滚动进度条
  }, 100),
  // 组件 - 暂停按钮
  playBtnEvent(event) {
    event.detail ? audioContext.play() : audioContext.pause();
  },
  // 组件 - 上一首
  playPrevEvent(event) {
    this.changeMusicIndexHandler(false);
  },
  // 组件 - 下一首
  playNextEvent(event) {
    this.changeMusicIndexHandler(true);
  },
  // 抽取 - 上一首/下一首 逻辑抽取
  changeMusicIndexHandler(isNext = true) {
    const length = this.data.playMusicList.length;
    let index = this.data.playMusicIndex * 1;
    const modeIndex = this.data.playModeIndex;
    const getRandomIndex = () => Math.floor(Math.random() * length);

    switch (modeIndex) {
      case 1:
      case 0:
        index = isNext ? index + 1 : index - 1;
        if (index === length) index = 0;
        else if (index === -1) index = length - 1;
        break;
      case 2:
        const rindex = getRandomIndex();
        index = rindex === this.data.playMusicIndex ? getRandomIndex() : rindex;
        break;
    }

    // 初始化数据
    this.setData({
      playMusicIndex: index,
      detail: {},
      lyric: [],
      currentLyricIndex: 0,
      currentTime: 0,
      durationTime: 0,
      sliderValue: 0,
      currentLyricText: "",
      isFristShowPlay: true,
    });
    usePlayerStore.setState("playMusicIndex", index);

    this.setupMusicHandler(this.data.playMusicList[index].id);
  },
  // 组件 - 模式切换
  playModeEvent(event) {
    this.setData({ playModeIndex: event.detail });

    audioContext.loop = this.data.playModeIndex === 1 ? true : false; // 判断是否是单曲循环
  },

  // =========================== 全局组件事件传递 ===========================
  // 组件 - 顶部状态栏切换
  barchangeHandler(event) {
    this.setData({ currentIndex: event.detail.current });
  },
  // 组件 - 顶部状态栏点击切换
  barChangeClick(event) {
    this.setData({ currentIndex: event.currentTarget.dataset.index });
  },
});
