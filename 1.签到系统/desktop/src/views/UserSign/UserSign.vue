<template>
  <div class="UserSign">
    <div class="signin" @click="signinClick">签到</div>
    <div class="edit" @click="editClick">编辑</div>

    <!-- 历史记录 -->
    <div class="historyDialog">
      <el-dialog class="historyInner" v-model="userDialogVisibleHistory" title="历史记录" width="90%">
        <el-scrollbar>
          <div class="historyBody">
            <!-- 个人信息 -->
            <div class="info">
              <div class="person">
                <div class="left">
                  <div class="avator">
                    <img class="img" src="@/assets/img/ava.jpg" />
                  </div>
                  <div class="text">
                    <div class="name">欢迎 {{ userInfoData.user_name }}</div>
                    <div class="mac">{{ mac_show }}</div>
                  </div>
                </div>

                <div class="right">
                  <div class="data">
                    <div class="text">签到次数</div>
                    <div class="num">{{ historyTotalCom.count }}</div>
                  </div>

                  <div class="data">
                    <div class="text">签到天数</div>
                    <div class="num">{{ historyTotalCom.day }}</div>
                  </div>

                  <div class="data">
                    <div class="text">加入小组</div>
                    <div class="num">{{ historyTotalCom.group }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 历史列表 -->
            <div class="list">
              <el-row>
                <template v-for="item of historyData" :key="item">
                  <el-col :span="8">
                    <div class="card" :class="item.is_mac_error === 1 ? 'success' : 'fail'">
                      <div class="top">{{ item.is_mac_error === 1 ? "签到成功" : "签到异常" }}</div>
                      <div class="bottom">
                        <div class="group">{{ item.group_name }} & {{ item.initiator_name }}</div>
                        <div class="time">{{ formatUTC(item.sign_time) }}</div>
                      </div>
                    </div>
                  </el-col>
                </template>
              </el-row>
            </div>
          </div>
        </el-scrollbar>
      </el-dialog>
    </div>

    <!-- 编辑弹窗 -->
    <div class="editDiolog">
      <el-dialog class="editDiologInner" v-model="userDialogVisibleEdit" title="输入数据" width="30%" align-center>
        <el-form :model="editFormData" ref="editFormRef" label-width="60px">
          <el-form-item label="签到码" prop="code">
            <el-input v-model="editFormData.code" />
          </el-form-item>
          <el-form-item label="IP地址" prop="ip">
            <el-input v-model="editFormData.ip" />
          </el-form-item>
          <!-- <el-form-item label="群组" prop="group">
            <el-select v-model="editFormData.group" placeholder="请选择群组">
              <el-option label="群组1" value="1" />
              <el-option label="群组2" value="2" />
              <el-option label="群组3" value="3" />
              <el-option label="群组4" value="4" />
              <el-option label="群组5" value="5" />
              <el-option label="群组6" value="6" />
            </el-select>
          </el-form-item> -->
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="editConfirmClick"> 确认 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <!-- 登录弹窗 -->
    <div class="loginDialog">
      <el-dialog
        class="loginDialogInner"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        v-model="userDialogVisibleLogin"
        title="登录"
        width="30%"
        align-center
      >
        <el-form :model="loginFormData" ref="loginFormRef" :rules="loginFormRules" label-width="60px">
          <el-form-item label="账户" prop="account">
            <el-input v-model="loginFormData.account" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginFormData.password" />
          </el-form-item>
          <el-form-item label="IP地址" prop="ip">
            <el-input v-model="editFormData.ip" />
          </el-form-item>
          <el-form-item prop="isUser">
            <el-radio-group v-model="loginFormData.isUser">
              <el-radio label="true" size="large">签到者</el-radio>
              <el-radio label="false" size="large">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="loginConfirmClick"> 登录 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import gsap from "gsap";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

import { localCache } from "@/utils/cache";
import { formatUTC } from "@/utils/format";

import useMainStore from "@/store/modules/main";
import { userLogin, userSign } from "@/service/modules/main";

const mainStore = useMainStore();
const { userDialogVisibleHistory, userDialogVisibleEdit, userDialogVisibleLogin, historyData, userInfoData } =
  storeToRefs(mainStore);

// 动画切换
const toggleTheme = (event: MouseEvent) => {
  let isDark: boolean;

  // @ts-ignore
  const transition = document.startViewTransition(() => {
    const root = document.documentElement;
    isDark = root.classList.contains("dark");
    root.classList.remove(isDark ? "dark" : "light");
    root.classList.add(isDark ? "light" : "dark");
  });

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    gsap.fromTo(
      document.documentElement,
      {
        "--view-transition-clip-path": isDark ? clipPath[1] : clipPath[0]
      },
      {
        "--view-transition-clip-path": isDark ? clipPath[0] : clipPath[1]
      }
    );
  });
};

