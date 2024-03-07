<template>
  <div class="header-info">
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" :src="getImage('ava.jpg')" />
          <span class="name">管理员</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitLogin">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { localCache } from "@/utils/cache";
import { getImage } from "@/utils/main";

const handleExitLogin = () => {
  localCache.deleteCache("token");
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.header-info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
  .el-tooltip__trigger {
    outline: none;
  }
}
</style>
