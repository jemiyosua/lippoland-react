import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import TentangKami from '../../pages/TentangKami';
import Login from '../../admin/pages/Login';
import MainApp from '../../admin/pages/MainApp';
import CommingSoon from '../../pages/CommingSoon';
// import MainApp from '../../pages/MainApp';

const Routes = () => {
    return (
		<BrowserRouter>
			<Switch>
				<Route path='/admin/Login'>
					<Login />
				</Route>
				<Route exact path="/admin/dashboard">
					<MainApp />
				</Route>
				<Route exact path="/admin/hero-home">
					<MainApp />
				</Route>
				<Route exact path="/admin/dev-section">
					<MainApp />
				</Route>
				<Route exact path="/admin/our-products">
					<MainApp />
				</Route>
				<Route exact path="/admin/upcoming-project">
					<MainApp />
				</Route>
				<Route exact path="/admin/company-overview">
					<MainApp />
				</Route>
				<Route exact path="/admin/statistic">
					<MainApp />
				</Route>
				<Route exact path="/admin/vision-mission">
					<MainApp />
				</Route>
				<Route exact path="/admin/leadership-initiatives">
					<MainApp />
				</Route>
				<Route exact path="/admin/awards">
					<MainApp />
				</Route>
				<Route exact path="/admin/core-values">
					<MainApp />
				</Route>
				<Route exact path="/admin/header-logo">
					<MainApp />
				</Route>
				<Route exact path="/admin/header-menu">
					<MainApp />
				</Route>
				<Route path='/tentang-kami'>
					<TentangKami />
				</Route>
				<Route path='/comming-soon'>
					<CommingSoon />
				</Route>
				<Route path='/'>
					<Home/>
				</Route>
			</Switch>
		</BrowserRouter>
    )
}

export default Routes;