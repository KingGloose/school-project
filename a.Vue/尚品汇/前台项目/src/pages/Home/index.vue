<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <rank />
    <like />
    <floor v-for="(f) in FloorList" :key="f.id" :list="f"/>
    <brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import rank from "./rank/index.vue";
import like from "./like/index.vue";
import floor from "./floor/index.vue";
import brand from "./brand/index.vue";
import { mapState } from "vuex";

export default {
  name: "ShopHome",
  components: { ListContainer, TodayRecommend, rank, like, floor, brand },
  mounted() {
    this.$store.dispatch("GetFloorList");
    this.$store.dispatch("GetUserInfo")
  },
  computed: {
    ...mapState({
      FloorList: (state) => {
        return state.home.FloorListState;
      },
    }),
  },
};
</script>

<style>
</style>