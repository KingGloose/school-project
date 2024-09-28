//引入api接口
import { reqShopCart, reqDelShopCart, reqShopCartTap } from "../api/index";

const actions = {
  async GetShopCartList(context) {
    let result = (await reqShopCart()).data;
    if (result.code == 200) {
      context.commit("MuGetShopCartList", result.data);
    }
  },

  async GetDelShopList(context, skuId) {
    let result = (await reqDelShopCart(skuId)).data;
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  async GetShopListTap(context, { skuID, isChecked }) {
    let result = (await reqShopCartTap(skuID, isChecked)).data;
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  GetSelectDelShopList({ getters, dispatch }) {
    let PromiseAll = [];
    getters.ShopCartListGetters.cartInfoList.forEach((element) => {
      let Promise =
        element.isChecked == 1 && dispatch("GetDelShopList", element.skuId);
      PromiseAll.push(Promise);
    });
    return Promise.all(PromiseAll);
  },

  GetChangeAllChecked({ getters, dispatch }) {
    let PromiseAll = [];
    getters.ShopCartListGetters.cartInfoList.forEach((element) => {
      let Promise = dispatch("GetShopListTap", {
        skuID: element.skuId,
        isChecked: element.isChecked,
      });
      PromiseAll.push(Promise);
    });
    return Promise.all(PromiseAll);
  },
};

const mutations = {
  MuGetShopCartList(state, value) {
    state.ShopCartList = value;
  },
};

const state = {
  ShopCartList: [],
};

const getters = {
  ShopCartListGetters(state) {
    return state.ShopCartList[0] || {};
  },
};

export default {
  actions: actions,
  mutations: mutations,
  state: state,
  getters: getters,
};
