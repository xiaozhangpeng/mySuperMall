<template>
    <div >

        <!--    <embed src="F:/test.MP4" type="video/mp4" width="400px" height="400px">-->
        <!--    <video width="320" height="240" controls>-->
        <!--      <source src="F:test.mp4" type="video/mp4">-->

        <!--    </video>-->
        <!--        <div>-->
        <!--            <input accept="video/*" type="file"/>-->
        <!--            <video autoplay controls muted></video>-->
        <!--        </div>-->
        <div class="test1">
            <video autoplay controls height="100%" loop muted poster="/test.jpeg" width="100%">
                <source src="/test.MP4" type="video/mp4" x5-video-player-type="h5-page">
            </video>
        </div>
        <div class="test2">
            <video autoplay controls height="100%" loop muted poster="/test.jpeg" width="100%">
                <source src="/test2.MP4" type="video/mp4" x5-video-player-type="h5-page">
            </video>
        </div>
        <div class="test3">
            <video autoplay controls height="100%" loop muted poster="/test.jpeg" width="100%">
                <source src="/test3.MP4" type="video/mp4" x5-video-player-type="h5-page">
            </video>
        </div>
        <div class="test4" style="margin-bottom: 50px">
            <video autoplay controls height="100%" loop muted poster="/test.jpeg" width="100%">
                <source src="F:/test/test.MP4" type="video/mp4" x5-video-player-type="h5-page">
            </video>
        </div>

    </div>
</template>

<script>

    export default {

        name: "Cart",
        data() {
            return {
                mutes: false
            }
        },
        beforeCreate() {

        }
    }
</script>

<style scoped>
    .test1 {
        /*width: 200px;*/
        /*height: 200px;*/
    }

    .test2 {
        /*width: 200px;*/
        /*height: 300px;*/
    }

</style>
