import horseLamp from './src/horseLamp.vue'

horseLamp.install = function(Vue) {
    Vue.component(horseLamp.name, horseLamp)
}

export default horseLamp