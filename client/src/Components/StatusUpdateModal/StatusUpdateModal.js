import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import './StatusUpdateModal.css';

const StatusUpdateModal = ({
	showConfirm,
	cancelConfirmHandler,
	saveConfirmHandler,
	status,
}) => {
	const [remarks, setRemarks] = useState('');
	const [isresolve, setResolve] = useState(false);

	const remarkChangeHandler = (e) => {
		setRemarks(e.target.value);
	};

	const resolveHandler = (e) => {
		setResolve(e.target.checked);
	};
	return (
		<Modal
			show={showConfirm}
			onCancel={cancelConfirmHandler}
			header="Are you sure?"
			headerClass="status-update-header"
			footerClass="status-update-footer"
			footer={
				<React.Fragment>
					<Button inverse onClick={cancelConfirmHandler}>
						CANCEL
					</Button>
					<Button onClick={() => saveConfirmHandler(remarks, isresolve)}>
						SAVE
					</Button>
				</React.Fragment>
			}
		>
			<div className="status-update-input-container">
				<div className="status-update-input-label">
					<span>Remark</span>
					<span className="sub-head">(Not Mandatory)</span>
				</div>
				<textarea
					className="status-update-input-text"
					rows={4}
					value={remarks}
					onChange={remarkChangeHandler}
				/>
			</div>
			{status === 'tentative' && (
				<div className="status-update-input-container">
					<span className="status-update-input-label">Auto-Reject</span>
					<label className="switch">
						<input type="checkbox" onChange={resolveHandler} />
						<span className="slider round"></span>
					</label>
				</div>
			)}
			<div className="status-update-divider"></div>
		</Modal>
	);
};

export default StatusUpdateModal;
