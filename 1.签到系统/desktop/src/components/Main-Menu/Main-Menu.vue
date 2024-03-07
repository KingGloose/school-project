<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.jpg" />
      <h2 class="title" v-show="!isMenuFold">后台管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :collapse="isMenuFold"
        default-active="1"
        class="el-menu-vertical-demo"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in menuInfo" :key="item.id">
          <el-menu-item :index="item.id + ''" @click="handleMenuRouter(item.path)">
            <el-icon><component :is="item.icon"></component></el-icon>
            <span class="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

defineProps({
  isMenuFold: {
    type: Boolean,
    default: false
  }
});

const menuInfo = [
  {
    id: 1,
    path: "/main/link",
    name: "连接管理",
    icon: "PieChart"
  },
  {
    id: 2,
    path: "/main/user",
    name: "用户管理",
    icon: "User"
  },
  {
    id: 3,
    path: "/main/order",
    name: "订单管理",
    icon: "Money"
  }
];

const handleMenuRouter = (path: string) => router.push(path);
</script>

<style scoped lang="scss">
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 30px;
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
    user-select: none;
  }
}

.menu {
  .title {
    margin-left: 10px;
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
