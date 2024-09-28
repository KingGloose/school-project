class RequestService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  request(options) {
    const { url } = options;
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseURL + url,
        success: (res) => {
          resolve(res);
        },
        fail: (rej) => {
          reject(rej);
        },
      });
    });
  }
  get(options) {
    return this.request({
      ...options,
      method: "get",
    });
  }
  post(options) {
    return this.request({
      ...options,
      method: "post",
    });
  }
}

// export const MusicRequestInstance = new RequestService("http://codercba.com:9002");
export const MusicRequestInstance = new RequestService(
  "http://1.117.220.127:3000"
);
