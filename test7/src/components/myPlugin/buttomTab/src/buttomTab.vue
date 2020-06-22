<template>
    <div id="tab" :style="`height: ${height}`">
        <slot name="tablist">
            <div class="tablist" v-for="(item,index) in tab" :key="index" :style="`width:${100 / tab.length}%`" @click="clickTab(index)">
                <i class='icon-fanhui-xianxing iconfont' v-if="!item.src"></i>
                <img :src="item.src" v-if="item.src" />
                <span>{{item.name}}</span>
            </div>
        </slot>
    </div>
</template>
<script>
export default {
    name: 'buttomTab',
    data() {
        return {
        }
    },
    props: {
        tab: {
            type: Array,
            default: [
                {
                    src: 'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
                    name: '首页'
                },
                {
                    src: '',
                    name: '首页'
                },
                {
                    src: 'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
                    name: '首页'
                },
                {
                    src: 'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
                    name: '首页'
                },
            ]
        },
        height: {
            type: String,
            default: '1rem'
        },
        actIndex: {
            type: Number,
            default: 0
        }
    },
    mounted() {

    },
    methods: {
        clickTab(e){
            this.$emit('clickTab',e)
        }
    },
    watch: {

    }
};
</script>
<style lang="less" scoped>
#tab {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%; height: 60px;
    border-top: 0.1px solid #efefef;
    background-color: #fff;
    display: flex;
    align-items: center;
    .tablist {
        width: 33%;
        text-align: center;
        span {
            display: block;
            font-size: 0.24rem;
        }
        img {
            display: block;
            width: 0.5rem; height: 0.5rem;
            margin: 0 auto;
        }
    }
    .iconfont {
        font-size: 0.38rem;
    }
}
</style>