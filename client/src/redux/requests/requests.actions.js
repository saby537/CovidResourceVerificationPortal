import requestsActionTypes from './requests.types';

export const getRequestsStart = (data) => ({
	type: requestsActionTypes.GET_REQUESTS_START,
	payload: data,
});
export const getRequestsSuccess = (requests) => ({
	type: requestsActionTypes.GET_REQUESTS_SUCCESS,
	payload: requests,
});

export const getRequestsFailure = (err) => ({
	type: requestsActionTypes.GET_REQUESTS_FAILURE,
	payload: err,
});

export const updateStatusStart = (request) => ({
	type: requestsActionTypes.UPDATE_STATUS_START,
	payload: request,
});
export const updateStatusSuccess = () => ({
	type: requestsActionTypes.UPDATE_STATUS_SUCCESS,
});

export const updateStatusFailure = (err) => ({
	type: requestsActionTypes.UPDATE_STATUS_FAILURE,
	payload: err,
});

export const emptyError = () => ({
	type: requestsActionTypes.EMPTY_ERROR,
});

export const editRequestsStart = (data) => ({
	type: requestsActionTypes.EDIT_REQUESTS_START,
	payload: data,
});
export const editRequestsSuccess = (data) => ({
	type: requestsActionTypes.EDIT_REQUESTS_SUCCESS,
	payload: data,
});

export const editRequestsFailure = (err) => ({
	type: requestsActionTypes.EDIT_REQUESTS_FAILURE,
	payload: err,
});

export const addFilter = (data) => ({
	type: requestsActionTypes.ADD_FILTER,
	payload: data,
});

export const removeFilter = (data) => ({
	type: requestsActionTypes.REMOVE_FILTER,
	payload: data,
});
