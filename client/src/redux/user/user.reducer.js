import userActionTypes from './user.types';
const INITIAL_STATE = {
	username: null,
	email: null,
	isLoading: false,
	error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userActionTypes.LOG_OUT_START:
		case userActionTypes.LOG_IN_START:
		case userActionTypes.SIGN_UP_START:
			return {
				...state,
				isLoading: true,
			};
		case userActionTypes.LOG_IN_SUCCESS:
		case userActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				email: action.payload.email,
				isLoading: false,
				error: null,
			};
		case userActionTypes.LOG_OUT_SUCCESS:
			return {
				...state,
				username: null,
				email: null,
				isLoading: false,
				error: null,
			};

		case userActionTypes.LOG_OUT_FAILURE:
		case userActionTypes.LOG_IN_FAILURE:
		case userActionTypes.SIGN_UP_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case userActionTypes.EMPTY_ERROR:
			return {
				...state,
				error: null,
			};
		case userActionTypes.LOG_OUT:
			return {
				...state,
				userId: null,
				mobile: null,
			};
		default:
			return state;
	}
};

export default userReducer;
