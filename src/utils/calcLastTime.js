/**
 * 用来计算返回日期距离当前的天数
 * @param { Number } lastTime - 返回时间戳
 */

export default function distanceLastTime(lastTime) {
	const nowDate = new Date();
	// 当前月天数
	const distanceDayOfMonth = new Date(
		nowDate.getFullYear(),
		nowDate.getMonth() + 1,
		0
	).getDate();

	// 返回秒  --计算出给定时间跟当前时间的差（即毫秒），再除1000得到秒
	const second = (nowDate.getTime() - new Date(lastTime).getTime()) / 1000;
	if (second < 60) return `${~~second}秒`;

	// 返回分钟
	const minutes = second / 60;
	if (minutes < 60) return `${~~minutes}分钟`;

	// 返回小时
	const hours = minutes / 60;
	if (hours <= 24) return `${~~hours}小时`;

	// 返回天数
	const days = hours / 24;
	if (days <= distanceDayOfMonth) return `${~~days}天`;

	// 返回月份
	const month = days / distanceDayOfMonth;
	if (month <= 12) return `${~~month}个月`;

	// 返回年份
	const year = month / 12;
	return `${~~year}年`;
}
