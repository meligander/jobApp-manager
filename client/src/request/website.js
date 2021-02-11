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

export const saveWebsite = async (website) => {
	const newWebsite = {};
	for (const prop in website) {
		if (website[prop] !== '') {
			newWebsite[prop] = website[prop];
		}
	}

	try {
		let res;
		if (website._id) {
			res = await api.put(`/website/${website._id}`, newWebsite);
		} else {
			res = await api.post('/website', newWebsite);
		}

		return {
			info: res.data,
			success: true,
		};
	} catch (err) {
		if (err.response.data.errors) {
			return {
				info: err.response.data.errors,
				success: false,
			};
		} else {
			const msg = err.response.data.msg;
			const type = err.response.statusText;
			return {
				info: msg ? msg : type,
				success: false,
			};
		}
	}
};

export const deleteWebsite = async (web_id) => {
	try {
		const res = await api.delete(`/website/${web_id}`);
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
