import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入ElementUI核心插件
import ElementUI from 'element-ui';
// 导入ElementUI核心样式文件
import 'element-ui/lib/theme-chalk/index.css';
// 导入工具类
import instance from '@/utils/request';

Vue.config.productionTip = false

Vue.use(ElementUI);

// 挂载axios工具类到全局
Vue.prototype.$axios = instance;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')