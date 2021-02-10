import React, { useEffect, useState } from 'react';
import { loadWebsites } from '../../../request/website';

import Alert from '../../sharedComp/Alert';

const Websites = () => {
	const [alert, setAlert] = useState('');

	const [websites, setWebsites] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			const info = await loadWebsites();
			if (info.success) setWebsites(info.info);
			else setAlert(info.info);
		};

		fetch();
	}, []);

	return (
		<>
			{alert !== '' && <Alert alert={alert} />}
			<h2>Websites</h2>
			{websites.length > 0 &&
				websites.map((website, index) => (
					<div key={index}>
						<h4>{website.name}</h4>
						<p>{website.url}</p>
					</div>
				))}
		</>
	);
};

export default Websites;
