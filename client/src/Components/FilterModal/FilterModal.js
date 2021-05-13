import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { X } from 'react-feather';
import './FilterModal.css';

const FilterModal = ({
	showConfirm,
	cancelConfirmHandler,
	saveConfirmHandler,
}) => {
	const [filterValue, setFilterValue] = useState({
		city: '',
		requirement: '',
	});

	const inputChangeHandler = (e) => {
		setFilterValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};
	const clearFilterHandler = (e) => {
		const field = e.target.id.split('-')[2];
		setFilterValue((prev) => ({ ...prev, [field]: '' }));
	};
	return (
		<Modal
			show={showConfirm}
			onCancel={cancelConfirmHandler}
			header="Select Filter"
			headerClass="status-update-header"
			footerClass="status-update-footer"
			footer={
				<React.Fragment>
					<Button inverse onClick={cancelConfirmHandler}>
						CANCEL
					</Button>
					<Button onClick={() => saveConfirmHandler(filterValue)}>SAVE</Button>
				</React.Fragment>
			}
		>
			<div className="status-update-input-container">
				<span className="filter-label">City</span>
				<input
					id="city"
					className="status-update-input-text"
					onChange={inputChangeHandler}
					value={filterValue.city}
				/>
				<div
					id="close-city"
					className="clear-icon-container"
					onClick={clearFilterHandler}
				>
					<X id="close-icon-city" className="clear-icon" />
				</div>
			</div>
			<div className="status-update-input-container">
				<span className="filter-label">Requirement</span>
				<input
					id="requirement"
					className="status-update-input-text"
					onChange={inputChangeHandler}
					value={filterValue.requirement}
				/>
				<div
					id="close-requirement"
					className="clear-icon-container"
					onClick={clearFilterHandler}
				>
					<X id="close-icon-requirement" className="clear-icon" />
				</div>
			</div>

			<div className="status-update-divider"></div>
		</Modal>
	);
};

export default FilterModal;
