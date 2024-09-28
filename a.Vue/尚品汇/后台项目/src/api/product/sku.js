import request from "@/utils/request";

// 以下为Spu接口
// 获取图片接口
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });

// 获取销售属性
// /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) =>
  request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });

// 获取属性信息
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

// 保存Sku
// /admin/product/saveSkuInfo
export const reqSaveSkuInfo = (params) =>
  request({
    url: "/admin/product/saveSkuInfo",
    method: "post",
    data: params,
  });

// 以下为Sku接口
// 获取当前Spu下的所有Sku
// /admin/product/findBySpuId/(spuId)
export const reqFindBySpuId = (spuId) =>
  request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
  });

//获取所有的Sku
//  /admin/product/list/{page}/{limit}
export const reqSkuAllList = (page, limit) =>
  request({
    url: `/admin/product/list/${page}/${limit}`,
    method: "get",
  });

// 下架Sku商品
// /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) =>
  request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: "get",
  });

// 上架Sku商品
// /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) =>
  request({
    url: `/admin/product/onSale/${skuId}`,
    method: "get",
  });

// 获取Sku详细信息
// /admin/product/getSkuById/{skuId}
export const reqGetSkuAllInfo = (skuId) => request({
  url:`/admin/product/getSkuById/${skuId}`
})
