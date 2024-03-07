import axios from "axios";
import type { AxiosInstance } from "axios";
import type { HYRequestConfig } from "./type";

class encapsulationAxios {
  instance: AxiosInstance;

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);

    // 全局请求/响应拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("全局请求");
        return config;
      },
      (err) => {
        // console.log("全局请求");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局响应");
        return res.data;
      },
      (err) => {
        // console.log("全局响应");
        return err;
      }
    );

    // 局部请求拦截器:一些接口存在自己特殊性的拦截器，比如：token
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }
  request<T = any>(config: HYRequestConfig<T>) {
    // 各个请求进行拦截
    if (config.interceptors?.requestSuccessFn) {
      // 不能在this.instance中加入拦截器，这样每条请求都会执行这个拦截器
      config = config.interceptors.requestSuccessFn(config);
    }

    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        },
        (rej) => {
          reject(rej);
        }
      );
    });
  }
  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default encapsulationAxios;
