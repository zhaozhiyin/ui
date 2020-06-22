import zPicker from './src/picker.vue'

zPicker.install = function(Vue) {
    Vue.component(zPicker.name, picker)
}

export default zPicker