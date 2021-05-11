import userActionTypes from './user.types';
const INITIAL_STATE = {
	userId: null,
	mobile: null,
	isLoading: false,
	error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userActionTypes.SIGN_UP_START:
		case userActionTypes.LOG_IN_START:
			return {
				...state,
				isLoading: true,
			};
		case userActionTypes.SIGN_UP_SUCCESS:
		case userActionTypes.LOG_IN_SUCCESS:
			return {
				...state,
				userId: action.payload.userId,
				mobile: action.payload.mobile,
				isLoading: false,
				error: null,
			};
		case userActionTypes.SIGN_UP_FAILURE:
		case userActionTypes.LOG_IN_FAILURE:
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
