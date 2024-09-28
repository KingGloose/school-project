import {
  reqPhoneVer,
  reqRegisterUser,
  reqLoginUser,
  reqGetUserInfo,
  reqExitUserInfo,
} from "../api/index";

const actions = {
  async GetPhoneVer(context, phone) {
    let result = (await reqPhoneVer(phone)).data;
    if (result.code == 200) {
      context.commit("MuGetPhoneVer", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("Faile"));
    }
  },

  async GetRegisterUser(context, params) {
    let result = (await reqRegisterUser(params)).data;
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async GetLoginUser(context, params) {
    let result = (await reqLoginUser(params)).data;
    if (result.code == 200) {
      context.commit("MuGetLoginUser", result.data.token);
      localStorage.setItem("UserToken", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async GetUserInfo(context) {
    let result = (await reqGetUserInfo()).data;
    if (result.code == 200) {
      context.commit("MuGetUserInfo", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  async GetExitUserInfo(context) {
    let result = (await reqExitUserInfo()).data;
    if (result.code == 200) {
      context.commit("MuGetExitUserInfo");
      return "ok";
    } else {
      return Promise.reject(new Error("false"));
    }
  },
};

const mutations = {
  MuGetPhoneVer(state, value) {
    state.PhoneVer = value;
  },
  MuGetLoginUser(state, value) {
    state.UserToken = value;
  },
  MuGetUserInfo(state, value) {
    state.UserInfo = value;
  },
  MuGetExitUserInfo(state) {
    state.UserToken = "";
    state.UserInfo = "";
    localStorage.removeItem("UserToken");
  },
};

const state = {
  PhoneVer: "",
  UserToken: localStorage.getItem("UserToken"),
  UserInfo: "",
};

export default {
  actions: actions,
  mutations: mutations,
  state: state,
};
