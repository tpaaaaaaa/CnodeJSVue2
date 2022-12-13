import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '@/api';
api;

Vue.use(Vuex);

// 判断搜索是否相同
const getLocalStorage = (topicInfo, getTopicsParams, getTopics) => {
	const requestParams = JSON.parse(localStorage.getItem(getTopicsParams));
	const data = JSON.parse(localStorage.getItem(getTopics));
	for (let oldKey in requestParams) {
		if (requestParams[oldKey] !== topicInfo[oldKey]) return false;
	}
	return data;
};

const store = new Vuex.Store({
	state: {
		topics: [],
		topicDetail: {},
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
				// console.log('搜索不相同');
				const result = await api.getTopics({ ...topicInfo });
				if (result.status !== 200) return new Error('获取主题失败');
				localStorage.setItem('getTopics', JSON.stringify(result.data));
				localStorage.setItem('getTopicsParams', JSON.stringify(topicInfo));
				sameRequest = result.data;
			}
			context.commit('GETTOPICES', sameRequest);
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
		},
	},
	mutations: {
		GETTOPICES(state, data) {
			state.topics = data.data || [];
		},
		GETTOPICBYID(state, data) {
			state.topicDetail = data || {};
			console.log(state.topicDetail);
		},
	},
	getters: {},
});

export default store;
