import axios from 'axios'
import Qs from 'qs'
import router from '../router/router.js'

let instance = axios.create({
  baseURL: 'http://localhost:9527/jtsec/',
  timeout: 10000,
  withCredentials: true /* 设置跨域 */
});
// 请求拦截器
instance.interceptors.request.use(config => {
  // 请求参数序列化
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    config.data = Qs.stringify(config.data)
  }
  return config;
}, error => {
  return Promise.reject(error);
});
// 返回拦截
instance.interceptors.response.use((res) => {
     const data = res.data
     if (data.code === 6) {
       this.$notify.info({
         title: '消息',
         message: data.msg
       });
       router.push('/login')
     }
     return res
  }
);
/**
 * 封装并导出get方法、post方法。
 */
export default instance
