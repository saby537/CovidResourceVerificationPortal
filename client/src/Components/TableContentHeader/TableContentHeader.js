import React from 'react';
import '../TabbedContent/TabbedContent.css';
import './TableContentHeader.css';

const TableContentHeader = () => {
	return (
		<div className="table-header-container">
			<div className="table-header-col">Source</div>
			<div className="table-header-col">Time</div>
			<div className="table-header-col">Message</div>
			<div className="table-header-col">Item</div>
			<div className="table-header-col">Location</div>
			<div className="table-header-col">Name</div>
			<div className="table-header-col">Contact</div>
			<div className="table-header-col">Remarks</div>
			<div className="table-header-col">Link</div>
			<div className="table-header-col">Action</div>
		</div>
	);
};

export default TableContentHeader;
