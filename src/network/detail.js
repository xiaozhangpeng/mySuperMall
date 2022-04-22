import  {request} from './request'
import mockRequests from "./mockAjax";

export function getDetail(iid) {
    return request({url:'/detail',params:{iid}})
    //模拟数据

    // return mockRequests({url:'/goods'})
}

export function getRecommend() {
    return request({
        url: '/recommend'
    })
}

export class Goods {
    constructor(itemInfo, colums, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discount;
        this.columns = colums;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class GoodsParam {
    constructor(info, rule) {
        //注：images可能没有值
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
