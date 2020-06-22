# test7

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

头部
<topTitle @back='back' @share='share' title='课程' :isBack='isBack' :isHome='isHome' isShare='isShare'></topTitle>

搜索框
<search @inputClear='clear' placeholder='clear' @getMsg='getMsg' :curValue='msg' ></search>

底部
<buttomTab :tab='tab' @clickTab="clickTab"></buttomTab>
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

picker
<zPicker :listArr='listArr' :currentIndex='currentIndex' @confirm='confirm'  title='但是均得分就是v的SVN空间VS多久VS的VS大V'>
    <div slot="curPicker">
        zPicker
    </div>
</zPicker>

<datePicker :listArr='listArr' :currentIndex='currentIndex' @confirm='confirm'  title='但是均得分就是v的SVN空间VS多久VS的VS大V'>
    <div slot="curPicker">
        datePicker
    </div>
</datePicker>

swiper
<swiper :width='width' :status="swiperOption" :list="bannerList" height="340" @onClick='onClick'></swiper>
swiperOption: {
    showDots: true, // 是否显示分页器
    interval: 3000, // 轮播间隔时间，默认3s
    autoplay: true, // 是否自动播放
}

pop
<h1 @click="openPop">pop</h1>
<pop :isShow='isPop' @closePop='closePop' direction='right' :isStop='isStop' :isBg='isBg' :isClickClose='isBg'>
    <div slot>
    <div>dvncsjvndfj</div>
    <div>dvncsjvndfj</div>
    <div>dvncsjvndfj</div>
    <div>dvncsjvndfj</div>
    <div>dvncsjvndfj</div>
    </div>
</pop>
openPop() {
    this.isPop = true
}