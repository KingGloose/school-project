<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isMenuFold">后台管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :collapse="isMenuFold"
        :default-active="defaultActiveId"
        class="el-menu-vertical-demo"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in menuInfo" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="citem in item.children" :key="citem.id">
              <el-menu-item :index="citem.id + ''" @click="handleMenuRouter(citem)">{{ citem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import useLoginStore from "@/store/modules/login/login";
import { mapPathToMenu } from "@/utils/map-menu";
import { computed } from "vue";
import { useRoute } from "vue-router";

const loginStore = useLoginStore();
const menuInfo: any[] = loginStore.menuInfo;

const props = defineProps({
  isMenuFold: {
    type: Boolean,
    default: false
  }
});

const handleMenuRouter = (citem: any) => {
  router.push(citem.url);
};

const route = useRoute();
const defaultActiveId = computed(() => mapPathToMenu(route.path, menuInfo) + "");
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
