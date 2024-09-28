import request from "@/utils/request";

// 获取Spu列表数据
export const reqSpuInfo = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

//获取Spu信息
// /admin/product/getSpuById/{spuId}
export const reqSpuIdInfo = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "get",
  });

//获取品牌信息
// /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });

//获取Sku图片
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });

//获取品牌属性
// /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () =>
  request({
    url: "/admin/product/baseSaleAttrList",
    method: "get",
  });

//修改Spu|添加Spu
export const reqSaveUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      //  更新属性
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spuInfo,
    });
  } else {
    return request({
      // 添加属性
      url: "/admin/product/saveSpuInfo",
      method: "post",
      data: spuInfo,
    });
  }
};

// 删除Spu
// /admin/product/deleteSpu/(spuld)
export const reqDeleteSpu = (spuId) =>
  request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: "delete",
  });
