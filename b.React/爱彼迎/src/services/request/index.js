import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class RequestService {
  constructor(baseURL, timeout) {
    this.instance = axios.create({ baseURL, timeout });

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      }
    );
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(
        (res) => {
          resolve(res.data);
        },
        (rej) => {
          reject(rej);
        }
      );
    });
  }
  get(config) {
    return this.request({ ...config, method: "get" });
  }
  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

const requestService = new RequestService(BASE_URL, TIMEOUT);

export default requestService;
