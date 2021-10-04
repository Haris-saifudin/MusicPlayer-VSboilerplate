import {resettableReducer} from 'reduxsauce';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootSaga from '../Sagas/index';

import createSagaMiddleware from 'redux-saga';
import REDUX_PERSIST from '../Config/ReduxPersist';
import configureStore from './CreateStore';

const resettable = resettableReducer('RESET');

export const reducers = combineReducers({
  sample: resettable(require('./SampleRedux').reducer),
  session: require('./SessionRedux').reducer,
  music: resettable(require('./MusicRedux').reducer),
  library: resettable(require('./LibraryRedux').reducer)
});

export default () => {
  let finalReducers = reducers;

  if (REDUX_PERSIST.active) {
    finalReducers = persistReducer(REDUX_PERSIST.storeConfig, reducers);
  }

  let {store, sagasManager, sagaMiddleware} = configureStore(
    finalReducers,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
