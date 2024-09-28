import RequestService from "..";

// 高性价比数据
export const fetchHomeGoodScore = () => {
  return RequestService.get({
    url: "/home/goodprice"
  });
};

// 高评分数据
export const fetchHomeHighScore = () => {
  return RequestService.get({
    url: "/home/highscore"
  });
};

// 折扣数据
export const fetchHomeDiscount = () => {
  return RequestService.get({
    url: "/home/discount"
  });
};

// 推荐数据
export const fetchRecommend = () => {
  return RequestService.get({
    url: "/home/hotrecommenddest"
  });
};

// 向往数据
export const fetchLongfor = () => {
  return RequestService.get({
    url: "/home/longfor"
  });
};

// plus数据
export const fetchHomePlus = () => {
  return RequestService.get({
    url: "/home/plus"
  });
};
