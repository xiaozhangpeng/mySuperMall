<template>
    <div>
      <!-- 封装的Swiper-->
        <Swiper>
            <SwiperItem v-for="banner in banners">
                <a :href="banner.link">
                    <img :src="banner.image" alt=""  @load="imageLoad">
                </a>
            </SwiperItem>
        </Swiper>
    </div>

</template>

<script>
    import {Swiper, SwiperItem} from "../../../components/common/swiper"

    export default {
        name: "HomeSwipper",
        data() {
            return {
                isLoad:false
            }
        },
        props:['banners'],
        components:{
            Swiper,
            SwiperItem
        },
        methods:{
            imageLoad(){
                if(!this.isLoad) {
                    this.$emit('swiperImageLoad');
                    this.isLoad=true;

                }
            }
        }
    }
</script>

<style scoped>

</style>
