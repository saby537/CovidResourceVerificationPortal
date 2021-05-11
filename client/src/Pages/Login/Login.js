import React, { useEffect, useState } from 'react';
import Button from '../../Components/Button/Button';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Components/ErrorModal/ErrorModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectError, selectLoading } from '../../redux/user/user.selector.js';
import { logInStart, emptyError } from '../../redux/user/user.actions';

import './Login.css';

const Login = ({ startLogIn, isLoading, loginError, clearError }) => {
	const [password, setPassword] = useState({
		isValid: false,
		value: '',
	});
	const [username, setUsername] = useState({
		isValid: false,
		value: '',
	});
	const submitHandler = async () => {
		await startLogIn({ username, password });
	};

	const usernameChangeHandler = (e) => {
		setUsername({ value: e.target.value, isValid: true });
	};

	const passwordChangeHandler = (e) => {
		setPassword({ value: e.target.value, isValid: true });
	};

	return (
		<div>
			{isLoading ? (
				<LoadingSpinner asOverlay />
			) : (
				<div className="login-container">
					<ErrorModal error={loginError} onClear={clearError} />
					<div className="login-card">
						<div className="login-input-container">
							<label className="login-input-label">Username</label>
							<input
								className="login-input"
								type="text"
								value={username.value}
								onChange={usernameChangeHandler}
							/>
						</div>
						<div className="login-input-container">
							<label className="login-input-label">Password</label>
							<input
								className="login-input"
								type="password"
								value={password.value}
								onChange={passwordChangeHandler}
							/>
						</div>
						<Button
							onClick={submitHandler}
							disabled={!password.isValid || !username.isValid}
						>
							Login
						</Button>
						<div className="join-us-container">
							<span>Want to</span>
							<span className="join-us"> Join Us?</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isLoading: selectLoading,
	loginError: selectError,
});

const mapDispatchToProps = (dispatch) => ({
	startLogIn: (data) => dispatch(logInStart(data)),
	clearError: () => dispatch(emptyError()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
