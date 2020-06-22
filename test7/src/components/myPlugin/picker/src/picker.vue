<template>
    <div id="pickerCon">
        <div class="show-picker" @click="show">
            <slot name="curPicker"></slot>
        </div>
        <pop :isShow='isShow' @closePop='cancle' direction='bottom' :isBg='isBg' :duration='duration'>
            <div id="picker" slot>
                <div class="top">
                    <div :class="['cancleBtn',canBtnStyClass]" @click="cancle">{{cancleBtn}}</div>
                    <div class="title">{{title}}</div>
                    <div :class="['confirmBtn', conBtnStyClass]" @click="confirm">{{confirmBtn}}</div>
                </div>

                <div class="content" v-if="type=='normal'">
                    <div class="box">
                        <div class="list" :style="`width:${100 / listArr.length}%`" v-for="(item, index) in listArr" :key='index'>
                            <pickerItem :listArr='item' :currentIndex='currentIndex[index]' @change='change' :listIndex='index'></pickerItem>
                        </div>
                    </div>
                    <div class="overBg"></div>
                    <div class="picker-curent"></div>
                </div>

                <div class="content" v-if="type=='link'">
                    <div class="box">
                        <div class="list" :style="`width:${100 / listArr.length}%`" v-for="(item, index) in listArr" :key='index'>
                            <pickerItem :listArr='item' :currentIndex='nowIndex[index]' @change='change' :listIndex='index' :ref="`list${index}`"></pickerItem>
                        </div>
                    </div>
                    <div class="overBg"></div>
                    <div class="picker-curent"></div>
                </div>

            </div>
        </pop>
    </div>
</template>
<script>
import pickerItem from './pickerItem.vue'
import pop from '../../pop/src/pop.vue'
let startY
export default {
    name: 'zPicker',
    components:{
        pickerItem,
        pop
    },
    data() {
        return {
            nowIndex: [],
            isShow: false
        }
    },
    props: {
        type: {     //picker类型：normal-普通  link-级联
            type: String,
            default: "normal"
        },
        cancleBtn: {
            type: String,
            default: "取消"
        },
        canBtnStyClass: {  //取消按钮样式的类名
            type: String,
            default: ""
        },
        confirmBtn: {
            type: String,
            default: "确认"
        },
        conBtnStyClass: {  //确认按钮样式的类名
            type: String,
            default: ""
        },
        title: {        //标题
            type: String,
            default: ""
        },
        listArr: {
            type: Array,
            default: [
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
                'dsvf',
            ]
        },
        currentIndex: {  //当前选中的下标
            type: Array,
            default: []
        },
        isBg: {      //是否显示蒙层
            type: Boolean,
            default: true
        },
        duration: {  //动画时长（毫秒数）
            type: Number,
            default: 500
        }
    },
    mounted() {
        this.initPage()
    },
    methods: {
        /**
         显示picker
         @param 
         @return
        */
        show() {
            this.isShow = true
        },
        /**
         pickerItem滚动结束后的返回值
         @param {object} e 返回值
         @return
        */
        change(e) {
            let list = e.listIndex
            this.nowIndex[e.listIndex] = e.currentIndex
            if(this.type == 'link' ) {
                for(let i = list+1; i<=this.listArr.length; i++) {
                    this.$set(this.nowIndex, i, 0)
                }
            }
        },
        /**
         初始化页面
         @param
         @return
        */
        initPage() {
            for(let i = 0; i<this.listArr.length; i++) {
                let tem = 'list'+i
                this.nowIndex[i] = 0
                if(this.currentIndex[i]) {
                    this.$set(this.nowIndex, i, this.currentIndex[i])
                } else {
                    this.$set(this.nowIndex, i, 0)
                }
            }
        },
        /**
         取消按钮
         @param 
         @return
        */
        cancle() {
            this.isShow = false
            this.$emit('cancle')
        },
        /**
         确认按钮
         @param
         @return
        */
        confirm() {
            this.isShow = false
            this.$emit('confirm',this.nowIndex.slice(0,this.listArr.length))
        }
    },
    watch: {

    }
};
</script>
<style lang="less" scoped>
#picker {
    width: 100%; height: 4rem;
    border-top: 0.1px solid #efefef;
    background-color: #fff;
    .top {
        display: flex;
        align-items: center;
        height: 1rem; width: 100%;
        border-bottom: 1px solid #efefef;
        div {
            font-size: 0.28rem;
        }
        .cancleBtn {
            padding-left: 0.24rem;
            color: #999;
        }
        .title {
            width: 60%;
            margin: auto; 
            font-weight: bolder;
            overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        }
        .confirmBtn {
            padding-right: 0.24rem;
        }
    }
    .content {
        position: relative;
        width: 100%; height: 3rem;
        overflow-y: hidden;
        .box {
            display: flex;
        }
        .picker-current{
            position: absolute;
            left: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
    .overBg {
        position: absolute;
        left: 0;top: 0;
        height: 100%;width: 100%;
        z-index: 2;
        background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,.9)),to(rgba(255,255,255,.4))),-webkit-gradient(linear,left bottom,left top,from(rgba(255,255,255,.9)),to(rgba(255,255,255,.4)));
        background-image: -o-linear-gradient(top,rgba(255,255,255,.9),rgba(255,255,255,.4)),-o-linear-gradient(bottom,rgba(255,255,255,.9),rgba(255,255,255,.4));
        background-image: linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,.4)),linear-gradient(0deg,rgba(255,255,255,.9),rgba(255,255,255,.4));
        background-size: 100% 1.2rem;
        background-position: top,bottom;
        background-repeat: no-repeat;
        pointer-events: none
    }
    .picker-curent {
        position:absolute;
        top:50%;left:0;
        z-index:3;
        width:100%;height:0.6rem;
        -webkit-transform:translateY(-50%);
        -ms-transform:translateY(-50%);
        transform:translateY(-50%);
        pointer-events:none
    }
    .picker-curent::after {
        position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;content:' ';pointer-events:none;top:-50%;right:-50%;bottom:-50%;left:-50%;border:1px solid #ebedf0;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)
    }
}
::-webkit-scrollbar {
  display: none;
}
.reset{
  transition: all .2s;
}
</style>