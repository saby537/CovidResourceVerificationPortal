import userActionTypes from './user.types';

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

export const logOutStart = () => ({
	type: userActionTypes.LOG_OUT_START,
});
export const logOutSuccess = (data) => ({
	type: userActionTypes.LOG_OUT_SUCCESS,
	payload: data,
});
export const logOutFailure = () => ({
	type: userActionTypes.LOG_OUT_FAILURE,
});
