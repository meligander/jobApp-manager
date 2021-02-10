import React from 'react';

const Alert = ({ alert }) => (
	<React.Fragment>
		<div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
	</React.Fragment>
);

export default Alert;
