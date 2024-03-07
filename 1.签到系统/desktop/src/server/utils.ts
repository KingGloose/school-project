import fs from "fs";
import path from "path";

import jwt from "jsonwebtoken";

// 颁发token
export const issueToken = (info: any) => {
  const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../src/server/keys/private.key"));

  const token = jwt.sign(info, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24 * 30 * 12 * 2, // 有效期：两年
    algorithm: "RS256"
  });

  return token;
};

export const verifyToken = (token: string) => {
  const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

  try {
    return jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
  } catch (e) {
    return new Error("鉴权错误");
  }
};
