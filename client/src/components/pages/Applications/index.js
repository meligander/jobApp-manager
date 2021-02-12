import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiMessageSquareAdd, BiFilter, BiSearchAlt } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';

import {
	loadApplications,
	saveApplication,
	deleteApplication,
} from '../../../request/application';
import { loadWebsites } from '../../../request/website';

import Alert from '../../sharedComp/Alert';
import LetterPopup from '../../modals/LetterPopup';

const Applications = () => {
	const [adminValues, setAdminValues] = useState({
		alert: '',
		typeAlert: '',
		applications: [],
		websites: [],
		numberEdit: null,
		letterNumber: null,
		toggleModal: false,
		filter: {
			startDate: '',
			endDate: '',
			company: '',
			website: '',
		},
		toggleFilter: false,
		originalValues: {
			website: '',
			company: '',
			letter: '',
		},
	});

	const {
		alert,
		typeAlert,
		applications,
		websites,
		numberEdit,
		letterNumber,
		toggleFilter,
		filter,
		toggleModal,
		originalValues,
	} = adminValues;

	useEffect(() => {
		const fetchApp = async () => {
			const info = await loadApplications();
			if (info.success)
				setAdminValues((prev) => ({
					...prev,
					applications: info.info,
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

		const fetchWeb = async () => {
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

		fetchApp();
		fetchWeb();
	}, []);

	const setTimer = () => {
		let timer = setTimeout(() => {
			setAdminValues((prev) => ({
				...prev,
				alert: '',
				typeAlert: '',
			}));
			clear();
		}, 5000);

		const clear = () => {
			clearTimeout(timer);
		};
	};

	const onChange = (e, index) => {
		let newApplications = applications;

		newApplications[index] = {
			...newApplications[index],
			[e.target.name]: e.target.value,
		};
		setAdminValues({
			...adminValues,
			applications: newApplications,
		});
	};

	const onChangeFilter = (e) => {
		setAdminValues((prev) => ({
			...prev,
			filter: {
				...filter,
				[e.target.name]: e.target.value,
			},
		}));
	};

	const addNew = () => {
		const newApplication = {
			date: '',
			website: '',
			company: '',
			letter: '',
		};
		let newApplications = applications;
		newApplications.unshift(newApplication);

		setAdminValues({
			...adminValues,
			applications: newApplications,
			numberEdit: 0,
			originalValues: newApplication,
		});
	};

	const saveChanges = async (application) => {
		const res = await saveApplication(application);
		if (res.success) {
			let newApplications = applications;
			newApplications[numberEdit] = res.info;
			setAdminValues((prev) => ({
				...prev,
				numberEdit: null,
				alert: 'Changes saved',
				typeAlert: 'success',
				applications: newApplications,
			}));
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

	const deleteOneApplication = (index, item) => {
		let newApplications = applications;
		newApplications.splice(index, 1);
		setAdminValues({ ...adminValues, applications: newApplications });

		if (item._id) deleteApplication(item._id);
	};

	const setToggleModal = async (index) => {
		if (
			index !== undefined &&
			(applications[index].website === '' || applications[index].company === '')
		) {
			setAdminValues({
				...adminValues,
				alert:
					'Type the company name and website before adding the cover letter',
				typeAlert: 'danger',
			});
			setTimer();
		} else {
			let newApplications = [];
			if (numberEdit === index) {
				const newApp = await saveApplication(applications[index]);

				newApplications = applications;
				newApplications[index] = newApp.info;
			}
			setAdminValues((prev) => ({
				...prev,
				toggleModal: !toggleModal,
				...(index !== undefined && { letterNumber: index }),
				...(newApplications.length > 0 && { applications: newApplications }),
			}));
		}
	};

	const searchApps = async () => {
		const res = await loadApplications(filter);
		if (res.success) {
			setAdminValues((prev) => ({
				...prev,
				applications: res.info,
				toggleFilter: false,
			}));
		} else {
			console.log(res);
			setAdminValues({
				...adminValues,
				alert: res.info,
				typeAlert: 'danger',
				toggleFilter: false,
				applications: [],
			});
			setTimer();
		}
	};

	return (
		<>
			<h2 className='heading heading-secondary heading-filter text-secondary'>
				<span className='text'>Applications</span>
				<div className='underline'></div>
			</h2>
			<div className='filter-parent'>
				<button
					type='button'
					onClick={() =>
						setAdminValues((prev) => ({ ...prev, toggleFilter: !toggleFilter }))
					}
					className='btn'
				>
					<BiFilter className='heading-filter-icon' />
				</button>
				{toggleFilter && (
					<div className='filter'>
						<h3 className='text-centre text-tertiary'>Filter</h3>
						<form
							className='form'
							onSubmit={(e) => {
								e.preventDefault();
								searchApps();
							}}
						>
							<div className='form-item'>
								<input
									className='form-input'
									type='date'
									name='startDate'
									value={filter.startDate}
									id='startDate'
									onChange={(e) => onChangeFilter(e)}
								/>
								<label className='form-item-lbl' htmlFor='startDate'>
									From
								</label>
							</div>
							<div className='form-item'>
								<input
									className='form-input'
									type='date'
									name='endDate'
									id='endDate'
									value={filter.endDate}
									onChange={(e) => onChangeFilter(e)}
								/>
								<label className='form-item-lbl' htmlFor='endDate'>
									To
								</label>
							</div>
							<input
								className='form-input'
								type='text'
								placeholder='Company Name'
								name='company'
								value={filter.company}
								onChange={(e) => onChangeFilter(e)}
							/>
							<div className='form-group'>
								<select
									className='form-input'
									id='website'
									name='website'
									value={filter.website}
									onChange={(e) => onChangeFilter(e)}
								>
									<option value=''>* Select website</option>
									{websites.length > 0 &&
										websites.map((website, index) => (
											<option key={index} value={website._id}>
												{website.name}
											</option>
										))}
								</select>
							</div>
							<button className='btn search' type='submit'>
								<BiSearchAlt className='btn-icon' /> Search
							</button>
						</form>
					</div>
				)}
			</div>
			{toggleModal && letterNumber !== null && (
				<LetterPopup
					setToggleModal={setToggleModal}
					application={applications[letterNumber]}
					saveChanges={saveChanges}
					edit={numberEdit === letterNumber}
				/>
			)}

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
			<table className='table bigger'>
				<tbody>
					{applications.length > 0 &&
						applications.map((application, index) => (
							<tr key={index}>
								<td>
									{application.date !== '' ? (
										<Moment format='DD/MM' date={application.date} />
									) : (
										''
									)}
								</td>
								<td>
									<select
										name='website'
										disabled={numberEdit !== index}
										value={application.website}
										onChange={(e) => onChange(e, index)}
										id='website'
									>
										<option value=''>* Select website where applied</option>
										{websites.length > 0 &&
											websites.map((web, index) => (
												<option key={index} value={web._id}>
													{web.name}
												</option>
											))}
									</select>
								</td>
								<td>
									<input
										type='text'
										name='company'
										placeholder='Company Name'
										disabled={numberEdit !== index}
										value={application.company}
										onChange={(e) => onChange(e, index)}
									/>
								</td>
								<td>
									<button
										type='button'
										onClick={() => setToggleModal(index)}
										className='btn txt'
									>
										Cover letter
									</button>
								</td>
								{numberEdit === index ? (
									<>
										<td className='table-tdicon'>
											<button
												type='button'
												onClick={(e) => {
													e.preventDefault();
													saveChanges(application);
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
													let oldApplications = applications;
													oldApplications[index] = {
														...oldApplications[index],
														...originalValues,
													};
													setAdminValues({
														...adminValues,
														numberEdit: null,
														applications: oldApplications,
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
															website: application.website,
															company: application.company,
															letter: application.letter,
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
													deleteOneApplication(index, application);
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

export default Applications;
