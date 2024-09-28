import dayjs from "dayjs";

export function formateMonthDay(date, formate = "MM月DD日") {
  return dayjs(date).format(formate);
}

export function getDiffDays(startDay, endDay) {
  return dayjs(endDay).diff(startDay, "days");
}
