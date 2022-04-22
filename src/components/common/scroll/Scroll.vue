<template>
    <!-- better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。-->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null,
                message: '哈哈哈'
            }
        },
        mounted() {

            // 1.创建BScroll对象
            //BScroll有bug:如果是从PC端打开时，会被识别不是移动，而不会滑动
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                //用户控制Better-scroll需要刷新才能滚动的bug
                disableTouch: false,
                disableMouse: false
            });

            //打印scroll---发现问题---scroll的高度有时会刷不出来(scrollerHeight)
            // console.log(this.scroll);
            this.scroll.refresh()

            // 2.监听滚动的位置
            this.scroll.on('scroll', (position) => {
                // console.log(position);

                this.$emit('scroll', position)
            });

            // 3.监听上拉事件
            if (this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    this.$emit('pullingUp')
                    console.log("上拉加载更多")
                })
            }
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            }
        }
    }
</script>

<style scoped>

</style>
