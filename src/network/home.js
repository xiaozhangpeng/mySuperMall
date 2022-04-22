import {request} from "./request";
//引入mock虚拟数据
import mockRequests from "./mockAjax"

//首页轮播图的接口 地址是/home/multidata
// export const regHomeMultidata=()=>request({url:'/home/multidata',method:'get'})
//首页轮播图接口函数
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
//模拟数据
// export function getHomeGoods() {
//     return mockRequests({url:'/goods'})
// }

// 首页下拉列表接口函数(接口可能更改)
export function getHomeGoods(type,page) {
    return request(
        {url:'/home/data',params:{type,page}})
}

