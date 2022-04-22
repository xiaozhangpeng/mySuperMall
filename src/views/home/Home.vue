<template>
    <div class="wraper" id="home">
        <!-- 导航栏-->
        <nav-bar class="home-nav">
            <div slot="center">购物车</div>
        </nav-bar>
        <TabControl :title="['流行','新款','精选']" class="tab-control" ref="tabControl1" v-show="isTabFixed" @tabClick="tabClick"></TabControl>

        <scroll :probe-type="3"
                :pull-up-load="true"
                @pullingUp="loadMore"
                @scroll="contentScroll"
                class="content"
                ref="scroll"
        >
            <!--  轮播图-->
            <!--  封装的HomeSwiper-->
            <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
            <!--展示导航-->
            <RecommendView :recommends="recommends"></RecommendView>
            <!--本周流行-->
            <FeatureView></FeatureView>
            <!-- TabControl-->
            <TabControl :class="{fixed:isTabFixed}" :title="['流行','新款','精选']" class="tab-control"   @tabClick="tabClick"
                        ref="tabControl2"></TabControl>
            <!-- GoodsList商品展示-->
            <GoodsList :goods="showTab"></GoodsList>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    //请求首页数据
    import {getHomeGoods, getHomeMultidata} from "../../network/home"

    import NavBar from "../../components/common/navbar/NavBar"

    import Scroll from '../../components/common/scroll/Scroll'

    import RecommendView from "./RecommendView"
    import FeatureView from "./FeatureView"
    import HomeSwiper from "./HomeSwipper"

    import BackTop from '../../components/content/backTop/BackTop'
    import TabControl from "../../components/content/tabControl"
    import GoodsList from "../../components/content/goods/goodsList";

    export default{
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop

        },
        data() {
            return {
                banners: [],
                recommends: [],
                //商品列表的数据
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',

                //显示小箭头的判断
                isShowBackTop: false,
                tabOffsetTop: '',
                isTabFixed: false,
                saveY: 0,


            }
        },
        //计算属性
        computed: {
            //切换tab数据
            showTab() {
                return this.goods[this.currentType].list
            }
        },
        //组件创建前
        created() {
            //1请求多条数据
            this.getHomeMultidata();
            //2请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
        },
        mounted() {
            //防抖
            // const refresh=this.debounce(this.$refs.scroll.scroll.refresh(),200)
            //事件监听
            this.$bus.$on('itemImageLoad', () => {
                // console.log(this.$refs.scroll.scroll.refresh);
                // this.$refs.scroll.scroll.refresh()
                this.$refs.scroll.scroll.refresh()
            });
        },
        //记录出Home时的页面位置
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
            this.$refs.scroll.scroll.refresh()
        },
        //再次进入Home时保持页面位置
        deactivated() {
            this.saveY = this.$refs.scroll.scroll.y

        //取消全局事件监听
            this.$bus.$off('itemImgLoad', this.itemImgListener);
        },
        methods: {

            /*事件点击相关*/
            //根据子组件传递来的index，来判断点击的哪一个tab
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            //点击小箭头，页面直接到顶端

            // 防抖函数(自己封装)
            debounce(func, delay) {
                let timer = null;

                return function (...args) {
                    if (timer) clearTimeout(timer)
                    timer = setTimeout(() => {
                        func.apply(this, args)
                    }, delay)
                }

            },
            //点击箭头回滚到顶部
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },
            //监听滚动，拿到滚动的位置
            contentScroll(position) {
                // 1.判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 650;
                //   2.决定tabControl是否吸顶
                this.isTabFixed = (-position.y) > 650
            },
            //上拉加载更多
            loadMore() {
                //请求数据
                this.getHomeGoods(this.currentType);
            },
            swiperImageLoad() {
                // console.log(this.$refs.tabControl.$el.offsetTop)
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

            },

            /*网络请求相关的*/
            getHomeMultidata() {
                // 请求多个数据（ajax）
                getHomeMultidata().then(res => {
                    // console.log(res);
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            //请求列表数据
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {

                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                    this.$refs.scroll.finishPullUp()

                    //mock--- concat()方法可以拼接两个数组
                    // this.goods = this.goods.concat(res.data);
                })
            }
        }
    }

</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 99;*/
    }

    .tab-control {
        position: relative;
        z-index: 9;

    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
    /*}*/
</style>
