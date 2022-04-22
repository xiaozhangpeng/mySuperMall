import Mock from "mockjs"
import goods from "./goods.json"

//mock数据：第一个参数是请求地址 第二个参数是请求数据
Mock.mock("/mock/goods",{code:200,data:goods});

