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

                <div class="content" v-if="type=='date'">
                    <div class="box">
                        <div class="list" :style="`width:30%`">
                            <pickerItem :listArr='listArr[0]' @change='change' :listIndex='0' :currentIndex='nowIndex[0]'></pickerItem>
                        </div>
                        <div class="unit">年</div>
                        <div class="list" :style="`width:30%`">
                            <pickerItem :listArr='listArr[1]' @change='change' :listIndex='1' :currentIndex='nowIndex[1]'></pickerItem>
                        </div>
                        <div class="unit">月</div>
                        <div class="list" :style="`width:30%`">
                            <pickerItem :listArr='listArr[2]' @change='change' :listIndex='2' :currentIndex='nowIndex[2]'></pickerItem>
                        </div>
                    </div>
                    <div class="overBg"></div>
                    <div class="picker-curent"></div>
                </div>

                <div class="content" v-if="type=='time'">
                    <div class="box">
                        <div class="list" :style="`width:32%`">
                            <pickerItem :listArr='listArr[0]' @change='change' :listIndex='0' :currentIndex='nowIndex[0]'></pickerItem>
                        </div>
                        <div class="unit">:</div>
                        <div class="list" :style="`width:32%`">
                            <pickerItem :listArr='listArr[1]' @change='change' :listIndex='1' :currentIndex='nowIndex[1]'></pickerItem>
                        </div>
                        <div class="unit">:</div>
                        <div class="list" :style="`width:32%`">
                            <pickerItem :listArr='listArr[2]' @change='change' :listIndex='2' :currentIndex='nowIndex[2]'></pickerItem>
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

