import request from "@/utils/request";

// 获取一级分类
// /admin/product/getCategory1
export const reqCategoryOne = () =>
  request({
    url: "/admin/product/getCategory1",
    method: "get",
  });

// 获取二级分类
// /admin/product/getCategory2/(category1ld)
export const reqCategoryTwo = (category1Id) =>
  request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });

// 获取三级分类
// /admin/product/getCategory3/(category2ld)
export const reqCategoryThree = (category2Id) =>
  request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });

// 获取商品数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

// 添加属性和属性值
// admin/product/saveAttrInfo
/*
  {
    "attrName:""
    "attrValueList":[
      {
        "attrId":0,
        "valueName":""
      }
    ]
    "categoryId":0
    "categoryLevel":3,
  }
*/
export const reqSaveAttrInfo = (params) =>
  request({
    url: "/admin/product/saveAttrInfo",
    method: "post",
    data: params,
  });
