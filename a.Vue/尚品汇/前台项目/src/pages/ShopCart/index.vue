<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(s, index) in ShopCartList" :key="s.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="s.isChecked == 1"
              @change="ChangeChecked(s)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="s.imgUrl" />
            <div class="item-msg">
              {{ s.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ s.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="ChangeSkuNum('Min', -1, s)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="s.skuNum"
              minnum="1"
              class="itxt"
              @change="ChangeSkuNum('Change', $event.target.value, s)"
            />
            <a class="plus" @click="ChangeSkuNum('Add', 1, s)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ s.skuNum * s.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="DelShopCart(s)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @click="ChangeAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="DelSelectShopCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ TotalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/Trade"
            >结算</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  computed: {
    ...mapGetters(["ShopCartListGetters"]),
    ShopCartList() {
      return this.ShopCartListGetters.cartInfoList || [];
    },
    TotalPrice() {
      let sum = 0;
      this.ShopCartList.forEach((el) => {
        if (el.isChecked == 1) {
          sum += el.skuNum * el.cartPrice;
        }
      });
      return sum;
    },
    isAllChecked() {
      return this.ShopCartList.every((el) => el.isChecked == 1);
    },
  },
  mounted() {
    this.DispatchShopCartList();
  },
  methods: {
    // 发送请求
    DispatchShopCartList() {
      this.$store.dispatch("GetShopCartList");
    },
    // 单个商品得勾选状态
    async ChangeChecked(s) {
      try {
        s.isChecked = s.isChecked == 1 ? 0 : 1;
        await this.$store.dispatch("GetShopListTap", {
          skuID: s.skuId,
          isChecked: s.isChecked,
        });
        this.$store.dispatch("GetShopCartList");
      } catch (error) {
        alert(error);
      }
    },
    // 已经选择得商品得勾选状态
    async ChangeAllChecked() {
      try {
        let num = this.isAllChecked ? 0 : 1;
        this.ShopCartList.forEach((el) => {
          el.isChecked = num;
        });
        await this.$store.dispatch("GetChangeAllChecked");
      } catch (error) {
        alert(error);
      }
    },
    // 商品数量
    ChangeSkuNum: throttle(async function (type, num, s) {
      if (type == "Change") {
        num = isNaN(num * 1) || num < 0 ? 0 : parseInt(num) - s.skuNum;
      }
      if (type == "Min") {
        num = s.skuNum > 1 ? -1 : 0;
      }

      try {
        this.$store.dispatch("GetShopCart", {
          skuId: s.skuId,
          skuNum: num,
        });

        setTimeout(() => {
          this.DispatchShopCartList();
        }, 500);
      } catch (error) {
        alert(error);
      }
    }, 1000),
    // 删除商品
    async DelShopCart(s) {
      try {
        await this.$store.dispatch("GetDelShopList", s.skuId);
        this.DispatchShopCartList();
      } catch (error) {
        console.log(error);
      }
    },
    // 删除选中得商品
    async DelSelectShopCart() {
      try {
        await this.$store.dispatch("GetSelectDelShopList");
        this.DispatchShopCartList();
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>