<template>
    <div id="title" :style="`height: ${height}`">
       <div class='left' @click="back" :style="`line-height: ${height}`">
           <i class="icon-fanhui-xianxing iconfont" v-if="isBack"></i>
           <i class="icon-faxian-copy iconfont" v-if="isHome"></i>
       </div>
       <div class="title" :style="`line-height: ${height}`">
           {{title}}
       </div>
       <div class='right' @click="share" :style="`line-height: ${height}`">
           <i class="icon-fenxiang iconfont"></i>
       </div>
    </div>
</template>
<script>
export default {
    name: 'topTitle',
    data() {
        return {
        }
    },
    props: {
        title: {
            type: String,
            default: "首页"
        },
        isBack: {
            type: Boolean,
            default: false
        },
        isHome: {
            type: Boolean,
            default: true
        },
        height: {
            type: String,
            default: '1rem'
        }
    },
    mounted() {

    },
    methods: {
        back(){
            this.$emit('back')
        },
        share(){
            this.$emit('share')
        }
    },
    watch: {

    }
};
</script>
<style lang="less" scoped>
#title {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 60px;
    border-bottom: 0.1px solid #efefef;
    background-color: #fff;
    .left {
        position: absolute;
        top: 0; left: 0; bottom: 0;
        margin: auto;
        padding: 0 0.2rem;
    }
    .title {
        max-width: 70%;
        margin: auto;
        text-align: center; 
        font-size: 0.32rem;
        overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
    }
    .right {
        position: absolute;
        top: 0; right: 0; bottom: 0;
        margin: auto;
        padding: 0 0.4rem;
    }
    .iconfont {
        font-size: 0.38rem;
    }
}
</style>