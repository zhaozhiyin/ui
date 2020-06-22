import Vue from 'vue'
import Toast from './src/toast.vue'

let ToastConstructor = Vue.extend(Toast)

let instance

let toast  = (options = {})=> {
    //仅允许一个toast提示
    if(document.getElementById('Toast')){
        return
    }
    instance = new ToastConstructor({
        data: options
    })
    document.body.appendChild(instance.$mount().$el)
}

export default toast