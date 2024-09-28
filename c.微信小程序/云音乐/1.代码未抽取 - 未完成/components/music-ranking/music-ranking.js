// components/music-ranking/music-ranking.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
    itemName: {
      type: String,
      value: "",
    },
  },
  data: {},
  methods: {
    musicRankingClick() {
      this.triggerEvent("rankingClickEvent", this.properties.itemName);
    },
  },
});
