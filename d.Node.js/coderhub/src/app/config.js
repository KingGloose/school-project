// 使用 dotenv 来配置项目的.env文件
const dotenv = require("dotenv");

// 用于存放密钥和私钥
const fs = require("fs");
const path = require("path");

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "../keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "../keys/public.key")
);

dotenv.config();

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
