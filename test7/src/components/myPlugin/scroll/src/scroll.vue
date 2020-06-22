<template>
<!-- :style="{
            translateY: top+ 'px',
        }" -->
    <div id="scroll">
        <div class="my_scroll" ref="my_scroll">
            <div :class="['refresh_con' , {'refresh_con_show':isrefresh}]">
                加载中...
            </div>
            <div class="srcoll_cont" @touchstart='start($event)' @touchmove='move($event)' @scroll.passive="onScroll" @touchend='touchEnd($event)' ref="scroll">
                <ul>
                    <li ref="one">1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li ref="two">2</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'scrollLoading',
    data() {
        return {
            tep: 0,
            pageX: 0,
            pageY: 0,
            myScroll: '',

            top: 0,
            startY: 0,
            touching: false,
            isrefresh: false
        }
    },
    mounted(){
        this.myScroll = this.$refs.my_scroll //获取滑条dom
        console.log(this.myScroll)
        
        // this.myScrollList = this.my_scroll.children[1] //获取列表dom

        window.addEventListener('scroll', this.scrollToTop)

    },
    methods: {
        scrollToTop() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            console.log(scrollTop)
        },
        start(e) {
            this.pageX = e.targetTouches[0].pageX
            this.pageY = e.targetTouches[0].pageY


            this.startY = e.targetTouches[0].pageY
            this.touching = true
            // console.log(e.targetTouches[0])
        },
        move(e) {
            // let x = e.targetTouches[0].pageX
            // let y = e.targetTouches[0].pageY
            // console.log(this.$refs.my_scroll.scrollHeight)
            // if(y<this.pageY) {
            //     console.log('上')
            // } else {
            //     this.tep = y - this.pageY
            //     console.log('下'+this.tep)
            // }
            if(!this.touching) return
            // 获取移动的距离
            let diff = e.targetTouches[0].pageY - this.startY 
            //判断是向上拉还是向下拉
            console.log(diff)
            if(diff > 0) { 
                e.preventDefault()
            } else {
                return 　
            }
            //这个this.top要对应绑定到该元素的transform: translateY(+top+ 'px')上，不然是无法拉动的
            // 因此这里还要对偏移高度做一下处理，直接设置diff +(this.state === 2 ? 40 : 0) 太快了，因为拉取幅度太大
            // 让diff*0.25这样子就差不多了
            this.top = Math.floor(diff*0.25) + (this.state === 2 ? 40 : 0)
            if(this.top >= 40) {
                this.state = 1   //代表正在拉取
            } else {
                this.state = 0  // 代表初始转态
            }　
        },
        touchEnd(e) {
            this.touching = false
            if(this.state === 2) {
                this.top = 40
                return
            }
            // 判断抬起时的高度，是大于40 就开启刷新
            // let top = document.documentElement.scrollTop||document.body.scrollTop
            // console.log (top)
            console.log(this.$refs.scroll.scrollTop)
            this.top = this.$refs.scroll.scrollTop
            if(this.top<20) {
                this.refresh()
            }
            // if(this.top >= 40) {
            // } else {
            //     this.state = 0
            //     this.top = 0
            // }
        },
        onScroll(e) {
            // console.log(111)
            // console.log(e)
            // console.log(this.$refs.scroll.scrollTop)
            // this.top = this.$refs.scroll.scrollTop
        },
        refresh() {
            this.isrefresh = true
            this.state = 2
            this.top = 40
            const self = this
            // 这里可以调用父组件的方法去请求刷新接口
            this.$emit('getRefresh', function(self){
                //传个回调过去，请求完数据就复原
                // self.state = 0
                // self.top = 0
                self.isrefresh = false
            })
        }
    }
}
</script>
<style scoped>
#scroll {
    overflow: hidden;
}
    .my_scroll {
        position: relative;
        height: 300px; width: 300px;
        border: 1px solid #000;
    }
    .srcoll_cont {
        width: 100%; height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        border: 1px solid #000;
    }
    .refresh_con {
        margin-top: -0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.24rem; color: #999;
        transition: all linear 0.3s;
    }
    .refresh_con_show {
        margin-top: 0;
    }
</style>