import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatUTC = (utcString: string, formatString: string = "YYYY/MM/DD HH:mm:ss") => {
  return dayjs.utc(utcString).utcOffset(8).format(formatString);
};

export const formatTimeStamp = (timeStamp: string, formatString: string = "YYYY/MM/DD HH:mm:ss") => {
  return dayjs(Number(timeStamp)).format(formatString);
};
