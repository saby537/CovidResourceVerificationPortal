import React, { useEffect } from 'react';
import TableContentHeader from '../TableContentHeader/TableContentHeader';
import TableContentEntry from '../TableContentEntry/TableContentEntry';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectLoading,
	selectResources,
	selectFilter,
} from '../../redux/requests/requests.selector';
import { selectUsername } from '../../redux/user/user.selector';
import { getRequestsStart } from '../../redux/requests/requests.actions';

import './TabbedContent.css';

const TabbedContent = ({
	id,
	resourcesQueue,
	isLoading,
	fetchResources,
	username,
	filter,
}) => {
	useEffect(() => {
		const getRequests = async () => {
			await fetchResources({ name: username, status: id, filter });
		};
		getRequests();
	}, [fetchResources, id, username, filter]);
	//console.log(resourcesQueue);
	return (
		<div className="tabbed-content-container">
			<div className="content-table">
				<TableContentHeader selected={id} />
				{isLoading || resourcesQueue === null ? (
					<LoadingSpinner asOverlay />
				) : (
					<div className="table-content-entry-container">
						{resourcesQueue.map((entry, i) => (
							<TableContentEntry key={i} entry={entry} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isLoading: selectLoading,
	resourcesQueue: selectResources,
	username: selectUsername,
	filter: selectFilter,
});

const mapDispatchToProps = (dispatch) => ({
	fetchResources: (data) => dispatch(getRequestsStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TabbedContent);
