import search from './search/index.js'
import scrollLoading from './scroll/index.js'
import banner from './banner/index.js'
import swiper from './swiper/index.js'
import topTitle from './title/index.js'
import buttomTab from './buttomTab/index.js'
import toast from './toast/index.js'
import zPicker from './picker/index.js'
import datePicker from './datePicker/index.js'
import pop from './pop/index.js'
import horseLamp from './horseLamp/index.js'


const components = [
    search,
    scrollLoading,
    banner,
    swiper,
    topTitle,
    buttomTab,
    zPicker,
    datePicker,
    pop,
    horseLamp,
]

const install = function(Vue, opts = {}) {
    components.forEach(components=>{
        Vue.component(components.name, components)
    })
    Vue.prototype.$toast = toast
}
if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

//自适应布局
function flexible (window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    function setBodyFontSize () {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit () {
        var rem = docEl.clientWidth / 7.5
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}
flexible (window, document)

//阿里巴巴矢量图标库
function icon() {
    const script = document.createElement('script')
    const css = document.createElement('link')
    const html = document.getElementsByTagName('html')[0]
    script.src = '//at.alicdn.com/t/font_1825653_o6ww0op6th.js'
    script.type = 'text/javascript'
    css.href = '//at.alicdn.com/t/font_1825653_o6ww0op6th.css'
    css.rel = 'stylesheet'
    html.appendChild(css)
    html.appendChild(script)
}
icon()

export default {
    install, 
    search,
    scrollLoading,
    banner,
    swiper,
    topTitle,
    buttomTab,
    zPicker,
    datePicker,
    pop,
    horseLamp
}