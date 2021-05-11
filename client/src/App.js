import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './Components/Header/Header';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
import { selectUsername } from './redux/user/user.selector';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import './App.css';
import Login from './Pages/Login/Login.js';
import Verification from './Pages/Verification/Verification.js';

function App({ username }) {
	let LoggedInRoute = () => (
		<Switch>
			<ErrorBoundary>
				<Suspense fallback={<LoadingSpinner />}>
					<Route exact path="/login" component={Login} />
					<Redirect to="/login" />
				</Suspense>
			</ErrorBoundary>
		</Switch>
	);
	if (username) {
		LoggedInRoute = () => (
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<LoadingSpinner asOverlay />}>
						<Route exact path="/verify/:tab" component={Verification} />
						<Redirect to="/verify/requests" />
					</Suspense>
				</ErrorBoundary>
			</Switch>
		);
	}
	return (
		<div className="App">
			<Header />
			<LoggedInRoute />
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	username: selectUsername,
});
export default connect(mapStateToProps, null)(App);
