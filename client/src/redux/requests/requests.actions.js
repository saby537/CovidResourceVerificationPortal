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
