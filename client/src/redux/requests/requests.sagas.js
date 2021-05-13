import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	getRequestsSuccess,
	getRequestsFailure,
	updateStatusSuccess,
	updateStatusFailure,
	getRequestsStart,
	editRequestsSuccess,
	editRequestsFailure,
} from './requests.actions';
import requestsActionTypes from './requests.types';

export function* getRequests({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		//console.log(payload);
		const { name, status, filter } = payload;
		const reqBody = { name, status, filter };
		const res = yield fetch(`/api/requests`, {
			method: 'PATCH',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		console.log(responseData);
		if (!res.ok) {
			yield put(getRequestsFailure(responseData.errors));
		} else {
			yield put(getRequestsSuccess(responseData.resources));
		}
	} catch (err) {
		console.log('error');
		yield put(getRequestsFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onGetRequests() {
	yield takeLatest(requestsActionTypes.GET_REQUESTS_START, getRequests);
}

export function* updateStatus({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		console.log(payload);
		const { id, status, name, remarks, filter } = payload;
		const reqBody = { id, status, remarks };
		const res = yield fetch(`/api/request`, {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		console.log(responseData);
		if (!res.ok) {
			yield put(updateStatusFailure(responseData.errors));
		} else {
			yield put(updateStatusSuccess(responseData.resources));
			yield put(getRequestsStart({ name, status: 'requests', filter }));
		}
	} catch (err) {
		console.log('error');
		yield put(updateStatusFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onUpdateStatus() {
	yield takeLatest(requestsActionTypes.UPDATE_STATUS_START, updateStatus);
}

export function* editRequests({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		console.log(payload);
		const {
			id,
			message,
			provider,
			requirement_list,
			city,
			validation_details,
			phone_number,
		} = payload;
		const reqBody = {
			id,
			message,
			provider,
			requirement_list,
			city,
			validation_details,
			phone_number,
		};
		const res = yield fetch(`/api/requests/edit`, {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		console.log(responseData);
		if (!res.ok) {
			yield put(editRequestsFailure(responseData.errors));
		} else {
			yield put(editRequestsSuccess(payload));
		}
	} catch (err) {
		console.log('error');
		yield put(editRequestsFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onEditRequests() {
	yield takeLatest(requestsActionTypes.EDIT_REQUESTS_START, editRequests);
}

export function* requestsSagas() {
	yield all([call(onGetRequests), call(onUpdateStatus), call(onEditRequests)]);
}
