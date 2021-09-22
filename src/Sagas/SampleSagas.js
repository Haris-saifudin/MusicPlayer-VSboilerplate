import {call, put} from 'redux-saga/effects';
import {path} from 'ramda';
import SampleActions from '../Redux/SampleRedux';
import {Alert} from 'react-native';
import NavigationServices from '../Navigation/NavigationServices';

export function* SampleAction(api, {data}) {
  try {
    (response) => response.json();
    const response = yield call(api.searchMusic, 'justin');
    // if (response.ok) {
    if (true) {
      yield put(SampleActions.actionSuccess({status: 'success', data: response.data.results}));
      NavigationServices.setRootMain();
      console.log(response.data)
    } else {
      throw response;
    }
  } catch (error) {
    yield put(SampleActions.actionFailure());
  }
}

export function SampleReset() {
  NavigationServices.setRootAuth();
}


export function* SearchAction(api, {search}) {
  console.log(search);

  try {
    (response) => response.json();
    const response = yield call(api.searchMusic, search);
    // if (response.ok) {
    if (true) {
      yield put(SampleActions.actionSuccess({status: 'success', data: response.data.results}));
      // NavigationServices.setRootMain();
      // console.log(response.data)
    } else {
      throw response;
    }
  } catch (error) {
    yield put(SampleActions.actionFailure());
  }
}
