<template>
  <div class="panelAccount">
    <el-form label-width="60px" :model="accountInfo" :rules="accountRules" ref="rulesElForm">
      <el-form-item label="账户" prop="account">
        <el-input v-model="accountInfo.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountInfo.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import { reactive, ref } from "vue";

import useLoginStore from "@/store/modules/login/login";
import { localCache } from "@/utils/cache";
import { LOGIN_NAME, LOGIN_PASSWORD, LOGIN_REMEMBER } from "@/utils/constants";

const accountInfo = reactive({
  account: localCache.getCache(LOGIN_NAME) ?? "",
  password: localCache.getCache(LOGIN_PASSWORD) ?? ""
});

const accountRules: FormRules = {
  account: [
    { required: true, message: "必须输入帐号信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{6,20}$/, message: "必须是6~20数字或字母组成~", trigger: "change" }
  ],
  password: [
    { required: true, message: "必须输入密码信息~", trigger: "blur" },
    { pattern: /^[a-z0-9]{3,}$/, message: "必须是3位以上数字或字母组成", trigger: "change" }
  ]
};

const rulesElForm = ref<FormInstance>();
const loginStore = useLoginStore();
const accountLoginAction = (isRememberPwd: boolean) => {
  rulesElForm.value?.validate((valid) => {
    if (valid) {
      const name = accountInfo.account;
      const password = accountInfo.password;

      loginStore.accountLoginAction({ name, password }).then((res) => {
        if (isRememberPwd) {
          localCache.setCache(LOGIN_NAME, name);
          localCache.setCache(LOGIN_PASSWORD, password);
        } else {
          localCache.deleteCache(LOGIN_NAME);
          localCache.deleteCache(LOGIN_PASSWORD);
        }
        localCache.setCache(LOGIN_REMEMBER, isRememberPwd);
      });
    } else {
      ElMessage.error("账户登录失败");
    }
  });
};

defineExpose({
  accountLoginAction
});
</script>

<style scoped></style>
