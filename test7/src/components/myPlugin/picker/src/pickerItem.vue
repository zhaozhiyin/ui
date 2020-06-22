<template>
    <div id="pickerItem">
        <ul class="box" @touchstart.stop='start($event)' @touchmove.stop="move($event)" ref="item" @touchend.stop='end($event)'>
            <li v-for='(item, index) of listArr' :key='index'>{{item}}</li>
        </ul>
    </div>
</template>
<script>
let startY
export default {
    name: 'pickerItem',
    data() {
        return {
            nowIndex: 0 
        }
    },
    props: {
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
        currentIndex: {
            type: Number,
            default: 0
        },
        listIndex: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.initData()
    },
    model: {
        prop: 'currentIndex',
        event: 'change'
    },
    methods: {
        /**
         初始化页面
         @param 
         @return
        */
        initData() {
            this.nowIndex = this.currentIndex
            this.$refs.item.style.transform=`translate(0, ${(2-this.nowIndex)*30}px)`
        },
        /**
         触摸开始
         @param {dom} e 
         @return
        */
        start(e) {
            startY = e.targetTouches[0].pageY
            e.stopPropagation()
        },
        /**
         触摸滑动
         @param {dom} e 
         @return
        */
        move(e) {
            const pickerDom = this.$refs.item
            pickerDom.style.transform=`translate(0, ${e.targetTouches[0].pageY - startY + (2-this.nowIndex)*30}px)`
            e.stopPropagation()
            e.preventDefault()
        },
        /**
         触摸结束
         @param {dom} e 
         @return
        */
        end(e) {
            let moveY = startY - e.changedTouches[0].pageY
            const pickerDom = this.$refs.item
            if(moveY == 0) {
                return
            } else {
                let currentPage = Math.round(moveY/30) + this.nowIndex
                if(currentPage < 0){
                    currentPage = 0
                    pickerDom.style.transition="-webkit-transform 150ms ease-out";
                    pickerDom.style.webkitTransform=`translate(0, 60px)`;
                } else if(currentPage > this.listArr.length - 1) {
                    currentPage = this.listArr.length - 1
                    pickerDom.style.transition="-webkit-transform 150ms ease-out";
                    pickerDom.style.webkitTransform=`translate(0, ${(2 - currentPage) * 30}px)`;
                } else {
                    pickerDom.style.transition="-webkit-transform 150ms ease-out";
                    pickerDom.style.webkitTransform=`translate(0, ${(2 - currentPage) * 30}px)`;
                }
                this.nowIndex = currentPage
                this.$emit('change', {
                    listIndex: this.listIndex,
                    currentIndex: currentPage
                })
            }
        }
    },
    watch: {
        currentIndex(curVal,oldVal){
            this.currentIndex = curVal
            this.initData()
        },
    }
};
</script>
<style lang="less" scoped>
#picker {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%; height: 4rem;
    border-top: 0.1px solid #efefef;
    background-color: #fff;
    .content {
        position: relative;
        width: 100%; height: 3rem;
        overflow-y: hidden;
        ul {
            padding: 0; margin: 0;
            list-style: none;
            li {
                padding: 0 0.1rem;
                height: 0.6rem; line-height: 0.6rem;
                font-size: 0.24rem;
                overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
            }
        }
        .picker-current{
            position: absolute;
            left: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
}
::-webkit-scrollbar {
  display: none;
}
.reset{
  transition: all .2s;
}
</style>