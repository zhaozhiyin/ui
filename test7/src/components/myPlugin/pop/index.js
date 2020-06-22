import pop from './src/pop.vue'

pop.install = function(Vue) {
    Vue.component(pop.name, pop)
}

export default pop