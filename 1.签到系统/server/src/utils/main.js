/**
 * 延时
 * @param {number} time 时间（ms）
 * @returns Promise
 */
const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * 生成随机字符
 * @param {number} num 需要生成的随机字符个数
 * @returns 随机字符
 */
const generateRandomString = (num = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

module.exports = {
  delay,
  generateRandomString
};
