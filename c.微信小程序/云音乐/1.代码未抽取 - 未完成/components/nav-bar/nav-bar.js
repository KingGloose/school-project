const app = getApp();

Component({
  options: {
    multipleSlots: true,
  },
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    navbarHeight: app.globalData.navbarHeight,
  },
  methods: {
    navBarClickHandler() {
      wx.navigateBack();
    },
  },
  lifetimes: {
    // attached() {
    //   this.setData({
    //     statusBarHeight: app.globalData.statusBarHeight,
    //   });
    // },
  },
});
