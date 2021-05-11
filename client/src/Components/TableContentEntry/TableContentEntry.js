import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { XCircle, CheckCircle, Edit, HelpCircle } from 'react-feather';
import StatusUpdateModal from '../StatusUpdateModal/StatusUpdateModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLoading } from '../../redux/requests/requests.selector';
import { selectUsername } from '../../redux/user/user.selector';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { updateStatusStart } from '../../redux/requests/requests.actions';
import '../TabbedContent/TabbedContent.css';
import './TableContentEntry.css';

const TableContentEntry = ({
	entry,
	updateResourceStatus,
	isLoading,
	username,
}) => {
	//	const hist = useHistory();
	const [edit, setEdit] = useState(false);
	const [show, setShow] = useState(false);
	const [status, setStatus] = useState('');
	const editClickHandler = () => {
		setEdit((prev) => !prev);
	};
	const statusClickHandler = (e) => {
		setShow(true);
		setStatus(e.target.id);
	};
	const cancelConfirmHandler = () => {
		setShow(false);
	};
	const saveConfirmHandler = async (remarks, isresolve) => {
		await updateResourceStatus({
			name: username,
			id: entry.id,
			status: status,
			remarks: remarks,
		});
	};
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
	return (
		<div>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && (
				<div className="table-entry-container">
					<StatusUpdateModal
						showConfirm={show && status !== ''}
						cancelConfirmHandler={cancelConfirmHandler}
						saveConfirmHandler={saveConfirmHandler}
					/>
					<div className="table-entry-col">
						<img
							src="../../assets/twitter-icon.png"
							alt="twitter-icon"
							style={{ width: '70%' }}
						/>
					</div>
					<div className="table-entry-col">{timeTweet}</div>
					<div className="table-entry-col" contentEditable={edit}>
						{entry.message}
					</div>
					<div className="table-entry-col" contentEditable={edit}>
						{entry.requirement_list}
					</div>
					<div className="table-entry-col" contentEditable={edit}>
						{entry.city}
					</div>
					<div className="table-entry-col" contentEditable={edit}>
						{entry.provider}
					</div>
					<div className="table-entry-col" contentEditable={edit}>
						{entry.phone_number}
					</div>
					<div className="table-entry-col" contentEditable={edit}>
						{entry.validation_details}
					</div>
					<div className="table-entry-col"></div>
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
									entry.validation_status === '0'
										? 'table-entry-icon-original'
										: 'table-entry-icon-deactivate'
								}`}
								style={{
									backgroundColor: `${
										entry.validation_status === '0' ||
										entry.validation_status == null
											? '#00bfff'
											: ''
									}`,
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
});

const mapDispatchToProps = (dispatch) => ({
	updateResourceStatus: (data) => dispatch(updateStatusStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TableContentEntry);
