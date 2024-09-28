// components/area-header/area-header.js
Component({
  properties: {
    areaHeaderTitle: {
      type: String,
      value: "默认标题",
    },
    hasMore: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    moreClick() {
      this.triggerEvent("moreClickEvent");
    },
  },
});
