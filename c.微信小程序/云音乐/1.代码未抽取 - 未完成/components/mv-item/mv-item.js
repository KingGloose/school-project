// components/video-item/video-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  methods: {
    getItemIdTap() {
      const id = this.properties.itemData.id;
      wx.navigateTo({
        url: `/pages/detail-mv/detail-mv?id=${id}`,
      });
    },
  },
});
