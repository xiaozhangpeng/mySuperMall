<template>
    <div class="goods">
        <goodsListItem :itemList="item" v-for="item in goods"></goodsListItem>
    </div>

</template>

<script>
    import goodsListItem from './goodsListItem'

    export default {
        name: "GoodsList",
        props: ['goods'],
        components: {
            goodsListItem
        }
    }
</script>

<style scoped>
    .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        padding: 2px;
    }

</style>
