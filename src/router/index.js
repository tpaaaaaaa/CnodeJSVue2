import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		name: 'home',
		path: '/home',
		component: () => import('@/views/Home'),
	},
	{
		name: 'topic',
		path: '/topic/:id?',
		component: () => import('@/views/Topic'),
		props: true,
	},
	{
		path: '/',
		redirect: { name: 'home' },
		alias: '/home',
	},
];

const router = new VueRouter({
	routes,
});

export default router;
