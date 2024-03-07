const chalk = require("chalk");

/**
 * 控制台美化 - 主要
 * @param {string} text 输出文字
 * @param {boolean} isReturn 是否返回，不直接输出
 * @returns 美化后的字符串
 */
const chalkMainConsole = (text, isReturn = false) => {
  const out = chalk.bold.rgb(237, 235, 233).bgRgb(255, 99, 71)(text);

  if (isReturn) return out;
  console.log(out);
};

/**
 * 控制台美化 - 次要
 * @param {*} text 输出文字
 * @param {*} isReturn 是否返回，不直接输出
 * @returns 美化后的字符串
 */
const chalkSecondConsole = (text, isReturn = false) => {
  const out = chalk.bold.rgb(255, 205, 2)(text);

  if (isReturn) return out;
  console.log(out);
};

/**
 * 控制台美化 - 次次要
 * @param {*} text 输出文字
 * @param {*} isReturn 是否返回，不直接输出
 * @returns 美化后的字符串
 */
const chalkThirdConsole = (text, isReturn = false) => {
  const out = chalk.bold.italic.rgb(33, 150, 243)(text);

  if (isReturn) return out;
  console.log(out);
};

/**
 * 控制台美化 - 成功
 * @param {*} text 输出文字
 * @param {*} isReturn 是否返回，不直接输出
 * @returns 美化后的字符串
 */
const chalkSuccessConsole = (text, isReturn = false) => {
  const out = chalk.bold.italic.rgb(16, 124, 16)(text);

  if (isReturn) return out;
  console.log(out);
};

module.exports = {
  chalkMainConsole,
  chalkSecondConsole,
  chalkThirdConsole,
  chalkSuccessConsole
};
