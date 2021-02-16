import api from '../utils/api';

export const loadApplications = async (filterData) => {
	let filter = '';
	if (filterData) {
		const filternames = Object.keys(filterData);
		for (let x = 0; x < filternames.length; x++) {
			const name = filternames[x];
			if (filterData[name] !== '' && filterData[name] !== 0) {
				if (filter !== '') filter = filter + '&';
				filter = filter + filternames[x] + '=' + filterData[name];
			}
		}
	}

	try {
		const res = await api.get(
			`/application${filter !== '' ? '?' + filter : ''}`
		);
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

export const getWeekApps = async () => {
	try {
		const res = await api.get('/application/lastweek');
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

export const saveApplication = async (application) => {
	const newApplication = {};
	for (const prop in application) {
		if (application[prop] !== '') {
			newApplication[prop] = application[prop];
		}
	}

	try {
		let res;
		if (application._id) {
			res = await api.put(`/application/${application._id}`, newApplication);
		} else {
			res = await api.post('/application', newApplication);
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

export const deleteApplication = async (app_id) => {
	try {
		const res = await api.delete(`/application/${app_id}`);
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
