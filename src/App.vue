<template>
    <div id="app">

<!--        keep-alive可以使得组件不被销毁-->
        <keep-alive exclude="Detail">
            <router-view></router-view>
        </keep-alive>


        <MainTabBar></MainTabBar>
    </div>
</template>

<script>

    //引如MainTabBar
    import MainTabBar from "./components/content/mainTabbar/MainTabBar"

    export default {
        name: 'app',
        components: {
            MainTabBar
        }
    }
</script>

<style>
    /*<!--  引入base.css-->*/
    @import "./assets/css/base.css";


</style>
