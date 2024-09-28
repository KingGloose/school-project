<template>
  <div class="Swiper">
    <van-swipe class="list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) of swiperData">
        <van-swipe-item class="item">
          <img :src="item.url" :key="index" />
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">
          <template v-for="(value, key, index) in swiperGroup">
            <span :class="{ active: swiperData[active]?.enumPictureCategory == key, }" >
              <span class="item">{{ swiperFont(value[0].title) }} </span>
              <span class="text" v-if="swiperData[active]?.enumPictureCategory == key" >
                {{ getSwiperGroup(swiperData[active]) }} / {{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swiperData: {
    type: Array,
    default: () => [],
  },
});

// 分类轮播图数据
let swiperGroup = {};
for (const item of props.swiperData) {
  let valueData = swiperGroup[item.enumPictureCategory];
  if (!valueData) {
    valueData = [];
    swiperGroup[item.enumPictureCategory] = valueData;
  }
  swiperGroup[item.enumPictureCategory].push(item);
}

// 处理文字多余字符
const swiperFont = (value) =>
  value.replace("：", "").replace("【", "").replace("】", "");

// 获取当前轮播图当前处于那个组别
const getSwiperGroup = (item) =>
  swiperGroup[item.enumPictureCategory].findIndex((ele) => ele === item) + 1;

</script>

<style scoped>
.Swiper .list .item img {
  width: 100%;
}
.Swiper .list .custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 5px 5px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
}
.Swiper .list .custom-indicator .item {
  margin: 0 5px;
}
.Swiper .list .custom-indicator .active {
  padding: 1px 5px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border-radius: 5px;
}
</style>
