//引入RewriteAxios
import RewriteAxios from "./RewriteAxios";
//引入MockAxios
import MockAxios from "./MockAxios";

//API接口的统一管理
//请求地址：/api/product/getBaseCategoryList 请求方式：get
//使用名为RewriteAxios的axios来发送请求

//请求三级联动列表
export const reqCategoryList = () =>
  RewriteAxios({
    url: "/product/getBaseCategoryList",
    method: "get",
  });

//请求主页轮播图
export const reqBannerList = () =>
  MockAxios({
    url: "/banner",
    method: "get",
  });

//请求底部轮播图
//可以简写哦！
export const reqFloorList = () => MockAxios.get("/floors");

//搜索模块数据
export const reqSearchList = (params) =>
  RewriteAxios({
    url: "/list",
    method: "post",
    data: params,
  });

//详情页数据
export const reqDetialList = (skuId) =>
  RewriteAxios({
    url: `/item/${skuId}`,
    method: "get",
  });

//添加购物车成功数据
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  RewriteAxios({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });

//购物车数据
export const reqShopCart = () =>
  RewriteAxios({
    url: "/cart/cartList",
    method: "GET",
  });

//删除购物车数据
export const reqDelShopCart = (skuId) =>
  RewriteAxios({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });

//切换购物车数据得isChecked
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqShopCartTap = (skuID, isChecked) =>
  RewriteAxios({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "GET",
  });

//获取验证码
// /api/user/passport/sendCode/{phone}
export const reqPhoneVer = (phone) =>
  RewriteAxios({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });

//用户注册
// /api/user/passport/register
export const reqRegisterUser = (params) =>
  RewriteAxios({
    url: "/user/passport/register",
    method: "post",
    data: params,
  });

//登录接口
// /api/user/passport/login
export const reqLoginUser = (params) =>
  RewriteAxios({
    url: "/user/passport/login",
    method: "post",
    data: params,
  });

//用户登录成功之后验证信息
// /api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () =>
  RewriteAxios({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });

// 推出登录
// /api/user/passport/logout
export const reqExitUserInfo = () =>
  RewriteAxios({
    url: "/user/passport/logout",
    method: "get",
  });

//获取用户得地址信息
export const reqUserAddress = () =>
  RewriteAxios({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });

//获取商品列表
export const reqOrderInfo = () =>
  RewriteAxios({
    url: "/order/auth/trade",
    method: "get",
  });

//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubOrder = (tradeNo, params) =>
  RewriteAxios({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: params,
  });

//获取订单支付信息
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) =>
  RewriteAxios({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });

//获取支付得状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) =>
  RewriteAxios({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });

//获取订单信息
// /api/order/auth/{page}/{limit}
export const reqOrderInfoAll = (page, limit) =>
  RewriteAxios({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
