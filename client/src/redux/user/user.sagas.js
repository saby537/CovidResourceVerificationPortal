import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	logInSuccess,
	logInFailure,
	logOutFailure,
	logOutSuccess,
	signUpSuccess,
	signUpFailure,
} from './user.actions';
import { addFilter } from '../requests/requests.actions';
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
		//console.log(responseData);
		if (!res.ok || res.status !== 200) {
			yield put(logInFailure(responseData.errors));
		} else {
			yield put(logInSuccess(responseData.user[0]));
			yield put(
				addFilter({
					city: responseData.user[0].city_preference,
					requirement: '',
				})
			);
		}
	} catch (err) {
		console.log(err);
		yield put(logInFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onLogIn() {
	yield takeLatest(userActionTypes.LOG_IN_START, logIn);
}

export function* signUp({ payload }) {
	const httpAbortCtrl = new AbortController();
	try {
		const reqBody = {
			username: payload.username.value,
			password: payload.password.value,
			email: payload.email.value,
			city: payload.city,
		};
		console.log(reqBody);
		const res = yield fetch(`/api/signup`, {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
			signal: httpAbortCtrl.signal,
		});
		const responseData = yield res.json();
		console.log(responseData.user.city, payload.city);
		if (!res.ok || res.status !== 200) {
			yield put(signUpFailure(responseData.errors));
		} else {
			yield put(signUpSuccess(responseData.user));
			yield put(addFilter({ city: payload.city, requirement: '' }));
		}
	} catch (err) {
		console.log(err);
		yield put(signUpFailure(err));
	}
	setTimeout(() => httpAbortCtrl.abort(), 5000);
}

export function* onSignUp() {
	yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
	yield all([call(onLogOut), call(onLogIn), call(onSignUp)]);
}
