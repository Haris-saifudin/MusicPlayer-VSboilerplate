import {call, put} from 'redux-saga/effects';
import {path} from 'ramda';
import SampleActions from '../Redux/SampleRedux';
import {Alert} from 'react-native';
import NavigationServices from '../Navigation/NavigationServices';
import { UpdatePlayList } from '../Components/Music/MusicManager';

export function SampleReset() {
  NavigationServices.setRootAuth();
}
export function SampleAction() {
  NavigationServices.setRootMain();
}


export function* SearchAction(api, {search}) {
  try {
    const response = yield call(api.searchMusic, "song", search);
    const albumApiResponse = yield call(api.searchMusic,"album" , search);
    // if (response.ok) {
    if (response.ok) {
      if(albumApiResponse.ok){

        let playlist = [];
        for(var index = 0; index< response.data.resultCount; index++){
          playlist.push({
            trackId: response.data.results[index].trackId,
            artworkUrl60: response.data.results[index].artworkUrl60,
            trackCensoredName: response.data.results[index].trackCensoredName,
            collectionName: response.data.results[index].collectionCensoredName,
            kind: response.data.results[index].kind,
            previewUrl: response.data.results[index].previewUrl,
            url: response.data.results[index].previewUrl,
            title: response.data.results[index].trackCensoredName,
            artist: response.data.results[index].artistName,
            artwork: response.data.results[index].artworkUrl30,
            like: false,
          })
        }
        // console.log("[playlist]", playlist);

        yield put(SampleActions.actionSuccess({
          status: 'success',
          song: playlist, 
          count: response.data.resultCount,
          album: albumApiResponse.data.results,
        }));
        // console.log(response.data.results);
        UpdatePlayList(playlist, response.data.resultCount, 'list');
        
    }} 
    else {
      throw response;
    }
  } catch (error) {
    yield put(SampleActions.actionFailure());
  }
}
