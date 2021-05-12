import React from 'react';
import { RefreshCcw } from 'react-feather';
import { withRouter, useHistory } from 'react-router-dom';
import TabbedContent from '../../Components/TabbedContent/TabbedContent';
import './TabbedPanel.css';

const TabbedPanel = ({ match }) => {
	const headerIndex = match.params.tab;
	const hist = useHistory();
	const headerClickHandler = (event) => {
		event.preventDefault();
		const id = event.target.id;
		hist.push(`/verify/${id}`);
	};
	return (
		<div className="tabbed-panel-container">
			<div className="tabbed-panel-toprow">
				<div className="tab-headers-container">
					<div
						id="requests"
						className={`tab-header ${headerIndex === 'requests' && 'active'}`}
						onClick={headerClickHandler}
					>
						Requests
					</div>
					<div
						id="tentative"
						className={`tab-header ${headerIndex === 'tentative' && 'active'}`}
						onClick={headerClickHandler}
					>
						Tentative
					</div>
					<div
						id="accepted"
						className={`tab-header ${headerIndex === 'accepted' && 'active'}`}
						onClick={headerClickHandler}
					>
						Accepted
					</div>
					<div
						id="rejected"
						className={`tab-header ${headerIndex === 'rejected' && 'active'}`}
						onClick={headerClickHandler}
					>
						Rejected
					</div>
				</div>
				{/* <div className="tab-icons">
					<RefreshCcw className="tab-icon" />
				</div> */}
			</div>
			<TabbedContent id={headerIndex} />
		</div>
	);
};

export default withRouter(TabbedPanel);
