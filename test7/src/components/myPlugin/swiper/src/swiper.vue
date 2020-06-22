<template>
           <!-- swiperStyle, boxWidth+uni-->

    <div id="banner" :style="'width:'+width+uni+';height:'+height+uni"  @touchstart="onTouchStart" @touchend="onTouchEnd">
       <div :style="{
           width: (list.length+2) * 100 + '%',
           marginLeft: -(ind+1) * 100 + '%'
           }" ref='banner' :class="['box',isMove?'move':'']">
           <img alt="" :style="'width:'+width+uni" :src="list[list.length-1]" @click="clickImg">
           <img v-for="(item,index) in list" alt="" :style="'width:'+width+uni" :src="item" :key="index" @click="clickImg">
           <img alt="" :style="'width:'+width+uni" :src="list[0]" @click="clickImg">
       </div>
       <ul class="doc" v-if="status.isShowDots" >
           <li :class="[norDoc, (index==ind||(index==0&&ind==list.length)||(index==(list.length-1)&&ind<0))?actDot:'']" v-for="(item,index) in list" :key="index" @click.stop="clickDots(index)"></li>
       </ul>
    </div>
</template>
<script>
export default {
    name: 'swiper',
    data() {
        return {
            ind: 0,
            intervalTime: null,
            touchStart: {}, // 触摸开始点位
            touchEnd: {}, // 触摸结束点位
            isMove: true,
            out: null
        };
    },
    props: {
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: String,
            default: "500px"
        },
        uni: {
            type: String,
            default: 'px'
        },
        status: {
            type: Object,
            default: ()=>{
                return {
                    isShowDots: true, // 是否显示分页器
                    interval: 3000, // 轮播间隔时间，默认3s
                    autoplay: true, // 是否自动播放
                }
            }
        },
        list: {
            type: Array,
            default: ()=>{
                return  [
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
                    'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
                ]
            }
        },
        norDoc: {
            type: String,
            default: 'doc_item'
        },
        actDot: {
            type: String,
            default: 'act'
        }
    },
    created() {
        if(this.status.autoplay) {
            this.autoSwiper()
        }
    },
    mounted() {

    },
    methods: {
        autoSwiper() {
            if (this.status.autoplay) { 
                this.intervalTime = setInterval(() => {
                    this.ind++
                    this.move()
                }, this.status.interval)
            }
        },
        move() {
            if(this.ind == this.list.length) {
                clearTimeout(this.out)
                this.out= setTimeout(()=>{
                    this.isMove = false
                    this.ind = 0
                },500)
            } else if(this.ind == -1) {
                clearTimeout(this.out)
                this.out= setTimeout(()=>{
                    this.isMove = false
                    this.ind = this.list.length-1
                },500)
            } else {
                this.isMove = true
                this.ind = this.ind % this.list.length;
            }
        },
        onTouchStart(e) {
            this.touchStart = e.changedTouches[0] 
            clearInterval(this.intervalTime)
        },
        onTouchEnd(e) {
            this.touchEnd = e.changedTouches[0]
            if (this.touchEnd.clientX - this.touchStart.clientX > 60) {
                this.ind--
            } else if (this.touchEnd.clientX - this.touchStart.clientX < -60) {
                this.ind++
            }
            this.move()
            this.autoSwiper()
        },
        clickImg() {
            this.$emit('onClick',this.ind)
        },
        clickDots(index) {
            clearInterval(clearInterval(this.intervalTime))
            this.isMove = false
            this.ind = index
            this.$emit('onClick',this.ind)
            this.autoSwiper()
        }

    },
    watch: {
        isMove(val) {
            this.isMove = val
        }
    }
};
</script>
<style lang="less" scoped>
* {
    padding: 0; margin: 0;
}
#banner {
    position: relative;
    overflow: hidden;
    .box {
        position: relative;
        height: 100%;
        img {
            float: left;
            width: 100%; height: 100%;
        }
    }
    .doc {
        position: absolute;
        bottom: 20px; left: 0; right: 0;
        z-index: 10;
        .doc_item {
            display: inline-block;
            width: 10px; height: 10px;
            background-color: rgba(190, 189, 189);
            margin-left: 10px;
            border-radius: 50%;
        }
        .doc_item.act {
            background-color: rgba(0,0,0,0.6);
        }
    }
}
.move {
    transition: all 0.5s ease;
}
</style>