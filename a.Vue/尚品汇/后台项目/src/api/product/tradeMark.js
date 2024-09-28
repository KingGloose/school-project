import request from "@/utils/request";

// 获取品牌数据
// admin/product/baseTrademark/{page}/{limit)
export const reqbaseTrademark = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });

// 获取添加品牌和修改品牌
// /admin/product/baseTrademark/save
// /admin/product/baseTrademark/update
export const reqSaveUpdatebaseTrademark = (TradeMark) => {
  if (TradeMark.id) {
    return request({
      //  更新品牌
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: TradeMark,
    });
  } else {
    return request({
      // 添加品牌
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: TradeMark,
    });
  }
};

// 删除品牌
// /admin/product/baseTrademark/remove/{id}
export const reqRemoveTradeMark = (id) => {
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
};
