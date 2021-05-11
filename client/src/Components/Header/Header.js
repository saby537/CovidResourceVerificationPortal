import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectLoading,
	selectUsername,
} from '../../redux/user/user.selector.js';
import { logOutStart } from '../../redux/user/user.actions';
import './Header.css';

const Header = ({ username, isLoading, startLogOut }) => {
	const logOutHandler = async () => {
		await startLogOut();
	};
	return (
		<div>
			{isLoading ? (
				<LoadingSpinner asOverlay />
			) : (
				<div className={`header-container ${username && 'logged-in'}`}>
					<div
						className="header-title"
						style={{
							justifyContent: `${username ? 'flex-start' : 'center'}`,
						}}
					>
						<div className="header-icon-container">
							<img
								src="../../assets/logo_white.png"
								alt="logo_white"
								className="header-icon"
							/>
						</div>
						Covid Resource Verification Portal
					</div>
					{username != null && (
						<div className="header-options">
							<img
								src="../../assets/guidelines_icon.png"
								className="header-icon"
								alt="guidelines"
							/>
							<img
								src="../../assets/logout-icon.png"
								className="header-icon"
								alt="logout"
								onClick={logOutHandler}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isLoading: selectLoading,
	username: selectUsername,
});

const mapDispatchToProps = (dispatch) => ({
	startLogOut: (data) => dispatch(logOutStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
