import React from 'react';

import spinner from '../../../img/spinner.gif';
import './style.scss';

const Spinner = () => {
	return (
		<div className='spinner'>
			<img src={spinner} alt='Spinner' />
		</div>
	);
};

export default Spinner;
