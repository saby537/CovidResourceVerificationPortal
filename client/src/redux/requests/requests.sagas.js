import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	getRequestsSuccess,
	getRequestsFailure,
	updateStatusSuccess,
	updateStatusFailure,
	getRequestsStart,
} from './requests.actions';
import requestsActionTypes from './requests.types';

export function* getRequests({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		//console.log(payload);
		const res = yield fetch(`/api/requests/${payload.name}/${payload.status}`, {
			method: 'GET',
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
		//console.log(payload);
		const { id, status, name, remarks } = payload;
		const reqBody = { id, status, remarks };
		const res = yield fetch(`/api/requests`, {
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
			yield put(getRequestsStart({ name, status: 'requests' }));
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

export function* requestsSagas() {
	yield all([call(onGetRequests), call(onUpdateStatus)]);
}
