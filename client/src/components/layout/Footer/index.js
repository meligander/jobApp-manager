import React from 'react';

import './style.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			Job Application Manager &reg; {new Date().getFullYear()} All Rights
			Reserved
		</footer>
	);
};

export default Footer;