// 计算天数
const countSignsByDay = (data: any) => {
  const dailyCounts: Record<string, any> = {};
  data.forEach((item: any) => {
    const date = new Date(item.sign_time).toISOString().split("T")[0];
    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
  });
  return Object.keys(dailyCounts).length;
};
// 计算群组
const countGroup = (data: any) => {
  const uniqueGroups = new Set();
  data.forEach((item: any) => {
    uniqueGroups.add(item.group_name);
  });
  return uniqueGroups.size;
};
const historyTotalCom = computed(() => {
  const count = historyData.value.length;
  const day = countSignsByDay(historyData.value);
  const group = countGroup(historyData.value);

  return { count, day, group };
});

// 登录
const loginFormData = reactive({
  account: "",
  password: "",
  isUser: "true"
});
const loginFormRules: FormRules = {
  account: [{ required: true, message: "必须输入帐号信息~", trigger: "blur" }],
  password: [{ required: true, message: "必须输入密码信息~", trigger: "blur" }]
};
const checkLogin = () => {
  const token = localCache.getCache("token");

  if (!token) {
    mainStore.changeDialogVisibleLogin();
  }
};
const loginCancelClick = () => {
  mainStore.changeDialogVisibleLogin();
};
const loginConfirmClick = async () => {
  const { account, password, isUser } = loginFormData;

  localCache.setCache("account", account);
  localCache.setCache("password", password);
  localCache.setCache("ip", editFormData.ip);

  try {
    const data = await userLogin({ account, password, isUser });
    localCache.setCache("token", data.token);
    localCache.setCache("userInfo", data.userInfo);

    mainStore.changeUserInfo(data.userInfo);
    loginCancelClick();

    ElMessage({
      message: "登录成功~",
      type: "success"
    });
  } catch (error) {
    ElMessage({
      message: "登录失败~",
      type: "error"
    });
  }
};

// 签到
const mac_show = ref(""); // 获取电脑mac
const signinClick = async (event: MouseEvent) => {
  const { code } = editFormData;

  toggleTheme(event); // 执行动画

  const mac = await window.DeskMainAPI.getMacV2();
  mac_show.value = mac;

  if (code) {
    const result = await userSign(code, mac);

    if (result.code === "ERR_NETWORK") {
      ElMessage({
        message: "连接不上局域网~",
        type: "error"
      });
    } else {
      if (result.data === "ok") {
        // toggleTheme(event); // 执行动画

        ElMessage({
          message: "签到成功~",
          type: "success"
        });
        return;
      }

      const data = result.response.data;
      if (data.data === "exist~") {
        // toggleTheme(event); // 执行动画

        ElMessage({
          message: "你已经签到了~",
          type: "warning"
        });

        localCache.deleteCache("code");
      } else {
        ElMessage({
          message: "签到失败~",
          type: "error"
        });
      }
    }
  } else {
    ElMessage({
      message: "请填写签到码~",
      type: "error"
    });
  }
};

// 编辑
const editFormRef = ref<FormInstance>();
const editFormData = reactive({
  ip: localCache.getCache("ip") || "",
  code: localCache.getCache("code") || "",
  group: ""
});
const editCancelClick = () => mainStore.changeDialogVisibleEditClose();
const editConfirmClick = () => {
  localCache.setCache("ip", editFormData.ip);
  localCache.setCache("code", editFormData.code);
  editCancelClick();
};
const editClick = () => mainStore.changeDialogVisibleEditOpen();

onMounted(() => {
  checkLogin();
});
</script>

