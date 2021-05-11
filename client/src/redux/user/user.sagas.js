import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	logInSuccess,
	logInFailure,
	logOutFailure,
	logOutSuccess,
} from './user.actions';
import userActionTypes from './user.types';

export function* logOut({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		const res = yield fetch(`/api/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		if (!res.ok) {
			yield put(logOutFailure(responseData.errors));
		} else {
			yield put(logOutSuccess(responseData));
		}
	} catch (err) {
		console.log('error');
		yield put(logOutFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onLogOut() {
	yield takeLatest(userActionTypes.LOG_OUT_START, logOut);
}

export function* logIn({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		const reqBody = {
			username: payload.username.value,
			password: payload.password.value,
		};
		console.log(reqBody);
		const res = yield fetch(`/api/login`, {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		if (!res.ok || res.status !== 200) {
			yield put(logInFailure(responseData.errors));
		} else {
			yield put(logInSuccess(responseData.user[0]));
		}
	} catch (err) {
		console.log('error');
		yield put(logInFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onLogIn() {
	yield takeLatest(userActionTypes.LOG_IN_START, logIn);
}

export function* userSagas() {
	yield all([call(onLogOut), call(onLogIn)]);
}
