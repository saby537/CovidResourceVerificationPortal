import React, { useEffect, useState } from 'react';
import { XCircle, CheckCircle, Edit, HelpCircle } from 'react-feather';
import StatusUpdateModal from '../StatusUpdateModal/StatusUpdateModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectLoading,
	selectFilter,
} from '../../redux/requests/requests.selector';
import { selectUsername } from '../../redux/user/user.selector';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {
	updateStatusStart,
	editRequestsStart,
} from '../../redux/requests/requests.actions';
import '../TabbedContent/TabbedContent.css';
import './TableContentEntry.css';

const TableContentEntry = ({
	entry,
	updateResourceStatus,
	isLoading,
	username,
	editRequests,
	filter,
}) => {
	//	const hist = useHistory();
	const [edit, setEdit] = useState(false);
	const [show, setShow] = useState(false);
	const [status, setStatus] = useState('');
	const [values, setValues] = useState({
		id: entry.id,
		message: entry.message,
		provider: entry.provider,
		requirement_list: entry.requirement_list,
		city: entry.city,
		validation_details:
			entry.validation_details == null ? '' : entry.validation_details,
		phone_number: entry.phone_number,
	});
	const editClickHandler = async () => {
		setEdit((prev) => !prev);
		if (edit === true) {
			await editRequests(values);
		}
	};
	const statusClickHandler = (e) => {
		setShow(true);
		setStatus(e.target.id);
	};
	const cancelConfirmHandler = () => {
		setShow(false);
	};
	const saveConfirmHandler = async (remarks, isresolve) => {
		remarks = values.validation_details + ' ' + remarks;
		await updateResourceStatus({
			name: username,
			id: entry.id,
			status: status,
			remarks: remarks,
			filter,
		});
	};

	const onChangeHandler = (e) => {
		//console.log(e.target.value, e.target.id);
		let tval = e.target.id.split('-')[1];
		setValues({
			...values,
			[tval]: e.target.value,
		});
	};
	//console.log(values);
	const date = new Date(entry.time);
	const timeTweet =
		date.getDate() +
		'/' +
		(date.getMonth() + 1) +
		'/' +
		date.getFullYear() +
		' ' +
		date.getHours() +
		':' +
		date.getMinutes() +
		':' +
		date.getSeconds();

	useEffect(() => {
		const id = `${entry.id}-message`;
		let elem = document.getElementById(id);
		while (elem.clientHeight < elem.scrollHeight) {
			elem.rows++;
		}
		//	console.log(elem.rows);
	}, [values.message, entry.id]);

	return (
		<div>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && (
				<div className="table-entry-container">
					<StatusUpdateModal
						showConfirm={show && status !== ''}
						cancelConfirmHandler={cancelConfirmHandler}
						saveConfirmHandler={saveConfirmHandler}
						status={status}
					/>
					<div className="table-entry-col">
						<img
							src="../../assets/twitter-icon.png"
							alt="twitter-icon"
							style={{ width: '70%', padding: '8px 4px' }}
						/>
					</div>
					<div className="table-entry-col" style={{ padding: '8px 4px' }}>
						{timeTweet}
					</div>
					<div id="message-div" className="table-entry-col">
						<textarea
							id={`${entry.id}-message`}
							value={values.message}
							className="table-entry-input-value"
							onChange={onChangeHandler}
							rows={3}
							disabled={!edit}
						/>
					</div>
					<div id="requirement_list" className="table-entry-col">
						<textarea
							id={`${entry.id}-requirement_list	`}
							value={values.requirement_list}
							className="table-entry-input-value"
							onChange={onChangeHandler}
							rows={3}
							disabled={!edit}
						/>
					</div>
					<div id="city" className="table-entry-col">
						<textarea
							id={`${entry.id}-city`}
							value={values.city}
							className="table-entry-input-value"
							onChange={onChangeHandler}
							rows={3}
							disabled={!edit}
						/>
					</div>
					<div id="provider" className="table-entry-col">
						<textarea
							id={`${entry.id}-provider`}
							value={values.provider}
							className="table-entry-input-value"
							onChange={onChangeHandler}
							rows={3}
							disabled={!edit}
						/>
					</div>
					<div id="phone_number" className="table-entry-col">
						<textarea
							id={`${entry.id}-phone_number`}
							value={values.phone_number}
							className="table-entry-input-value"
							onChange={onChangeHandler}
							rows={3}
							disabled={!edit}
						/>
					</div>
					<div id="validation_details" className="table-entry-col">
						<textarea
							id={`${entry.id}-validation_details`}
							value={values.validation_details}
							className="table-entry-input-value"
							onChange={onChangeHandler}
							rows={3}
							disabled={!edit}
						/>
					</div>
					<div className="table-entry-col">
						<div className="table-entry-icon-container">
							<CheckCircle
								id="accepted"
								className={`table-entry-icon ${
									entry.validation_status !== '1' &&
									entry.validation_status !== '0' &&
									'table-entry-icon-deactivate'
								}`}
								style={{
									backgroundColor: `${
										entry.validation_status === '0' ||
										entry.validation_status === '1' ||
										entry.validation_status == null
											? '#228c22'
											: ''
									}`,
								}}
								onClick={statusClickHandler}
							/>
							<XCircle
								id="rejected"
								className={`table-entry-icon ${
									entry.validation_status !== '3' &&
									entry.validation_status !== '0' &&
									'table-entry-icon-deactivate'
								}`}
								style={{
									backgroundColor: `${
										entry.validation_status === '0' ||
										entry.validation_status === '3' ||
										entry.validation_status == null
											? 'red'
											: ''
									}`,
								}}
								onClick={statusClickHandler}
							/>
							<HelpCircle
								id="tentative"
								className={` table-entry-icon ${
									entry.validation_status !== '2' &&
									entry.validation_status !== '0' &&
									'table-entry-icon-deactivate'
								}`}
								style={{
									backgroundColor: `${
										entry.validation_status === '0' ||
										entry.validation_status === '2' ||
										entry.validation_status == null
											? '#f8b195'
											: ''
									}`,
								}}
								onClick={statusClickHandler}
							/>
							<Edit
								className={` table-entry-icon ${
									entry.validation_status === '0' ||
									entry.validation_status == null
										? 'table-entry-edit-icon'
										: 'table-entry-icon-deactivate'
								}`}
								style={{
									backgroundColor: `${edit ? '#1b047c' : ''}`,
									color: `${edit ? 'white' : ''}`,
								}}
								onClick={editClickHandler}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isLoading: selectLoading,
	username: selectUsername,
	filter: selectFilter,
});

const mapDispatchToProps = (dispatch) => ({
	updateResourceStatus: (data) => dispatch(updateStatusStart(data)),
	editRequests: (data) => dispatch(editRequestsStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TableContentEntry);
