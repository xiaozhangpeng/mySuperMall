import axios from 'axios'
import nprogress from "nprogress"
import "nprogress/nprogress.css"

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    //新的接口地址:http://152.136.185.210:7878/api/hy66
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    nprogress.start()
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    nprogress.done()
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
