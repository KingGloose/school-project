import { getTopMvList } from "../../services/models/video";

Page({
  data: {
    TopMvList: [],
    offset: 0,
    hasMore: true,
  },
  onLoad(options) {
    this.getTopMvListHandler();
  },
  // 网络请求
  async getTopMvListHandler() {
    const result = await getTopMvList(this.data.offset);

    let newTopMvList = [...this.data.TopMvList, ...result.data.data];

    this.setData({
      TopMvList: newTopMvList,
    });
    this.data.offset = this.data.TopMvList.length;
    this.data.hasMore = result.data.hasMore;
  },
  // 上拉触底监听
  onReachBottom() {
    if (!this.data.hasMore) return;
    this.getTopMvListHandler();
  },
  // 下拉刷新加载
  async onPullDownRefresh() {
    this.setData({
      TopMvList: [],
      offset: 0,
      hasMore: true,
    });

    await this.getTopMvListHandler();

    wx.stopPullDownRefresh();
  },
});
