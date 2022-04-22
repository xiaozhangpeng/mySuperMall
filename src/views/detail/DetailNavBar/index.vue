<template>
    <div >
        <NavBar>
            <div slot="left" class="back" @click="back()">
                <img src="../../../assets/img/common/back.svg" alt="" >
            </div>
            <div slot="center"  class="title">
               <div v-for="(title,index) in titles" class="title-item"  :class="{active:currentIndex===index}" @click="itemClick(index)">{{title}}</div>
            </div>
        </NavBar>

    </div>

</template>

<script>
    import NavBar from "./../../../components/common/navbar/NavBar"

    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            //一个等于号是赋值 两个等于号是比较大小
            itemClick(index){
                this.currentIndex=index;
                //提交给父组件titleClick事件
                this.$emit('titleClick', index);
            },
        //    点击图片返回到上一层
            back(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 15px;

    }
    .title-item{
        flex: 1;
        padding: 5px;
    }
    .active{
        color:var(--color-high-text);
        /*border-bottom: 2px solid darkred;*/
    }
    .back img{
        margin-top: 13px;
    }

</style>
