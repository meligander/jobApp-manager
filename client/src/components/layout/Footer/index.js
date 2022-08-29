import React, { useRef, useEffect } from 'react';

import './style.scss';

const Footer = ({ onChange }) => {
	const ref = useRef(0);

	useEffect(() => {
		setTimeout(() => {
			onChange(ref.current.offsetHeight, 'footer');
		}, 60);
		// eslint-disable-next-line
	}, []);

	return (
		<footer ref={ref} className='footer'>
			Job Application Manager &reg; {new Date().getFullYear()} All Rights
			Reserved
		</footer>
	);
};

export default Footer;
