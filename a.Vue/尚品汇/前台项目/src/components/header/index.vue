<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span v-if="!UserInfo">
              <span>请</span>
              <router-link to="/ShopLogin">登录</router-link>
              <router-link to="/ShopRegister" class="register"
                >免费注册</router-link
              >
            </span>
            <span v-if="UserInfo">
              <span>{{ UserInfo.name }} | </span>
              <span @click="ExitUserInfo">退出登录</span>
            </span>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/Trade">我的订单</router-link>
          <router-link to="/ShopCart">我的购物车</router-link>
          <router-link to="/center">我的尚品汇</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/ShopHome" class="logo">
          <img src="./logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="PushAndGet"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopHead",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapState({
      UserInfo: (state) => {
        return state.user.UserInfo;
      },
    }),
  },
  methods: {
    //进行路由跳转
    PushAndGet() {
      if (this.$route.query) {
        let loction = {
          name: "ShopSearch",
          params: { keyword: this.keyword || undefined },
        };
        loction.query = this.$route.query;
        this.$router.push(loction);
      }
    },
    // 用户推出登录
    async ExitUserInfo() {
      try {
        await this.$store.dispatch("GetExitUserInfo");
        this.$router.push("/ShopHome")
      } catch (error) {
        alert(error);
      }
    },
  },
  mounted() {
    //用于删除面包屑时，input框关键字赋值为空
    this.$bus.$on("SearchInpEmpty", () => {
      this.keyword = "";
    });
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
