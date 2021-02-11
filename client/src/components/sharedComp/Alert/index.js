import React from 'react';

import './style.scss';

const Alert = ({ msg, type }) => (
	<React.Fragment>
		<div className={`alert alert-${type}`}>{msg}</div>
	</React.Fragment>
);

export default Alert;
