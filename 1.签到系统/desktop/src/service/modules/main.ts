import RequestService from "@/service/index";

// 用户登录
export const userLogin = (info: any) => {
  return RequestService.post({
    url: "/api/login",
    data: info
  });
};

// 用户签到
export const userSign = (sign_code: string, mac: string) => {
  return RequestService.post({
    url: "/api/sign",
    data: { sign_code, mac }
  });
};

// 查看历史数据
export const userHistory = (user_id: string) => {
  return RequestService.get({
    url: "/api/query-sign",
    params: { user_id }
  });
};
