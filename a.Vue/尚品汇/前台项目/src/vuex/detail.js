//引入统一接口
import { reqDetialList, reqAddOrUpdateShopCart } from "../api/index.js";
//引入utils
import { GetUuid } from "../utils/GetUuid.js";

//创建actions,用于收录存储业务逻辑的函数
const actions = {
  // 商品详情页数据
  async GetDetialList(context, value) {
    let result = (await reqDetialList(value)).data;
    if (result.code == 200) {
      context.commit("MuGetDetialList", result.data);
    }
  },

  //商品购物车数据
  async GetShopCart(context, { skuId, skuNum }) {
    let result = (await reqAddOrUpdateShopCart(skuId, skuNum)).data;
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};

//创建mutasions,用于函数的调用
const mutations = {
  MuGetDetialList(state, value) {
    state.DetialListState = value;
  },
};

//创建state，用于存储数据
const state = {
  DetialListState: {},
  uuid_token: GetUuid(),
};

//创建getter，用于简化数据
const getters = {
  categoryView(state) {
    return state.DetialListState.categoryView || {};
  },
  skuInfo(state) {
    return state.DetialListState.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.DetialListState.spuSaleAttrList || [];
  },
};

export default {
  actions: actions,
  mutations: mutations,
  state: state,
  getters: getters,
};
