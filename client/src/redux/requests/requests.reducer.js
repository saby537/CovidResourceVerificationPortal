import requestsActionTypes from './requests.types';
const INITIAL_STATE = {
	resources: null,
	isLoading: false,
	error: null,
};

const requestReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case requestsActionTypes.GET_REQUESTS_START:
		case requestsActionTypes.UPDATE_STATUS_START:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case requestsActionTypes.GET_REQUESTS_SUCCESS:
			return {
				...state,
				resources: action.payload,
				isLoading: false,
				error: null,
			};
		case requestsActionTypes.UPDATE_STATUS_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case requestsActionTypes.GET_REQUESTS_FAILURE:
		case requestsActionTypes.UPDATE_STATUS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case requestsActionTypes.EMPTY_ERROR:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export default requestReducer;
