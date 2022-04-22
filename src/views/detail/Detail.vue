<template>
    <div id="detail">

        <DetailNavBar @titleClick="titleClick" class="detail-nav" ref="nav"></DetailNavBar>
        <scroll :probe-type="3" @scroll="contentScroll" class="content" ref="scroll">
            <DetailSwiper :topImages="topImages"></DetailSwiper>
            <DetailBaseInfo :goods="goods"></DetailBaseInfo>
            <DetailShopInfo :shop="shop"></DetailShopInfo>
            <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
            <DetailParamsInfo :paramInfo="paramInfo" ref="params"></DetailParamsInfo>
            <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
            <GoodsList :goods="recommends" ref="recommend"></GoodsList>
        </scroll>
        <!--底部导航栏-->
        <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
        <!-- 底部小火煎-->
        <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
        <!--toast组件封装成插件进行显示-->
        <toast :message="message" :is-show="show"></toast>
    </div>

</template>

<script>
    import DetailNavBar from "./DetailNavBar"
    import DetailSwiper from "./DetailSwiper"
    import DetailBaseInfo from "./DetailBaseInfo"
    import DetailShopInfo from "./DetailShopInfo"
    import DetailGoodsInfo from "./DetailGoodsInfo"
    import DetailParamsInfo from "./DetailParamsInfo"
    import DetailCommentInfo from "./DetailCommentInfo";
    import DetailBottomBar from "./DetailBottomBar";

    import Scroll from "../../components/common/scroll/Scroll";
    import GoodsList from "../../components/content/goods/goodsList";
    import BackTop from "../../components/content/backTop/BackTop";
    import Toast from "../../components/common/toast/Toast";

    import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
    import {debounce} from "../../common/utils";
    import {itemListener, backTopMinxin} from "../../common/mixin";

    import {mapActions} from 'vuex';

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],

                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                isShowBackTop: true,
                message: '',
                show: false
            }
        },
        mixins: [itemListener, backTopMinxin],
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamsInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
            GoodsList,
            BackTop,
            Toast
        },
        created() {
            //1保存传入的iid
            this.iid = this.$route.params.iid;
            //2根据iid请求详情数据
            getDetail(this.iid).then(res => {
                const data = res.result;
                //获取顶部轮播图数据
                this.topImages = data.itemInfo.topImages;
                //获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                //获取店铺信息
                this.shop = new Shop(data.shopInfo);
                //    获取商品 详细信息
                this.detailInfo = data.detailInfo;
                //    保存参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
                //    取出评论信息
                if (data.rate.CRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }

            })
            //3、请求推荐数据
            getRecommend().then(res => {
                console.log(res);
                this.recommends = res.data.list;
            });

            //4、给getthemeTopY赋值(进行防抖）
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

                console.log(this.themeTopYs);
            }, 500);

        },
        methods: {
            // 点击箭头回滚到顶部
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },
            //可以使用对象方式 'add':'addCart'
            ...mapActions(['addCart']),
            imageLoad() {
                console.log('-----');
                this.$refs.scroll.scroll.refresh();
                // this.refresh();
                this.getThemeTopY();
            },
            //点击导航栏scroll滑动到相应位置
            titleClick(index) {
                console.log(index);
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200);
            },
            //scroll滑动
            contentScroll(position) {
                // console.log(position);
                const positionY = -position.y + 44;

                //2、positionY与主题中的值进行对比
                // [0, 13780, 15063, 15279,]
                //positonY在0-13780之间 index = 0
                //......
                //positonY在15279之后 index = 3
                for (let i = 0; i < this.themeTopYs.length; i++) {
                    //console.log(i); //str 下面 i+ 1会有问题
                    // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
                    //
                    // }
                    let length = this.themeTopYs.length;
                    if (this.currentIndex !== i
                        && ((i < length - 1 && positionY >= this.themeTopYs[i]
                            && positionY < this.themeTopYs[i + 1])
                            || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                        //对于上面一长串的范围判断使用this.themeTopYs.push(Number.MAX.VALUE);
                        //这样可以省去 || 之后的判断代码
                        this.currentIndex = i;
                        console.log(this.currentIndex);
                        this.$refs.nav.currentIndex = this.currentIndex;
                    }
                }

                //是否显示回到顶部
                this.isShowBackTop = (-position.y) > 1000;
            },
            //添加到购物车
            addToCart(){
                // console.log('addToCart');
                //1、获取购物车需要展示的信息加入购物车
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.newPrice;
                product.iid = this.iid;
                product.realPrice = this.goods.realPrice;

                //2、将商品添加购物车里面
                // this.$store.commit('addCart', product);

                // this.$store.dispatch('addCart', product).then(res => {
                //   console.log(res);
                // });

                //将上面 的方法影射到本组件内部(利用mapActions
                this.addCart(product).then(res => {
                    console.log(res);
                    this.show = true;
                    this.message = res;

                    setTimeout(() => {
                      this.show = false;
                      this.message = '';
                    }, 1500);
                    // console.log(this.$toast);
                    // this.$toast.show(res,2000);
                })
            }
        }


    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        background-color: #fff;
        height: calc(100% - 44px - 49px);
    }

    /*.content {*/
    /*    background-color: #fff;*/
    /*    height: calc(100% - 44px - 49px);*/
    /*}*/
</style>