export default {
    name: 'datePicker',
    components:{
        pickerItem,
        pop
    },
    data() {
        return {
            nowIndex: [],
            isShow: false,
            dateObj: {
                startYear: '',
                startMon: '',
                startDay: '',
                endYear: '',
                endMon: '',
                endDay: '',
                curYear: '',
                curMon: '',
                curDay: '',
                curHour: '',
                curMin: '',
                curSec: '',
            },
            listArr: []
        }
    },
    props: {
        type: {     //picker类型：date-日期  time-时间
            type: String,
            default: "date"
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
        curDate: {   
            type: '',
            default: ()=>{
                return new Date()
            }
        },
        isBg: {      //是否显示蒙层
            type: Boolean,
            default: true
        },
        duration: {  //动画时长（毫秒数）
            type: Number,
            default: 500
        },
        startDate: {
            type: '',
            default: ()=>{
                return new Date(new Date().getFullYear() - 5, new Date().getMonth(), new Date().getDate())
            }
        },
        endDate: {
            type: '',
            default: ()=>{
                return new Date(new Date().getFullYear() + 5, new Date().getMonth(), new Date().getDate())
            }
        },
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
            console.log(e)
            if(this.type == 'date') {
                let list = e.listIndex==0?'year':(e.listIndex==1?'mon':'day')
                if(list == 'year') {
                    this.nowIndex[0] = e.currentIndex
                    let startMon = this.getMonArr(this.dateObj.startYear)
                    let endMon = this.getMonArr(this.dateObj.endYear)
                    let startDay = this.getDayArr(this.dateObj.startYear,this.dateObj.startMon)
                    let endDay = this.getDayArr(this.dateObj.endYear,this.dateObj.endMon)

                    if(this.listArr[0][e.currentIndex] == this.dateObj.startYear) {
                        this.$set(this.nowIndex, 1, 0)
                        this.$set(this.listArr, 1, startMon)
                        this.$set(this.nowIndex, 2, 0)
                        this.$set(this.listArr, 2, startDay)
                    } else if(this.listArr[0][e.currentIndex] == this.dateObj.endYear) {
                        if(this.listArr[1].length != endMon.length || this.listArr[1][this.listArr[1].length-1] != endMon[endMon.length-1]) {
                            if(this.listArr[1][this.nowIndex[1]]>endMon[endMon.length-1]) {
                                this.$set(this.nowIndex, 1, 0)
                            }
                            this.$set(this.listArr, 1, endMon)
                        }
                        if(this.listArr[2].length != endDay.length || this.listArr[2][this.listArr[2].length-1] != endDay[endDay.length-1]) {
                            if(this.listArr[2][this.nowIndex[2]]>endDay[endDay.length-1]) {
                                this.$set(this.nowIndex, 2, 0)
                            }
                            this.$set(this.listArr, 2, endDay)
                        }
                    } else {
                        if(this.listArr[1].length<12) {
                            this.$set(this.listArr, 1, this.getMonArr())
                        }
                        if(this.listArr[2].length<24) {
                            this.$set(this.listArr, 2, this.getDayArr('',1))
                        }
                    }
                } else if(list == 'mon') {
                    this.nowIndex[1] = e.currentIndex
                } else if(list == 'day') {
                    this.nowIndex[2] = e.currentIndex
                }
                console.log(this.nowIndex)
            }
        },
        /**
         初始化页面
         @param
         @return
        */
        initPage() {
            this.dateObj.startYear = new Date(this.startDate).getFullYear()
            this.dateObj.endYear = new Date(this.endDate).getFullYear()
            this.dateObj.curYear = new Date(this.curDate).getFullYear()

            this.dateObj.startMon = new Date(this.startDate).getMonth()+1
            this.dateObj.endMon = new Date(this.endDate).getMonth()+1
            this.dateObj.curMon = new Date(this.curDate).getMonth()+1

            this.dateObj.startDay = new Date(this.startDate).getDate()
            this.dateObj.endDay = new Date(this.endDate).getDate()
            this.dateObj.curDay = new Date(this.curDate).getDate()

            this.dateObj.curHour = new Date(this.curDate).getHours()
            this.dateObj.curMin = new Date(this.curDate).getMinutes()
            this.dateObj.curSec = new Date(this.curDate).getSeconds()
            

            if(this.type == 'date') {
                this.$set(this.nowIndex, 0, this.dateObj.curYear-this.dateObj.startYear)
                this.$set(this.nowIndex, 1, this.dateObj.curMon-1)
                this.$set(this.nowIndex, 2, this.dateObj.curDay-1)
    
                this.$set(this.listArr, 0, this.getYearArr())
                this.$set(this.listArr, 1, this.getMonArr(this.dateObj.curYear))
                this.$set(this.listArr, 2, this.getDayArr(this.dateObj.curYear,this.dateObj.curMon))
            } else if(this.type == 'time') {

            }
           
        },
        getYearArr() {
            let arr = []
            for(let i = this.dateObj.startYear; i<=this.dateObj.endYear;i++) {
                arr.push(i)
            }
            return arr
        },
        getMonArr(year) {
            let arr = []
            if(year == this.dateObj.startYear) {
                for(let i = this.dateObj.startMon; i<=12;i++) {
                    arr.push(i)
                }
            } else if(year == this.dateObj.endYear) {
                for(let i = 1; i<=this.dateObj.endMon;i++) {
                    arr.push(i)
                }
            } else {
                for(let i = 1; i<=12;i++) {
                    arr.push(i)
                }
            }
            return arr
        },
        getDayArr(year,mon) {
            let arr = []
            let num = (new Date(year, mon, 0)).getDate()
            if(year == this.dateObj.startYear && mon==this.dateObj.startMon) {
                for(let i = this.dateObj.startDay; i<=num;i++) {
                    arr.push(i)
                }
            } else if(year == this.dateObj.endYear && mon==this.dateObj.endMon) {
                for(let i = 1; i<=this.dateObj.endDay;i++) {
                    arr.push(i)
                }
            } else {
                for(let i = 1; i<=num;i++) {
                    arr.push(i)
                }
            }
            return arr
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
            let time = this.listArr[0][this.nowIndex[0]]+'年'+this.listArr[1][this.nowIndex[1]]+'月'+this.listArr[2][this.nowIndex[2]]
            this.$emit('confirm', time)
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
        .unit {
            line-height: 3rem; font-size: 0.26rem;
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