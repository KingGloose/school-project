const fs = require("fs");
const path = require("path");

const jwt = require("jsonwebtoken");

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../keys/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../keys/public.key"));

// 颁发token
const issueToken = (info) => {
  const token = jwt.sign(info, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24 * 30 * 12 * 2, // 有效期：两年
    algorithm: "RS256"
  });

  return token;
};

// 验证token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
  } catch (e) {
    return new Error("鉴权错误");
  }
};

module.exports = {
  issueToken,
  verifyToken
};
