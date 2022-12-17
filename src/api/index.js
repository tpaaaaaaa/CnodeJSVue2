import axios from 'axios';
//设置CNode社区的api
axios.defaults.baseURL = 'https://cnodejs.org/api/v1';

// 获取话题列表
export const getTopics = (topicInfo) =>
	axios.get(`/topics`, { params: { ...topicInfo } });

// 获取话题信息
export const getTopicById = (id) => axios.get(`/topic/${id}`);

// 获取用户信息
export const getUserByName = (loginname) => axios.get(`/user/${loginname}`);
