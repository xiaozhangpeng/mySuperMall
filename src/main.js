import Vue from 'vue'
import App from './App.vue'
import store from "./store"
//引入路由组件
import router from "./router"
//引入video.js
import Video from "video.js"
import "video.js/dist/video-js.css"
Vue.prototype.$video = Video;

// 引入FastClick
import FastClick from "fastclick"
// 使用FastClick
FastClick.attach(document.body);

// 引入vue-lazyload插件
import VueLazyLoad from "vue-lazyload"
// 使用--配置vue-lazyload
Vue.use(VueLazyLoad, {
    err: '/test/jpeg', //失败的图片
    loading: '/test.jpeg', //成功的图片
    attempt: 1, //加载一屏图片
    preLoad: 1 //失败尝试次数

})

//全局事件总线
Vue.prototype.$bus = new Vue();

import toast from 'components/common/toast'
//安装toast插件
Vue.use(toast)

// 统一引入api文件夹里面的全部请求函数
// 统一引入,
// import * as API from "@/api";
// import "./mock/mockServe.js"

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')