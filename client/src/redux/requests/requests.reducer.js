import requestsActionTypes from './requests.types';
const INITIAL_STATE = {
	resources: null,
	isLoading: false,
	error: null,
	filter: '',
};

const updateRequest = (requests, data) => {
	return requests.map((req) =>
		req.id === data.id
			? {
					...data,
					source: req.source,
					time: req.time,
					validation_status: req.validation_status,
			  }
			: req
	);
};

const requestReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case requestsActionTypes.GET_REQUESTS_START:
		case requestsActionTypes.UPDATE_STATUS_START:
		case requestsActionTypes.EDIT_REQUESTS_START:
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
		case requestsActionTypes.EDIT_REQUESTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				resources: updateRequest(state.resources, action.payload),
			};
		case requestsActionTypes.GET_REQUESTS_FAILURE:
		case requestsActionTypes.EDIT_REQUESTS_FAILURE:
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
		case requestsActionTypes.ADD_FILTER:
			return {
				...state,
				filter: action.payload,
			};
		case requestsActionTypes.REMOVE_FILTER:
			return {
				...state,
				filter: '',
			};
		default:
			return state;
	}
};

export default requestReducer;
