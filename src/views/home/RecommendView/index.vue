<template>
    <div class="recommend">
        <div class="recommend-item" v-for="item in recommends">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>

        </div>

    </div>

</template>

<script>
    export default {
        name: "RecommendView",
        //父子组件传值
        props: ['recommends']
    }
</script>

<style scoped>
    .recommend {
        display: flex;
        padding: 10px 0 15px;
        border-bottom: 8px solid #eee;

    }

    .recommend-item {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }

    .recommend-item img {
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
    }

</style>
