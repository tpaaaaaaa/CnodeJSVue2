import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';

// 引入markdown渲染
import 'github-markdown-css';

// 引入公共方法
import distanceLastTime from '@/utils/calcLastTime';
Vue.prototype.distanceLastTime = distanceLastTime;

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