<style scoped lang="scss">
.UserSign {
  @include flexAllColumnCenter();

  width: 100%;
  height: calc(100% - 100px);
  user-select: none;

  .signin {
    width: 120px;
    height: 120px;

    @include flexAllCenter();

    background-color: white;
    border-radius: 50%;

    margin: 0 30px;
    cursor: pointer;
    user-select: none;
    font-weight: 700;

    /* 波动效果 */
    animation: wave 3s linear infinite;
    @keyframes wave {
      0% {
        box-shadow: 0 0 0 0 rgba(245, 226, 226, 1), 0 0 0 0 rgba(250, 189, 189, 1);
      }
      50% {
        box-shadow: 0 0 0 20px rgba(245, 226, 226, 0.5), 0 0 0 10px rgba(250, 189, 189, 1);
      }
      100% {
        box-shadow: 0 0 0 40px rgba(245, 226, 226, 0), 0 0 0 20px rgba(245, 226, 226, 0);
      }
    }

    /* 按下效果 */
    transition: all 200ms ease-in;
    &:active {
      transform: scale(0.8);
    }
  }

  .edit {
    cursor: pointer;
    margin-top: 40px;
    font-size: 14px;
    transition: all 300ms;
    color: #3b3a39;
  }

  .edit:hover {
    text-decoration: underline;
    transform: scale(1.2);
    color: #2b88d8;
  }

  /* 编辑对话框 */
  .editDiolog {
    .dialog-footer {
      @include flexAllCenter();

      button {
        margin: 0 20px;
      }
    }
  }

  /* 登录对话框 */
  .loginDialog {
    .dialog-footer {
      @include flexAllCenter();

      button {
        margin: 0 20px;
      }
    }
  }

  /* 历史对话框 */
  .historyDialog {
    .historyBody {
      .info {
        .person {
          display: flex;
          justify-content: space-between;

          height: 140px;
          background-color: white;
          border-radius: 10px;
          margin: 5px;

          .left {
            display: flex;
            align-items: center;
            margin-left: 20px;

            .avator {
              .img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                transition: all 200ms;
              }
              .img:hover {
                transform: scale(1.05);
              }
            }

            .text {
              margin-left: 20px;
              .name {
                font-size: 25px;
                font-weight: 700;
                margin-bottom: 10px;
              }

              .mac {
                font-size: 12px;
              }
            }
          }

          .right {
            @include flexAllCenter();

            margin-right: 20px;

            .data {
              @include flexAllColumnCenter();
              height: 140px;

              background-color: white;
              margin: 5px;
              height: 50px;
              padding: 3px 20px;

              border-right: 2px dashed #d2d0ce;

              .text {
                font-size: 14px;
              }

              .num {
                margin-top: 8px;
                font-size: 18px;
                font-weight: 700;
              }
            }

            .data:last-child {
              border: 0px;
            }
          }
        }
      }

      .list {
        .card {
          height: 100px;
          border-radius: 10px;
          background-color: white;
          margin: 10px;
          padding: 20px;

          .top {
            height: 24%;
            font-size: 22px;
            font-weight: 700;
          }

          .bottom {
            height: 76%;
            margin-top: 10px;
            position: relative;

            .group {
              font-size: 15px;
              margin-top: 13px;
            }

            .time {
              position: absolute;
              right: 10px;
              bottom: 10px;

              font-size: 12px;
            }
          }

          &.success {
            .top {
              color: #80a492;
            }
          }

          &.fail {
            .top {
              color: #ba5140;
            }
          }
        }
      }
    }

    :deep(.el-overlay-dialog) {
      overflow: hidden;
    }

    :deep(.el-dialog) {
      background-color: #f3f2f1;
      margin-top: 7.5vh !important;
    }

    :deep(.el-dialog__body) {
      height: 70vh !important;
      padding: 15px 10px !important;
    }

    :deep(.el-dialog__header) {
      height: 20px !important;
      padding: 10px !important;
    }

    :deep(.el-dialog__headerbtn) {
      top: 0;
      width: 40px;
      height: 40px;
    }

    :deep(.el-scrollbar__bar.is-horizontal) {
      display: none;
    }
  }
}
</style>
