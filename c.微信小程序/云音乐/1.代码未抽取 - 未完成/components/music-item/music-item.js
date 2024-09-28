// components/music-item/music-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  data: {},
  methods: {
    musicItemClick() {
      this.triggerEvent("musicItemClickEvent", this.properties.itemData.id);
    },
  },
});
