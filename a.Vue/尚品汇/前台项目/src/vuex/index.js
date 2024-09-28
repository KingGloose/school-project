//引入Vue
import Vue from "vue";

//引入Vuex
import Vuex from "vuex";

//使用Vuex
Vue.use(Vuex);

//引入局部的vuex
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});
