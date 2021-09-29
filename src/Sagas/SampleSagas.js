import {call, put} from 'redux-saga/effects';
import {path} from 'ramda';
import SampleActions from '../Redux/SampleRedux';
import {Alert} from 'react-native';
import NavigationServices from '../Navigation/NavigationServices';
import { UpdatePlayList } from '../Components/MusicList';

export function* SampleAction2(api, {data}) {
  try {
    const response = yield call(api.searchMusic,"song", "justin");
    const albumApiResponse = yield call(api.searchMusic,"album", "justin" );
    // if (response.ok) {
    if (response.ok) {
      if(albumApiResponse.ok){
        yield put(SampleActions.actionSuccess({
          status: 'success', 
          data: response.data.results, 
          count: response.data.resultCount,
          album: albumApiResponse.data.results,
          love: false
        }));
        NavigationServices.setRootMain();
      }
    } else {
      throw response;
    }
  } catch (error) {
    yield put(SampleActions.actionFailure());
    NavigationServices.setRootMain();
  }
}

export function SampleReset() {
  NavigationServices.setRootAuth();
}
export function* SampleAction() {
  yield put(SampleActions.actionSuccess({
    data: undefined, 
    count: undefined,
    album: undefined,
    love: undefined
  }));
  NavigationServices.setRootMain();
}


export function* SearchAction(api, {search}) {
  try {
    const response = yield call(api.searchMusic, "song", search);
    const albumApiResponse = yield call(api.searchMusic,"album" , search);
    // if (response.ok) {
    if (response.ok) {
      if(albumApiResponse.ok){
        yield put(SampleActions.actionSuccess({
          status: 'success',
          data: response.data.results, 
          count: response.data.resultCount,
          album: albumApiResponse.data.results,
          love: false
        }));
        UpdatePlayList(response.data.results, response.data.resultCount, search)
    }} 
    else {
      throw response;
    }
  } catch (error) {
    yield put(SampleActions.actionFailure());
  }
}
