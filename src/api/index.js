import axios from 'axios';

const BASEURL = 'https://cnodejs.org/api/v1';

export const getTopics = (topicInfo) =>
	axios.get(`${BASEURL}/topics`, { params: { ...topicInfo } });

export const getTopicById = (id) => axios.get(`${BASEURL}/topic/${id}`);
