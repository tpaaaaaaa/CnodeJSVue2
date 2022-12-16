import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		name: 'testhome',
		path: '/testhome',
		component: () => import('@/views/TestHome'),
	},
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
	scrollBehavior(to, from, savedPositiom) {
		if (savedPositiom) {
			return savedPositiom;
		} else {
			return { x: 0, y: 0 };
		}
	},
});

router.beforeEach((to, from, next) => {
	next();
});

const { isNavigationFailure } = VueRouter;
const originPush = Object.getPrototypeOf(router).push;

// 解决重复跳转同一路由时的异常
const rePushOrReplace = async function (location, onResolve, onReject) {
	if (onResolve | onReject)
		return originPush.call(this, location, onResolve, onReject);
	try {
		return await originPush.call(this, location);
	} catch (err) {
		if (isNavigationFailure(err)) {
			return err;
		}
		return Promise.reject(err);
	}
};

Object.getPrototypeOf(router).push = rePushOrReplace;
Object.getPrototypeOf(router).replace = rePushOrReplace;

export default router;
