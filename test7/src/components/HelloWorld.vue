<template>
    <div class="hello">
        <!-- <topTitle @back='back' @share='share' title='课程' :isBack='isBack' :isHome='isHome' isShare='isShare'></topTitle> -->

        <!-- <search @inputClear='clear' placeholder='clear' @getMsg='getMsg' :curValue='msg' ></search> -->

        <!-- <buttomTab :tab='tab' @clickTab="clickTab">
        </buttomTab> -->

        <!-- <h1 @click="clickPicker">isPicker</h1> -->

        <!-- <zPicker :listArr='listArr' :currentIndex='currentIndex' @confirm='confirm'  title='但是均得分就是v的SVN空间VS多久VS的VS大V'>
          <div slot="curPicker">
              zPicker
          </div>
        </zPicker> -->

        <!-- <datePicker :listArr='listArr' :currentIndex='currentIndex' @confirm='confirm'  title='但是均得分就是v的SVN空间VS多久VS的VS大V'>
          <div slot="curPicker">
              datePicker
          </div>
        </datePicker> -->
        
        <!-- <horseLamp></horseLamp> -->
        <!-- <h1 @click="openPop">pop</h1>
        <h1 @click="clickBotton">djshn</h1>
        <pop :isShow='isPop' @closePop='closePop' direction='right' :isStop='isStop' :isBg='isBg' :isClickClose='isBg'>
          <div slot>
            <div>dvncsjvndfj</div>
            <div>dvncsjvndfj</div>
            <div>dvncsjvndfj</div>
            <div>dvncsjvndfj</div>
            <div>dvncsjvndfj</div>
          </div>
        </pop> -->
        <scrollLoading @getRefresh='getRefresh'>

        </scrollLoading>
        <!-- <swiper :width='width' :options="swiperOption" :list="bannerList" height="340" @onClick='onClick'></swiper> -->
        <!-- <banner height="3.4rem" :options="swiperOption" :list="bannerList" effect="zoom" @onClick="handleSwiperClick"></banner> -->
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      isStop: false,
      isBg: false,
      isPop: false,
      isPicker: false,
      msg: 'Welcome to Your Vue.js App',
      swiperOption: {
        showDots: true, // 是否显示分页器
        interval: 3000, // 轮播间隔时间，默认3s
        autoplay: true, // 是否自动播放
        loop: false
      },
      isBack: true,
      isHome: false,
      isShare: true,
      bannerList: [
        'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
        'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
        'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
        'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
        // 'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
        // 'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
        // 'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2019/12/04/30c218f3f9eee9d932cd52d6d645f28d.jpg',
        // 'http://rightinhome.oss-cn-hangzhou.aliyuncs.com/uploads/2020/01/06/3ceac0d57fd2af7ff4cac4ff529d668d.png',
      ],
      listArr: [
                ['dsvf', 'dsvdsvfdsvfdsvff', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf',],
                ['dsvf', 'dsvf', 'dsvdsvfdsvfdsvffdsvdsvfdsvfdsvff', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf',],
                ['dsvf', 'dsvdsvfdsvfdsvff', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf', 'dsvf',],
            ],
      currentIndex:[0,2,5],
      width: document.body.clientWidth,
      tab: [
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
    }
  },
  mounted(){
    this.$toast( {
      type: 'success',
      message: '',
      duration: 0
    })
  },
  methods: {
    clickPicker() {
      this.isPicker = true
    },
    confirm(e) {
      console.log(e)
    },
    clickBotton() {
      console.log(222)
    },
    openPop() {
      this.isPop = true
    },
    closePop(e) {
      this.isPop = e
    },
    handleSwiperClick(e) {
      console.log(e)
    },
    getT(e) {
      console.log(e)
    },
    clear() {
      this.msg = ''
      console.log(this.msg)
    },
    getMsg(e) {
      console.log(e)
      this.msg = e
    },
    onClick(e) {
      console.log(e)
    },

    share() {
      console.log('share')
    },
    back() {
      console.log('back')
    },

    clickTab(e) {
      console.log(e)
    },

    getRefresh(callback) {
      console.log(callback)
      callback()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ll {
  display: table;
  border: 1px solid #000;
  div {
    display: table-cell;
    padding: 20px;
    width: 50px; height: 100%;
    border-right: 1px solid #000;
  }
}
</style>
