<template>
    <div id="title">
        <input type="button" value="启动" @click="lang"/>
        <input type="button" value="停止" @click="end"/>
        <p>{{msg}}</p>
    </div>
</template>
<script>
export default {
    name: 'horseLamp',
    data() {
        return {
            intivend: null
        }
    },
    props: {
        title: {
            type: String,
            default: "首页"
        },
        isBack: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        this.msg = this.title
        this.lang()
    },
    methods: {
        lang(){
            if(this.intivend!=null){
                return
            }
            
            this.intivend=setInterval(()=>{
                //获取到头的第一个字符
            var start = this.msg.substring(0,1)
            //获取到后面所有的字符
            var end = this.msg.substring(1)
            //重新拼接得到新的字符串，并复制给this.msg
            this.msg=end+start
            
            // 注意： vue 实例会监听自己身上 data 中所有数据的改变，只要数据一
//                  发生变化,就会自动将数据同步到页面中去【程序员只需要关心数据，不需要考虑如何渲染到页面】
            },400)
        },
        end(){ //停止定时器
            clearInterval(this.intivend)
            this.intivend=null //每当清除了定时器之后，需要重新把intivend变为null
        }
    },
    watch: {

    }
};
</script>
<style lang="less" scoped>
#title {

}
</style>