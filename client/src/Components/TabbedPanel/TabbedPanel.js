import React, { useState } from 'react';
import { Filter } from 'react-feather';
import { withRouter, useHistory } from 'react-router-dom';
import TabbedContent from '../../Components/TabbedContent/TabbedContent';
import FilterModal from '../FilterModal/FilterModal';
import { connect } from 'react-redux';
import { addFilter } from '../../redux/requests/requests.actions';

import './TabbedPanel.css';

const TabbedPanel = ({ match, filterAdd }) => {
	const [show, setShow] = useState(false);
	const headerIndex = match.params.tab;
	const hist = useHistory();
	const headerClickHandler = (event) => {
		event.preventDefault();
		const id = event.target.id;
		hist.push(`/verify/${id}`);
	};
	const cancelConfirmHandler = () => {
		setShow(false);
	};
	const saveConfirmHandler = (filter) => {
		setShow(false);
		if (filter !== '') {
			filterAdd(filter);
		}
	};
	return (
		<div className="tabbed-panel-container">
			<FilterModal
				showConfirm={show}
				cancelConfirmHandler={cancelConfirmHandler}
				saveConfirmHandler={saveConfirmHandler}
			/>
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
				<div className="tab-icons">
					<Filter className="tab-icon" onClick={() => setShow(true)} />
				</div>
			</div>
			<TabbedContent id={headerIndex} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	filterAdd: (data) => dispatch(addFilter(data)),
});
export default connect(null, mapDispatchToProps)(withRouter(TabbedPanel));
