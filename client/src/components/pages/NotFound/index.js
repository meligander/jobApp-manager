import React from 'react';
import { ImCross } from 'react-icons/im';

import './style.scss';

const NotFount = () => {
	return (
		<div className='not-found'>
			<h1 className='not-found-title'>
				Page Not Found <ImCross className='not-found-icon' />
			</h1>
		</div>
	);
};

export default NotFount;
