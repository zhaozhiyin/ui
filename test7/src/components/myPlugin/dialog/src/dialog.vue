<template>
<!-- 组件调用 -->
    <div id="dialog" @click="close()" v-show='isShow' :style="isCover?'':'background-color: transparent;'">
        <div :class='["tip" , {in:isShow ,out:!isShow}]' v-if="type=='tip'">
            <div>{{tipTitle}}</div>
        </div>
        <div class="toast" v-if="type=='toast'" @click.stop="show()">
            <slot name="toast">
                <div class='tcontent'>
                    <div>{{toastcontent}}</div>
                </div>
                <div class="tbtn" @click.stop="close()">{{toastbtn}}</div>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dialog1',
    props: {
        isCover: {       //是否显示遮罩
            type: Boolean,
            default: true
        },
        type: {          //类型
            type: String,
            default: '',
            required: true
        },
        isShow: {       //是否显示
            type: Boolean,
            default: false,
            required: true
        },
        tipTitle: {    //tip内容
            type: String,
            default: ''
        },
        time: {       //tip时间
            type: Number,
            default: 3000
        },
        toastcontent: {  //toast内容
            type: String,
            default: ''
        },
        toastbtn: {      //toast按钮提示
            type: String,
            default: '确认'
        }
    },
    data() {
        return {
            // isShow: false
        }
    },
    methods:{
        close() {
            this.$emit('onclose')
        },
        show() {
            this.$emit('onshow')
        }
    },
    watch:{
        isShow(boolean) {
            if(boolean) {
                if(this.type=='tip') {
                    // setTimeout(()=>{
                    //     this.$emit('onclose')
                    // },this.time)
                }
            } else {

            }
        }
    }
}
</script>
<style>
#dialog {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex; 
    align-items: center; justify-content: center;
}
.tip {
    max-width: 50%;
    padding: 8px 20px;
    border-radius: 10px;
    background-color: #000; color: #fff;
}
.toast {
    width: 60%;
    border-radius: 6px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.3);
    transition: all linear 2s;

}
.tcontent {
    padding: 10px;
    min-height: 40px;
    display: flex;
    align-items: center; justify-content: center;
    font-size: 14px;
}
.tcontent>div {
    text-align: left;
}
.tbtn { 
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    height: 50px;
    line-height: 50px; font-size: 14px;
}
.in {
    animation: inshow 0.3s linear forwards;
}
@keyframes inshow {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
.out {
    animation: outshow 0.5s linear;
}
@keyframes outshow {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
</style>