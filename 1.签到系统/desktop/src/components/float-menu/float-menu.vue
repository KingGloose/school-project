<template>
  <div class="flaotMenu">
    <div class="icon" @click="historyClick">
      <el-icon><Grid /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import useMainStore from "@/store/modules/main";
import { localCache } from "@/utils/cache";

type Roles = "user" | "initiator";
const role = ref<Roles>("user");

const mainStore = useMainStore();
const historyClick = () => {
  mainStore.changeDialogVisibleHistory();

  const user_id = localCache.getCache("userInfo").user_id;
  mainStore.querySignAction(user_id);
};
</script>

<style scoped lang="scss">
.flaotMenu {
  position: absolute;
  bottom: 40px;
  right: 60px;

  width: 40px;
  height: 40px;

  .icon {
    @include flexAllCenter();

    width: 30px;
    height: 30px;

    background-color: white;
    border-radius: 50%;
    transition: all 200ms;
    cursor: pointer;

    &:active {
      transform: scale(0.8);
    }
  }
}
</style>
