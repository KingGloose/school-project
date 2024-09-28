const fs = require("fs");

const useRouter = (app) => {
  // 使用fs.readdirSync读取该文件夹下面的所有文件
  fs.readdirSync(__dirname).forEach((ele) => {
    if (ele === "index.js") return;
    let router = require(`./${ele}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};

module.exports = {
  useRouter,
};
