<template>
    <div class="goods-item">
        <!-- 图片-->
        <img v-lazy="showImage" alt="" @load="imageLoad" @click="itemClick">
        <div class="goods-info">
            <!--   商品标题-->
            <p>{{itemList.title}}</p>
            <!--   商品价格-->
            <span class="price">{{itemList.price}}</span>
            <!--   商品收藏数-->
            <span class="collect">{{itemList.cfav}}</span>
        </div>

    </div>

</template>

<script>
    export default {
        name: "GoodsListItem",
        props: ['itemList'],
        computed:{
            showImage(){
                //不同的地方调用名称与结构不同
                return this.itemList.image||this.itemList.show.img;
            }
        },
        methods:{
            imageLoad(){
                // console.log('goodsitem');
                this.$bus.$emit('itemImageLoad')
            },
            itemClick(){
                //跳转到详情页
                this.$router.push('/detail/'+this.itemList.iid)
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;

        width: 48%;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("./../../../assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>
