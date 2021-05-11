import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import './Login.css';

const Login = () => {
	const hist = useHistory();
	const [error, setError] = useState(null);
	const [password, setPassword] = useState({
		isValid: false,
		value: '',
	});
	const [username, setUsername] = useState({
		isValid: false,
		value: '',
	});
	const submitHandler = () => {
		if (username.value === 'test@gmail.com' && password.value === 'Test@123') {
			hist.push('/verify/requests');
		} else {
			setError('Invalid Username or Password');
		}
	};

	const usernameChangeHandler = (e) => {
		setUsername({ value: e.target.value, isValid: true });
	};

	const passwordChangeHandler = (e) => {
		setPassword({ value: e.target.value, isValid: true });
	};

	return (
		<div className="login-container">
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
				{error && <label className="login-error">{error}</label>}
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
	);
};

export default Login;
