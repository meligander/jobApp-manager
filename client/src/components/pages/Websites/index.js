import React, { useEffect, useState } from 'react';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';

import {
	loadWebsites,
	saveWebsite,
	deleteWebsite,
} from '../../../request/website';

import Alert from '../../sharedComp/Alert';

const Websites = () => {
	const [adminValues, setAdminValues] = useState({
		alert: '',
		typeAlert: '',
		websites: [],
		numberEdit: null,
		originalValues: {
			name: '',
			url: '',
		},
	});

	const {
		alert,
		typeAlert,
		websites,
		numberEdit,
		originalValues,
	} = adminValues;

	useEffect(() => {
		const fetch = async () => {
			const info = await loadWebsites();
			if (info.success)
				setAdminValues((prev) => ({
					...prev,
					websites: info.info,
				}));
			else {
				setAdminValues((prev) => ({
					...prev,
					alert: info.info,
					typeAlert: 'danger',
				}));
				setTimer();
			}
		};

		fetch();
	}, []);

	const onChange = (e, index) => {
		let newWebsites = websites;

		newWebsites[index] = {
			...newWebsites[index],
			[e.target.name]: e.target.value,
		};
		setAdminValues({
			...adminValues,
			websites: newWebsites,
		});
	};

	const addNew = () => {
		const newWebsite = {
			name: '',
			url: '',
		};
		let newWebsites = websites;
		newWebsites.unshift(newWebsite);
		setAdminValues({
			...adminValues,
			websites: newWebsites,
			numberEdit: 0,
			originalValues: newWebsite,
		});
	};

	const saveChanges = async (website, index) => {
		const res = await saveWebsite(website);
		if (res.success) {
			let newWebsites = websites;
			newWebsites[index] = res.info;
			setAdminValues({
				...adminValues,
				numberEdit: null,
				alert: 'Changes saved',
				websites: newWebsites,
				typeAlert: 'success',
			});
			setTimer();
		} else {
			setAdminValues({
				...adminValues,
				alert: res.info,
				typeAlert: 'danger',
			});
			setTimer();
		}
	};

	const setTimer = () => {
		let timer = setTimeout(() => {
			setAdminValues({
				...adminValues,
				numberEdit: null,
				alert: '',
				typeAlert: '',
			});
			clear();
		}, 5000);

		const clear = () => {
			clearTimeout(timer);
		};
	};

	const deleteOneWebsite = (index, item) => {
		let newWebsites = websites;
		newWebsites.splice(index, 1);
		setAdminValues({ ...adminValues, websites: newWebsites });

		if (item._id) deleteWebsite(item._id);
	};

	return (
		<>
			<h2 className='heading heading-secondary text-secondary'>
				<span className='text'>Websites</span>
				<div className='underline'></div>
			</h2>
			<div className='text-right'>
				<button
					type='button'
					onClick={(e) => {
						e.preventDefault();
						addNew();
					}}
					className='btn add'
				>
					<BiMessageSquareAdd />
				</button>
			</div>
			{typeof alert === 'string' && alert !== '' ? (
				<Alert msg={alert} type={typeAlert} />
			) : (
				alert.length > 0 &&
				alert.map((alert, index) => (
					<Alert key={index} type='danger' msg={alert.msg} />
				))
			)}
			<table className='table'>
				<tbody>
					{websites.length > 0 &&
						websites.map((website, index) => (
							<tr key={index}>
								<td>
									<input
										type='text'
										name='name'
										placeholder='Name'
										disabled={numberEdit !== index}
										value={website.name}
										onChange={(e) => onChange(e, index)}
									/>
								</td>
								<td>
									<input
										type='text'
										name='url'
										placeholder='URL'
										disabled={numberEdit !== index}
										value={website.url}
										onChange={(e) => onChange(e, index)}
									/>
								</td>
								{numberEdit === index ? (
									<>
										<td className='table-tdicon'>
											<button
												type='button'
												onClick={(e) => {
													e.preventDefault();
													saveChanges(website, index);
												}}
											>
												<FiSave className='table-icon' />
											</button>
										</td>
										<td className='table-tdicon'>
											<button
												type='button'
												onClick={(e) => {
													e.preventDefault();
													let oldWebsites = websites;
													oldWebsites[index] = {
														...oldWebsites[index],
														...originalValues,
													};
													setAdminValues({
														...adminValues,
														numberEdit: null,
														websites: oldWebsites,
													});
												}}
											>
												<ImCross className='table-icon trash' />
											</button>
										</td>
									</>
								) : (
									<>
										<td className='table-tdicon'>
											<button
												type='button'
												onClick={(e) => {
													e.preventDefault();
													setAdminValues({
														...adminValues,
														numberEdit: index,
														originalValues: {
															name: website.name,
															url: website.url,
														},
													});
												}}
											>
												<VscEdit className='table-icon' />
											</button>
										</td>
										<td className='table-tdicon'>
											<button
												type='button'
												onClick={(e) => {
													e.preventDefault();
													deleteOneWebsite(index, website);
												}}
											>
												<RiDeleteBinLine className='table-icon trash' />
											</button>
										</td>
									</>
								)}
							</tr>
						))}
				</tbody>
			</table>
		</>
	);
};

export default Websites;
