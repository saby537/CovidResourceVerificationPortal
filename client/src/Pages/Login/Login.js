import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Components/ErrorModal/ErrorModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectError, selectLoading } from '../../redux/user/user.selector.js';
import {
	logInStart,
	emptyError,
	signUpStart,
} from '../../redux/user/user.actions';

import './Login.css';

const Login = ({
	startLogIn,
	isLoading,
	loginError,
	clearError,
	startSignUp,
}) => {
	const [password, setPassword] = useState({
		isValid: false,
		value: '',
		error: '',
	});
	const [username, setUsername] = useState({
		isValid: false,
		value: '',
		error: '',
	});
	const [email, setEmail] = useState({
		isValid: false,
		value: '',
		error: '',
	});
	const [city, setCity] = useState('');
	const [isSignUp, setSignUp] = useState(false);
	const submitHandler = async () => {
		if (isSignUp) {
			await startSignUp({ username, email, password, city });
		} else {
			await startLogIn({ username, password });
		}
	};

	const usernameChangeHandler = (e) => {
		let isValid = true;
		let error = '';
		if (e.target.value.indexOf(' ') >= 0) {
			isValid = false;
			error = 'No spaces allowed';
		}
		setUsername((prev) => ({
			error: error,
			value: e.target.value,
			isValid: isValid,
		}));
	};

	const passwordChangeHandler = (e) => {
		setPassword((prev) => ({ ...prev, value: e.target.value, isValid: true }));
	};

	const emailChangeHandler = (e) => {
		setEmail((prev) => ({ ...prev, value: e.target.value, isValid: true }));
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
							{username.error !== '' && (
								<label className="login-input-error-label">
									{username.error}
								</label>
							)}
						</div>
						{isSignUp && (
							<div className="login-input-container">
								<label className="login-input-label">Email</label>
								<input
									className="login-input"
									type="text"
									value={email.value}
									onChange={emailChangeHandler}
								/>
								{email.error !== '' && (
									<label className="login-input-error-label">
										{email.error}
									</label>
								)}
							</div>
						)}
						<div className="login-input-container">
							<label className="login-input-label">Password</label>
							<input
								className="login-input"
								type="password"
								value={password.value}
								onChange={passwordChangeHandler}
							/>
							{password.error !== '' && (
								<label className="login-input-error-label">
									{password.error}
								</label>
							)}
						</div>
						{isSignUp && (
							<div className="login-input-container">
								<label className="login-input-label">
									Preferred City
									<span style={{ fontSize: '12px' }}>
										{' '}
										(Enter only one city)
									</span>
								</label>
								<input
									className="login-input"
									type="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
								/>
							</div>
						)}
						<Button
							onClick={submitHandler}
							disabled={
								!password.isValid ||
								!username.isValid ||
								(isSignUp && !email.isValid)
							}
						>
							{isSignUp ? 'Sign Up' : 'Login'}
						</Button>
						<div className="join-us-container">
							<span>{isSignUp ? 'Already a user ' : 'Want to '}</span>
							<span
								className="join-us"
								onClick={() => setSignUp((prev) => !prev)}
							>
								{isSignUp ? 'Log In' : 'Join Us?'}
							</span>
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
	startSignUp: (data) => dispatch(signUpStart(data)),
	clearError: () => dispatch(emptyError()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
