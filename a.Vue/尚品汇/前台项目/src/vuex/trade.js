//统一APi
import { reqUserAddress, reqOrderInfo } from "../api/index";

const actions = {
  async GetUserAddress(context) {
    let result = (await reqUserAddress()).data;
    if (result.code == 200) {
      context.commit("MuUserAddress", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("false"));
    }
  },

  async GetOrderInfo(context) {
    let result = (await reqOrderInfo()).data;
    if (result.code == 200) {
       console.log(result)
      context.commit("MuOrderInfo", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("false"));
    }
  },
};

const mutations = {
  MuUserAddress(state, value) {
    state.UserAddress = value;
  },
  MuOrderInfo(state, value) {
    state.OrderInfo = value;
  },
};

const state = {
  UserAddress: [],
  OrderInfo: [],
};

export default {
  actions: actions,
  mutations: mutations,
  state: state,
};
