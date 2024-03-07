import { localCache } from "@/utils/cache";
import encapsulationAxios from "./request/request";
import { BASE_URL, TIMEOUT } from "./config/config";

const RequestService = new encapsulationAxios({
  baseURL: "/",
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn(config) {
      const token = localCache.getCache("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 设置局域网服务器
      const ip = localCache.getCache("ip");
      if (ip) {
        config.url = ip + config.url;
      }

      return config;
    },
    responseSuccessFn(res) {
      return res;
    }
  }
});

export default RequestService;
