<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="LeaveShow">
      <!-- 商品分类 -->
      <h2 class="all" @mouseenter="EnterShow">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition>
        <div class="sort" v-show="isTrue">
          <div class="all-sort-list2" @click="GoSearch">
            <!-- 一级菜单 -->
            <div
              class="item"
              v-for="(c1, index) in CategoryList"
              :key="c1.categoryId"
              @mouseenter="MoveChangeColor(index)"
              @mouseleave="ChangeMoveColorFlag = -1"
              :class="ChangeMoveColorFlag == index ? 'itemMoveColor' : ''"
            >
              <h3>
                <a
                  :data-CategoryName="c1.categoryName"
                  :data-CategoryId1="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <!-- 二级菜单 -->
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-CategoryName="c2.categoryName"
                        :data-CategoryId2="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级菜单 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-CategoryName="c3.categoryName"
                          :data-CategoryId3="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

//引入lodash，设置防抖
import throttle from "lodash//throttle.js";

export default {
  name: "TypeNav",
  data() {
    return {
      ChangeMoveColorFlag: -1,
      isTrue: false,
    };
  },
  computed: {
    ...mapState({
      CategoryList: (state) => {
        return state.home.CategoryListState;
      },
    }),
  },
  mounted() {
    //调用三级联动的API，并存储数据
    this.$store.dispatch("GetCategoryList");
    //搜索框的三级联动的显示和隐藏
    if (this.$route.name == "ShopHome") {
      this.isTrue = true;
    }
  },
  methods: {
    //引入lodash里面的throttle方法来实现三级联动的节流
    MoveChangeColor: throttle(function (index) {
      this.ChangeMoveColorFlag = index;
    }, 50),
    //进行路由的跳转
    GoSearch(event) {
      let result = event.target;
      //通过解构赋值获取来获取相应的值
      //event.target有一个API可以获取标签上面的自定义属性
      let { categoryname, categoryid1, categoryid2, categoryid3 } =
        result.dataset;
      //我们可以将数据拆除出来，这样的话可以简化代码
      let location = { name: "ShopSearch" };
      let query = { categoryname: categoryname };

      if (categoryname) {
        if (categoryid1) {
          query.categoryid1 = categoryid1;
        } else if (categoryid2) {
          query.categoryid2 = categoryid2;
        } else if (categoryid3) {
          query.categoryid3 = categoryid3;
        }
        
        location.params = this.$route.params;
        location.query = query;
        this.$router.push(location);
      }
    },
    EnterShow() {
      this.isTrue = true;
    },
    LeaveShow() {
      if(this.$route.name != "ShopHome"){
        this.isTrue = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .itemMoveColor {
          background-color: skyblue;
        }
      }
    }

    /* 进入的起点，离开的终点 */
    .v-enter,
    .v-leave-to {
      height: 0px;
    }
    /* 动画的过程 */
    .v-enter-active {
      transition: 0.4s linear;
    }
    .v-leave-active {
      transition: 0.17s linear;
    }
    /* 进入的终点，离开的起点 */
    .v-enter-to,
    .v-leave {
      height: 461px;
    }
  }
}
</style>