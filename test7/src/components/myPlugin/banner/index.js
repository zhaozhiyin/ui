import banner from './src/banner.vue'

banner.install = function(Vue) {
    Vue.component(banner.name, banner)
}

export default banner