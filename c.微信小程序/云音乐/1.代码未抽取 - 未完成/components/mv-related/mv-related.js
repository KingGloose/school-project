// components/video-related/video-related.js
Component({
  properties: {
    RelatedItem: {
      type: Object,
      value: {},
    },
  },
  data: {},
  methods: {
    getItemIdTap() {
      console.log(this.data.RelatedItem.vid);
    },
  },
});
