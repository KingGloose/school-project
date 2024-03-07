const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

/**
 * 根据当前时间获取当前时间提示
 * @returns 上午 | 中午 | 晚上
 */
const getTimeOfDay = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) return "上午";
  if (currentHour >= 12 && currentHour < 18) return "中午";
  return "晚上";
};

/**
 * 使用 dayjs 将时间戳转为 datetime 格式
 * @param {date} timestamp 时间戳
 * @returns datetime格式
 */
const formatDateTime = (timestamp) => {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 将时间按照utc来处理
 * @param {string} utcString 时间戳
 * @param {string} formatString 格式化
 * @returns utc计算后的格式
 */
const formatUTC = (utcString, formatString = "YYYY/MM/DD HH:mm:ss") => {
  return dayjs.utc(utcString).utcOffset(8).format(formatString);
};

module.exports = {
  getTimeOfDay,
  formatDateTime,
  formatUTC
};
