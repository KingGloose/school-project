import { querySelectorElement } from "../../../../utils/querySelector";

Component({
  properties: {
    lyricData: {
      type: Object,
      value: {},
    },
    contentHeight: {
      type: Number,
      value: 0,
    },
    lyricScrollTop: {
      type: Number,
      value: 0,
    },
    currentLyricIndex: {
      type: Number,
      value: 0,
    },
  },
  methods: {
    scrollEvent() {},
  },
  ready() {},
});
