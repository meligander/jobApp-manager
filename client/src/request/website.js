import api from '../utils/api';

export const loadWebsites = async () => {
	try {
		const res = await api.get('/website');
		return {
			info: res.data,
			success: true,
		};
	} catch (err) {
		const msg = err.response.data.msg;
		const type = err.response.statusText;
		return {
			info: msg ? msg : type,
			success: false,
		};
	}
};
