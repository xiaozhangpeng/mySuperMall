<template>
    <div class="tab-control">
        <div @click="changeIndex(index)" class="tab-control-item" v-for="(item,index) in title">
            <span :class="{active:index===currentIndex}">{{item}}</span>
        </div>
    </div>

</template>

<script>
    export default {
        name: "TabControl",
        data() {
            return {
                currentIndex:0
            }
        },
        props: ['title'],
        methods: {
            changeIndex(index) {
                this.currentIndex = index;
            //   子组件向父组件传递数据---$emit
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
    .tab-control {
        display: flex;
        height: 40px;
        width: 100%;
        line-height: 40px;
        text-align: center;
        background: #fff;


    }

    .tab-control-item {
        flex: 1;
    }

    .tab-control-item span {
        padding: 6px
    }

    .active {
        color: red;
        border-bottom: 5px solid red;
    }

</style>
