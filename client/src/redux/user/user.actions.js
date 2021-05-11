import userActionTypes from './user.types';

export const signUpStart = (user) => ({
	type: userActionTypes.SIGN_UP_START,
	payload: user,
});
export const signUpSuccess = (user) => ({
	type: userActionTypes.SIGN_UP_SUCCESS,
	payload: user,
});

export const signUpFailure = (err) => ({
	type: userActionTypes.SIGN_UP_FAILURE,
	payload: err,
});

export const logInStart = (user) => ({
	type: userActionTypes.LOG_IN_START,
	payload: user,
});
export const logInSuccess = (user) => ({
	type: userActionTypes.LOG_IN_SUCCESS,
	payload: user,
});

export const logInFailure = (err) => ({
	type: userActionTypes.LOG_IN_FAILURE,
	payload: err,
});

export const emptyError = () => ({
	type: userActionTypes.EMPTY_ERROR,
});

export const logOut = () => ({
	type: userActionTypes.LOG_OUT,
});
