import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { requestsSagas } from './requests/requests.sagas';
export default function* rootSaga() {
	yield all([call(userSagas), call(requestsSagas)]);
}
