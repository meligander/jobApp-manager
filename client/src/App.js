import React from 'react';
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
	return (
		<>
			<Navbar />
			<section className='container'>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/applications' component={Applications} />
					<Route exact path='/websites' component={Websites} />
					<Route component={NotFound} />
				</Switch>
			</section>
			<Footer />
		</>
	);
};

export default App;
