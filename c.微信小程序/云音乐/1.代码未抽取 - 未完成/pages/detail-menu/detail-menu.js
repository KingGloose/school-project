import { getMusicTag, getPlayMenuList } from "../../services/models/music";

Page({
  data: {
    musicMenu: [],
  },
  onLoad(options) {
    this.fetchMusicAllMenu();
  },
  async fetchMusicAllMenu() {
    const result = await getMusicTag();
    let promiseAll = [];

    for (const item of result.data.tags) {
      let promise = getPlayMenuList(item.name);
      promiseAll.push(promise);
    }

    Promise.all(promiseAll).then((res) => {
      let allMenu = [];

      for (const item of res) {
        allMenu.push(item.data);
      }

      this.setData({
        musicMenu: allMenu,
      });
    });
  },
});
