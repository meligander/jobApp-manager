import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../img/logo.png';
import './style.scss';

const Nabvar = ({ onChange }) => {
	const ref = useRef(0);

	useEffect(() => {
		setTimeout(() => {
			onChange(ref.current.offsetHeight, 'navbar');
		}, 60);
		// eslint-disable-next-line
	}, []);

	return (
		<nav ref={ref} className='navbar'>
			<Link className='navbar-homebtn' to='/'>
				<div className='navbar-homebtn-logo'>
					<img src={logo} alt='logo' />
				</div>
				<p className='navbar-homebtn-title'>Job Application Manager</p>
			</Link>
			<div className='navbar-links'>
				<Link className='navbar-links-btn' to='/applications'>
					<svg>
						<polyline points='141,0 141,43 0,43 0,0 141,0' />
					</svg>
					<span>Applications</span>
				</Link>
				<Link className='navbar-links-btn' to='/websites'>
					<svg>
						<polyline points='141,0 141,43 0,43 0,0 141,0' />
					</svg>
					<span>Websites</span>
				</Link>
			</div>
		</nav>
	);
};

export default Nabvar;
