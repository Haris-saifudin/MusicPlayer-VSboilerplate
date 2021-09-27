import {call, put} from 'redux-saga/effects';
import {path} from 'ramda';
import SampleActions from '../Redux/SampleRedux';
import {Alert} from 'react-native';
import NavigationServices from '../Navigation/NavigationServices';
import { UpdatePlayList } from '../Components/MusicList';

export function* SampleAction(api, {data}) {
  try {
    (response) => response.json();
    const response = yield call(api.searchMusic,"song" , "justin");
    const responseApiAlbum = yield call(api.searchMusic,"album" , "justin");
    // if (response.ok) {
    if (response.ok) {
      if(responseApiAlbum.ok){
        yield put(SampleActions.actionSuccess({
          status: 'success', 
          data: response.data.results, 
          count: response.data.resultCount,
          album: responseApiAlbum.data.results
        }));
        NavigationServices.setRootMain();
        // UpdatePlayList(response.data.results, response.data.resultCount, 'justin')
      }
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
  try {
    const response = yield call(api.searchMusic, "song", search);
    (response) => response.json();
    const responseApiAlbum = yield call(api.searchMusic,"album" , search);
    // if (response.ok) {
    if (response.ok) {
      if(responseApiAlbum.ok){
        yield put(SampleActions.actionSuccess({
          status: 'success',
          data: response.data.results, 
          count: response.data.resultCount,
          album: responseApiAlbum.data.results
        }));
        UpdatePlayList(response.data.results, response.data.resultCount, search)
      // NavigationServices.setRootMain();
    }} 
    else {
      throw response;
    }
  } catch (error) {
    yield put(SampleActions.actionFailure());
  }
}
