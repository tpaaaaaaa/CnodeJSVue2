import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';

import distanceLastTime from '@/utils/calcLastTime';
Vue.prototype.distanceLastTime = distanceLastTime;

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
