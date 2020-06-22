<!--
    文件：pop弹出层
    作者：赵志银
    时间：2020.06.17
-->
<template>
    <!-- pointer-events:none(点击穿透) / auto(禁止点击穿透) -->
    <div id="pop" :class="[isBg?'bg':'']" v-if="isShowPop" @click="close" :style="`pointer-events:${isStop?'auto':'none'}`">
        <div :class="['content', isShow?direction+'_in':direction+'_out', 'con_'+direction]" ref="pop" :style="`animation-duration: ${(duration - 20) / 1000}s`" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pop',
    data() {
        return {
            isShowPop: false
        }
    },
    props: {
        isClickClose: { //点击蒙层是否关闭
            type: Boolean,
            default: true
        },
        isStop: { //是否禁止点击穿透
            type: Boolean,
            default: true
        },
        direction: {   //弹出框出现方向
            type: String,
            default: "bottom"
        },
        isBg: {       //是否显示蒙层
            type: Boolean,
            default: true
        },
        isShow: {    //pop是否展示
            type: Boolean,
            default: false
        },
        duration: {  //动画时长（毫秒数）
            type: Number,
            default: 2000
        }
    },
    mounted() {
        
    },
    //实现数据双向绑定
    model: {
        prop: 'isShow',
        // 命名事件，对应下面$emit即可
        event: 'closePop'
    },
    methods: {
        close() {
            if(this.isClickClose) {
                this.$emit('closePop', false)
            }
        },
    },
    watch: {
        isShow(value) {
            if(value) {
                this.isShowPop = value
            } else {
                this.$emit('closePop', false)
                setTimeout(()=>{
                    this.isShowPop = value
                    //pop关闭且动画结束时触发触发
                    this.$nextTick(()=>{
                        this.$emit('endClose')
                    })
                },this.duration)
            }
        }
    }
};
</script>
<style lang="less" scoped>
#pop {
    position: fixed;
    top: 0; left: 0;
    height: 100%; width: 100%;
    .content {
        position: absolute;
        background-color: #fff;
        pointer-events: auto;
    }
    .con_bottom {
        position: absolute;
        bottom: 0; left: 0;
        width: 100%;
        background-color: #fff;
    }
    .con_top {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        background-color: #fff;
    }
    .con_left {
        position: absolute;
        top: 0; left: 0;
        height: 100%;
        background-color: #fff;
    }
    .con_right {
        position: absolute;
        top: 0; right: 0;
        height: 100%;
        background-color: #fff;
    }
}
.bg {
    background-color: rgba(0, 0, 0, 0.6);
}
// 底部的渐入渐出
.bottom_in {
    animation: bottom_inshow 0.3s linear forwards;
}
@keyframes bottom_inshow {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
}
.bottom_out {
    animation: bottom_outshow 0.3s linear forwards;
}
@keyframes bottom_outshow {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(100%);
    }
}
// 顶部的渐入渐出
.top_in {
    animation: top_inshow 0.3s linear forwards;
}
@keyframes top_inshow {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
}
.top_out {
    animation: top_outshow 0.3s linear forwards;
}
@keyframes top_outshow {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-100%);
    }
}
// 左边的渐入渐出
.left_in {
    animation: left_inshow 0.3s linear forwards;
}
@keyframes left_inshow {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}
.left_out {
    animation: left_outshow 0.3s linear forwards;
}
@keyframes left_outshow {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
// 右边的渐入渐出
.right_in {
    animation: right_inshow 0.3s linear forwards;
}
@keyframes right_inshow {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
    }
}
.right_out {
    animation: right_outshow 0.3s linear forwards;
}
@keyframes right_outshow {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(100%);
    }
}
</style>