import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

//Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

//Pages
import Landing from './components/pages/Landing';
import Websites from './components/pages/Websites';
import Applications from './components/pages/Applications';
import NotFound from './components/pages/NotFound';

import './style/main.scss';

const App = () => {
	const height = window.innerHeight;

	const [adminValues, setAdminValues] = useState({
		navbar: 0,
		footer: 0,
	});

	const { navbar, footer } = adminValues;

	const onChange = (value, type) => {
		setAdminValues((prev) => ({ ...prev, [type]: value }));
	};

	return (
		<>
			<Navbar onChange={onChange} />
			<section
				className='container'
				style={{ minHeight: height - navbar - footer + 1 }}
			>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/applications' component={Applications} />
					<Route exact path='/websites' component={Websites} />
					<Route component={NotFound} />
				</Switch>
			</section>
			<Footer onChange={onChange} />
		</>
	);
};

export default App;
