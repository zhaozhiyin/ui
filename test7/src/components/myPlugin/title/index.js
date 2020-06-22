import topTitle from './src/title.vue'

topTitle.install = function(Vue) {
    Vue.component(topTitle.name, topTitle)
}

export default topTitle