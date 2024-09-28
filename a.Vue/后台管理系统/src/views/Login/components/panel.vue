<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="actionTabName">
        <el-tab-pane name="account">
          <template #label>
            <span class="label">
              <el-icon><UserFilled /></el-icon>
              <span>帐户登录</span>
            </span>
          </template>
          <panelAccount ref="accountPanel"></panelAccount>
        </el-tab-pane>

        <el-tab-pane name="phone">
          <template #label>
            <span class="label">
              <el-icon><Cellphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <panelPhone></panelPhone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login">
      <el-button class="login-btn" type="primary" @click="loginAction">立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import panelAccount from "./panel-account.vue";
import panelPhone from "./panel-phone.vue";
import { ref } from "vue";
import { localCache } from "@/utils/cache";
import { LOGIN_REMEMBER } from "@/utils/constants";

const isRememberPwd = ref<boolean>(localCache.getCache(LOGIN_REMEMBER) ?? false);
const actionTabName = ref("account");
const accountPanel = ref<InstanceType<typeof panelAccount>>();

const loginAction = () => {
  if (actionTabName.value === "account") {
    accountPanel.value?.accountLoginAction(isRememberPwd.value);
  } else {
    console.log("手机号登录");
  }
};
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
