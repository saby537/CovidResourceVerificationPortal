import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFilter } from '../../redux/requests/requests.selector';
import { Filter } from 'react-feather';
import '../TabbedContent/TabbedContent.css';
import './TableContentHeader.css';

const TableContentHeader = ({ filter, selected }) => {
	//console.log(filter);
	return (
		<div className="table-header-container">
			<div className="table-header-col">Source</div>
			<div className="table-header-col">Time</div>
			<div className="table-header-col">Message</div>
			<div className="table-header-col table-header-filter">
				<span style={{ width: '100%' }}>Requirement</span>
				{filter !== '' &&
					selected === 'requests' &&
					filter.requirement !== '' && (
						<Filter style={{ height: '70%', marginRight: '5px' }} />
					)}
			</div>
			<div className="table-header-col table-header-filter">
				<span style={{ width: '100%' }}>City</span>
				{filter !== '' && selected === 'requests' && filter.city !== '' && (
					<Filter style={{ height: '70%', marginRight: '5px' }} />
				)}
			</div>
			<div className="table-header-col">Name</div>
			<div className="table-header-col">Contact</div>
			<div className="table-header-col">Remarks</div>
			<div className="table-header-col">Action</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	filter: selectFilter,
});

export default connect(mapStateToProps)(TableContentHeader);
