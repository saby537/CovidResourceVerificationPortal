import React, { useEffect } from 'react';
import TableContentHeader from '../TableContentHeader/TableContentHeader';
import TableContentEntry from '../TableContentEntry/TableContentEntry';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectLoading,
	selectResources,
} from '../../redux/requests/requests.selector';
import { getRequestsStart } from '../../redux/requests/requests.actions';

import './TabbedContent.css';

const TabbedContent = ({ id, resourcesQueue, isLoading, fetchResources }) => {
	useEffect(() => {
		const getRequests = async () => {
			await fetchResources({ name: 'Saby', status: id });
		};
		getRequests();
	}, [fetchResources, id]);
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
});

const mapDispatchToProps = (dispatch) => ({
	fetchResources: (data) => dispatch(getRequestsStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TabbedContent);
