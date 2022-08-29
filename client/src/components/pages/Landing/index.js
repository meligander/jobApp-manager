import React, { useState } from 'react';
import { IoArrowUndoSharp } from 'react-icons/io5';

import './style.scss';

const Landing = ({ history }) => {
	const [adminValues, setAdminValues] = useState({
		activeButton: false,
	});

	const { activeButton } = adminValues;

	const animateBtn = () => {
		setAdminValues((prev) => ({
			...prev,
			activeButton: true,
		}));
		setTimer();
	};

	const setTimer = () => {
		let timer = setTimeout(() => {
			setAdminValues((prev) => ({
				...prev,
				activeButton: false,
			}));
			clear();
			history.push('/applications');
		}, 700);

		const clear = () => {
			clearTimeout(timer);
		};
	};

	return (
		<div className='landing'>
			<div className='landing-center'>
				<h1 className='heading heading-primary'>Welcome</h1>
				<div className='text-centre'>
					<h3 className='landing-subtitle'>What are you waiting for??</h3>
					<IoArrowUndoSharp className='landing-arrowicon' />
					<button
						type='button'
						className={`btn landing ${activeButton ? 'animate' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							animateBtn();
						}}
					>
						Apply!
					</button>
				</div>
			</div>
		</div>
	);
};

export default Landing;
