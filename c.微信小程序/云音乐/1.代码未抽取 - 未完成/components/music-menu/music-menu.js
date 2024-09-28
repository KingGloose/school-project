Component({
  properties: {
    title: {
      type: String,
      value: "",
    },
    itemData: {
      type: Array,
      value: [],
    },
  },
  data: {
    screenWidth: getApp().globalData.screenWidth,
  },
  methods: {
    menuMoreClickEvent() {
      this.triggerEvent("menuMoreClickEvent");
    },
  },
});
