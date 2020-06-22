<template>
    <div id="toast" @click.stop='' v-show="visible">
        <div :class="['toastBox',type=='loading'?'loading':'']">
            <div :class="['iconBox', message?'':'none',]" v-if="type=='loading'">
                <i :class='["iconfont","icon-jiazaizhong"]'></i>
            </div>
            <div :class="['iconBox', message?'':'none',]" v-if="type=='success'">
                <i class='iconfont icon-xiaoxi-chenggong-copy-copy'></i>
            </div>
            <div :class="['iconBox', message?'':'none',]" v-if="type=='fail'">
                <i class='iconfont icon-cuowu-tianchong'></i>
            </div>
            <div :class="['iconBox', message?'':'none',]" v-if="type=='warn'">
                <i class='iconfont icon-jinggao--'></i>
            </div>
            <div v-if="message" class="msg">{{message}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'toast',
    props:{
        content: ''
    },
    data() {
        return{
            type: '',  //loading-加载；success-成功；fail-失败；
            message: '',
            duration: 3000,
            closed: false,
            timer: null,
            visible: false
        }
    },
    mounted() {
        this.startTimer()
    },
    methods: {
        destroyElement () {
            this.$destroy()
            this.$el.parentNode.removeChild(this.$el)
        },

        startTimer() {
            if(this.duration>0) {
                this.timer = setTimeout(()=>{
                    if(!this.closed) {
                        this.closed = true
                        clearTimeout(this.timer)
                    }
                },this.duration)
            }
        }
    },
    watch: {
        closed (newVal) {
            if(newVal) {
                this.visible = true
                this.destroyElement()
            }
        }
    }
}
</script>
<style lang="less" scoped>
@keyframes load {
    0% {
        transform:rotate(0)
    }
    100% {
        transform:rotate(360deg)
    }
}
#toast {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    align-items: center; justify-content: center;
    .toastBox {
        position: relative;
        padding-top: 0.2rem;
        min-width: 2rem; min-height: 2rem;
        background-color: rgba(0,0,0,0.4);
        border-radius: 20px;
        text-align: center;
        box-sizing: border-box;
    }
    .iconfont {
        font-size: 0.8rem;
    }
    .none {
        position: absolute;
        top: 0; bottom: 0; left: 0; right: 0; 
        line-height: 2rem;
    }
    .loading {
        .iconBox {
            animation: load 1s linear infinite;
        }
    }
    .msg {
        margin-top: 0.2rem;
        font-size: 0.24rem; color: #fff;
    }
}
</style>