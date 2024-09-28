<template>
  <div>
    <!-- 头部-非路由组件 -->
    <ShopHead />

    <router-view ></router-view>

    <!-- 尾部-非路由组件 -->
    <ShopFoot v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import ShopHead from "./components/header/index.vue";
import ShopFoot from "./components/footer/index.vue";

export default {
  name: "App",
  components: { ShopHead, ShopFoot },
  mounted() {
    //因为一开始加载网页的时候最先加载的是App.vue,所以直接请求数据,这样避免了加载组件就重新发送数据的问题，进行了性能的优化
    this.$store.dispatch("GetCategoryList");
  },
};
</script>
