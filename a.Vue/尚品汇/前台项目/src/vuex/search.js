//引入统一接口
//此接口包含：获取搜索返回的数据reqSearchList
import {reqSearchList} from '../api/index'

//创建actions,用于收录存储业务逻辑的函数
const actions = {
   //获取搜索数据进行处理
   async GetSearchList(context,value){
      let result = (await reqSearchList(value)).data
      console.log(result);
      if(result.code == 200){
         context.commit("MuGetSearchList",result.data)
      }
   }
}

const mutations = {
   //获取搜索数据并存储
   MuGetSearchList(state,value){
      state.SearchListState = value;
   }
}

const state = {
   SearchListState:{},
}

//这里使用getter的简化数据的书写
const getters = {
   //后面加上[]其实是为了网络较慢时，数据不是undefined，而导致功能错误
   goodsList(state){
      return state.SearchListState.goodsList||[]
   },
   attrsList(state){
      return state.SearchListState.attrsList||[]
   },
   trademarkList(state){
      return state.SearchListState.trademarkList||[]
   },
   total(state){
      return state.SearchListState.total;
   }
}

export default ({
   actions:actions,
   mutations:mutations,
   state:state,
   getters:getters
})