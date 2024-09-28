import axios from 'axios'

//引入nprogress(进度条)
import nprogress from 'nprogress';
//引入nprogress的样式
import "nprogress/nprogress.css"

//创建一个新的axios,使用名叫RewriteAxios的axios发送请求，就比原生的axios多请求拦截器和响应拦截器
const MockAxios = axios.create({
   //配置对象，基础路径，发送请求的时候会自动带上/api
   baseURL:'/mock',
   //代表事件超时5s的时候就代表请求失败
   timeout: 5000
})

// 添加请求拦截器
MockAxios.interceptors.request.use((config)=> {
   
   //进度条开启
   nprogress.start();

   // 在发送请求之前做些什么
   return config;
}, (error)=> {
   // 对请求错误做些什么
   return Promise.reject(error);
});

// 添加响应拦截器
MockAxios.interceptors.response.use((response)=> {
   //进度条结束
   nprogress.done();


   // 2xx 范围内的状态码都会触发该函数。
   // 对响应数据做点什么
   return response;
}, (error)=> {
   // 超出 2xx 范围的状态码都会触发该函数。
   // 对响应错误做点什么
   return Promise.reject(error);
});

export default MockAxios