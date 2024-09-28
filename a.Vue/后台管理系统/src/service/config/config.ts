// import.meta.env.MODE -- 显示是什么模式开发
// import.meta.env.DEV  -- 如果是开发模式就显示为true
// import.meta.env.PROD -- 如果是生产模式就显示为true
// import.meta,env.SSR  -- 如果是SSR模式就显示为true

let BASE_URL: string;
if (import.meta.env.DEV) {
  BASE_URL = "http://123.207.32.32:5000";
} else {
  BASE_URL = "http://123.207.32.32:5000"; // 表示为生产环境
}
const TIMEOUT = 10000;

export { BASE_URL, TIMEOUT };
