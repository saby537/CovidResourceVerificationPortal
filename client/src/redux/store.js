import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
import rootSaga from './root-sagas';
import createSagaMiddleWare from 'redux-saga';

const sagaMiddleWare = createSagaMiddleWare();
const middlewares = [sagaMiddleWare];

if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleWare.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
