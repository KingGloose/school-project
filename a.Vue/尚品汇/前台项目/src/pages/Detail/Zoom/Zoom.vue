<template>
  <div class="spec-preview">
    <img :src="CurrentImg || skuDefaultImg" />
    <div class="event" @mousemove="MoveInBigImg" ref="EventDiv"></div>
    <div class="big">
      <img :src="CurrentImg || skuDefaultImg" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuDefaultImg"],
  data() {
    return {
      CurrentImg: "",
    };
  },
  mounted() {
    this.$bus.$on("BusSendImgUrl", (img) => {
      this.CurrentImg = img;
    });
  },
  methods: {
    MoveInBigImg(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let EventDiv = this.$refs.EventDiv;

      let MaskLeft = event.offsetX - mask.offsetWidth / 2;
      let MaskTop = event.offsetY - mask.offsetHeight / 2;

      if (MaskLeft <= 0) MaskLeft = 0;
      if (MaskLeft >= EventDiv.offsetWidth - mask.offsetWidth)
        MaskLeft = EventDiv.offsetWidth - mask.offsetWidth;

      if (MaskTop <= 0) MaskTop = 0;
      if (MaskTop >= EventDiv.offsetHeight - mask.offsetHeight)
        MaskTop = EventDiv.offsetHeight - mask.offsetHeight;

      mask.style.top = MaskTop + "px";
      mask.style.left = MaskLeft + "px";

      big.style.left = -2 * MaskLeft + "px";
      big.style.top = -2 * MaskTop + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>