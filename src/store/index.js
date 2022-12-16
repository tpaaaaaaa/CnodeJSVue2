import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '@/api';
api;

Vue.use(Vuex);

/**
 *判断当前数据是否已经缓存
 * @param {Object} newReqParams 	--新的请求关键字
 * @param {String} reqParamsName 	--请求关键字本地的存储名
 * @param {String} dataName			--数据的本地存储名
 * @returns false|data数组
 */
const getLocalStorage = (newReqParams, reqParamsName, dataName) => {
	const oldReqParams = JSON.parse(localStorage.getItem(reqParamsName));
	const data = JSON.parse(localStorage.getItem(dataName));
	// 如果没有搜索过的关键字
	if (!oldReqParams) return false;
	// 判断是否与上次缓存关键字相同
	for (let oldKey in oldReqParams) {
		if (oldReqParams[oldKey] !== newReqParams[oldKey]) return false;
	}
	// 关键字相同，返回本地存储
	return data;
};

const store = new Vuex.Store({
	state: {
		topics: [],
		topicDetail: {},
		userInfo: {},
	},
	actions: {
		// 获取分类主题帖
		async getTopices(context, topicInfo) {
			let sameRequest = getLocalStorage(
				topicInfo,
				'getTopicsParams',
				'getTopics'
			);
			if (!sameRequest) {
				// 重新获取数据
				const result = await api.getTopics({ ...topicInfo });
				if (result.status !== 200) return new Error('获取主题失败');
				localStorage.setItem('getTopicsParams', JSON.stringify(topicInfo));
				if (topicInfo.page !== 1) {
					// console.log('追加数据');
					const newData = JSON.parse(localStorage.getItem('getTopics'));
					// console.log('当前数据', newData);
					newData.data?.push(...result.data.data);
					localStorage.setItem('getTopics', JSON.stringify(newData));
					sameRequest = newData;
					// console.log('赋值结束后', newData, result, sameRequest);
				} else {
					// console.log('全部覆盖');
					localStorage.setItem('getTopics', JSON.stringify(result.data));
					sameRequest = result.data;
				}
			}
			context.commit('GETTOPICES', sameRequest);

			// ***/-----------------------------------*/**/ */
			// const result = await api.getTopics({ ...topicInfo });
			// if (result.status !== 200) return new Error('获取主题失败');
			// context.commit('GETTOPICES', result.data);
		},
		// 根据id获取帖子的信息
		async getTopicById(context, id) {
			// 判断当前id是否为上一次存储的id
			let sameRequest = getLocalStorage({ id }, 'TopicDetailId', 'TopicDetail');
			if (!sameRequest) {
				const result = await api.getTopicById(id);
				if (result.status !== 200) return new Error('获取该ID帖子失败');
				localStorage.setItem('TopicDetail', JSON.stringify(result.data));
				localStorage.setItem('TopicDetailId', JSON.stringify({ id }));
				sameRequest = result.data;
			}
			context.commit('GETTOPICBYID', sameRequest.data);

			// ***/-----------------------------------*/**/ */
			// const result = await api.getTopicById(id);
			// if (result.status !== 200) return new Error('获取该ID帖子失败');
			// context.commit('GETTOPICBYID', result.data.data);
		},
		// 获取用户信息
		async getUserByName(context, loginname) {
			const result = await api.getUserByName(loginname);
			if (result.status !== 200) return;
			context.commit('GETUSERBYNAME', result.data);
		},
	},
	mutations: {
		GETTOPICES(state, data) {
			state.topics = data.data || [];
		},
		GETTOPICBYID(state, data) {
			state.topicDetail = data || {};
		},
		GETUSERBYNAME(state, data) {
			state.userInfo = data.data || {};
		},
	},
	getters: {},
});

export default store;
