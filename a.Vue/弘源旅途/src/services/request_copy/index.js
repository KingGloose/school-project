import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class NetRequest {
  constructor(BASE_URL, TIMEOUT) {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
    });
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

export default new NetRequest(BASE_URL, TIMEOUT);
