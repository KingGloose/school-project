Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  data: {},
  methods: {
    menuItemClick() {
      wx.navigateTo({
        url: `/pages/detail-music/detail-music?type=menu&value=${this.data.itemData.id}`,
      });
    },
  },
});
