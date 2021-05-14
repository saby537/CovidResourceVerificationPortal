import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import userReducer from './user/user.reducer';
import requestReducer from './requests/requests.reducer';
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'requests'],
};

const rootReducer = combineReducers({
	user: userReducer,
	requests: requestReducer,
});

export default persistReducer(persistConfig, rootReducer);
