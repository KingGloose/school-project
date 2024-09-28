//引入统一接口
//此接口包含：获取三级联动数据reqCategoryList、主轮播图数据reqBannerList，底部轮播图数据reqFloorList
import { reqBannerList, reqCategoryList, reqFloorList } from '../api/index'

//创建actions,用于收录存储业务逻辑的函数
const actions = {
   //获取三级联动数据进行处理
   async GetCategoryList(context) {
      let result = (await reqCategoryList()).data;
      console.log(result)
      if (result.code == 200) {
         context.commit('MuGetCategoryList', result.data)
      }
   },

   //获取主轮播图数据进行处理
   async GetBannerList(context) {
      let result = (await reqBannerList()).data;
      if (result.code == 200) {
         context.commit('MuGetBannerList', result.data)
      }
   },

   //获取底部轮播图数据进行处理
   async GetFloorList(context) {
      let result = (await reqFloorList()).data;
      if (result.code == 200) {
         context.commit('MuGetFloorList', result.data)
      }
   }
}

//创建mutasions,用于函数的调用
const mutations = {
    //获取三级联动数据并存储
   MuGetCategoryList(state, value) {
      state.CategoryListState = value;
      //限制数组长度为16，因为返回的数据是17个
      state.CategoryListState.length = 16
   },

   //获取主轮播图数据并存储
   MuGetBannerList(state, value) {
      state.BannerListState = value
   },

   //获取底部轮播图数据并存储
   MuGetFloorList(state, value) {
      state.FloorListState = value
   }
}

//创建state，用于存储数据
const state = {
   CategoryListState: [],
   BannerListState: [],
   FloorListState: []
}

export default({
   actions: actions,
   mutations: mutations,
   state: state
})