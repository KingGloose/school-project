import {
  getMvVideoById,
  getMvInfoById,
  getMvRelatedById,
} from "../../services/models/video";

Page({
  data: {
    id: 0,
    videoUrl: "",
    videoInfo: {},
    videoRelated: [],
    danmuList: [
      {
        text: "第 1s 出现的弹幕",
        color: "#ff0000",
        time: 1,
      },
      {
        text: "第 3s 出现的弹幕",
        color: "#ff00ff",
        time: 3,
      },
    ],
  },
  onLoad(options) {
    this.setData({ id: options.id });

    this.getMvVideoByIdHandler();
    this.getMvInfoByIdHandler();
    this.getMvRelatedByIdHandler();
  },
  // 请求MV视频
  async getMvVideoByIdHandler() {
    const result = await getMvVideoById(this.data.id);
    this.setData({ videoUrl: result.data.data.url });
  },
  // 请求MV信息
  async getMvInfoByIdHandler() {
    const result = await getMvInfoById(this.data.id);
    this.setData({ videoInfo: result.data.data });
  },
  // 请求MV相关视频
  async getMvRelatedByIdHandler() {
    const result = await getMvRelatedById(this.data.id);
    this.setData({ videoRelated: result.data.data });
  },
});
