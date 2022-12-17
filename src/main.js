import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';

// 引入markdown渲染,再需要的元素上添加类名'markdown-body'
import 'github-markdown-css';

// 引入公共方法
import distanceLastTime from '@/utils/calcLastTime';
Vue.prototype.distanceLastTime = distanceLastTime;

// 引入公共组件
import MainConponent from '@/components/CNodeMain';
import CNodeAside from '@/components/CNodeAside';

Vue.component('MainConponent', MainConponent);
Vue.component('CNodeAside', CNodeAside);

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
