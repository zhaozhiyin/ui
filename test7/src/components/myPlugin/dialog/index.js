import Vue from 'vue'
import $dialog from './src/dialog2.vue'  //函数调用
import dialog from './src/dialog.vue'  //组件调用

import Loading from './src/loading.vue'
const v = new Vue({
    render(createElement) {
        return createElement(Loading)
    }
})
v.$mount()
document.body.appendChild(v.$el)
const load = v.$children[0]
function showLoading(opt) {
    load.showLoading(opt)
}

export default {
    showLoading
}

// let dialogConstructor = Vue.extend($dialog)
// let instance
// // let init = (options)=>{
// //     instance = new dialogConstructor()
// //     Object.assign(instance,options)
// //     document.body.appendChild(instance.$mount().$el)
// // }
// // let caller = (options)=>{
// //     //options 为调用组件方法时传入的配置选项
// //     if(!instance){
// //         init(options)
// //     }
// //     return instance.show(vm =>{instance = null})
// // }

// // export default {
// //     install(vue){
// //         vue.prototype.$dialog = caller
// //     }
// // }
// // let dialog = (options)=>{
// //     // instance = new dialogConstructor()
// //     // Object.assign(instance,options)
// //     instance = new dialogConstructor({
// //         data: options
// //     })
// //     document.body.appendChild(instance.$mount().$el)
// // }
// // ['tip', 'confirm', 'close'].forEach(type => {
// //     dialog[type] = options => {
// //         options.type = type
// //         return dialog(options)
// //     }
// // })

// // const install = function(Vue) {
// //     // Vue.component(component.name, component)
// //     Vue.prototype.$dialog = dialog
// // }
// // if (typeof window !== 'undefined' && window.Vue) {
// //     install(window.Vue)
// // }

// dialog.install = function(Vue) {
//     Vue.component(dialog.name, dialog)
// }
// export {dialog}
// // export {$dialog}