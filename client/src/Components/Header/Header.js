import React from 'react';
import { withRouter } from 'react-router-dom';
import './Header.css';

const Header = ({ location }) => {
	return (
		<div className="header-container">
			<div
				className="header-title"
				style={{
					textAlign: `${location.pathname === '/login' ? 'center' : 'left'}`,
				}}
			>
				Covid Resource Verification Portal
			</div>
			{location.pathname !== '/login' && (
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
					/>
				</div>
			)}
		</div>
	);
};

export default withRouter(Header);
