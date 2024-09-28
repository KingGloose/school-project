import RequestService from "@/service";

enum AnalysisAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  goodsSaleTop10 = "/goods/sale/top10",
  goodsAddressSale = "/goods/address/sale"
}

export const getCountListData = () => {
  return RequestService.get({
    url: "/goods/amount/list"
  });
};

export function getCategoryGoodsCount() {
  return RequestService.get({
    url: AnalysisAPI.categoryGoodsCount
  });
}

export function getCategoryGoodsSale() {
  return RequestService.get({
    url: AnalysisAPI.categoryGoodsSale
  });
}

export function getCategoryGoodsFavor() {
  return RequestService.get({
    url: AnalysisAPI.categoryGoodsFavor
  });
}

export function getGoodsSaleTop10() {
  return RequestService.get({
    url: AnalysisAPI.goodsSaleTop10
  });
}

export function getGoodsAddressSale() {
  return RequestService.get({
    url: AnalysisAPI.goodsAddressSale
  });
}
