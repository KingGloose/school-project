// app.js
App({
  globalData: {
    // 全局变量
    navbarHeight: 44, // 自定义导航栏高度
    navbarTopPadding: "20", // 播放页padding控制
    navbarBottomPadding: "20",

    screenWidth: 375,
    screenHeight: 667,
    statusBarHeight: 20,
    contentHeight: 500,
  },
  onLaunch() {
    // 获取手机信息
    wx.getSystemInfo({
      success: (info) => {
        this.globalData.screenHeight = info.screenHeight;
        this.globalData.screenWidth = info.screenWidth;
        this.globalData.statusBarHeight = info.statusBarHeight;
        this.globalData.contentHeight =
          info.screenHeight -
          info.statusBarHeight -
          this.globalData.navbarHeight;
      },
    });
  },
});
