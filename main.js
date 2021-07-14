import Vue from 'vue'
import App from './App'

import {http} from "utils/luch-request/index.js"
Vue.prototype.$http = http;

// 聊天测试
import store from "./common/chat/store.js";
Vue.prototype.$store = store;

// 自定义事件引入


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
