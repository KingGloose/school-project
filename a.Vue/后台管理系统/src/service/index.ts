import { LOGIN_TOKEN } from "@/utils/constants";
import { localCache } from "@/utils/cache";
import encapsulationAxios from "./request/request";
import { BASE_URL, TIMEOUT } from "./config/config";

const RequestService = new encapsulationAxios({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn(config) {
      const token = localCache.getCache(LOGIN_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    responseSuccessFn(res) {
      // console.log("局部响应~");
      return res;
    }
  }
});

export default RequestService;
