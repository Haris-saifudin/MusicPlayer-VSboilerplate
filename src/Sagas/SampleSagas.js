import {call, put} from 'redux-saga/effects';
import {path} from 'ramda';
import SampleActions from '../Redux/SampleRedux';
import {Alert} from 'react-native';
import NavigationServices from '../Navigation/NavigationServices';
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
  Event
} from 'react-native-track-player';


export function* SampleAction(api, {data}) {
  try {
    (response) => response.json();
    const response = yield call(api.searchMusic, "justin");
    // if (response.ok) {
    if (response.ok) {
      yield put(SampleActions.actionSuccess({
        status: 'success', 
        data: response.data.results, 
        count: response.data.resultCount
      }));
      NavigationServices.setRootMain();
      UpdatePlayList(response.data.results, response.data.resultCount, 'justin')
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
    (response) => response.json();
    const response = yield call(api.searchMusic(search));
    
    if (response.ok) {
      yield put(SampleActions.actionSuccess({
        status: 'success',
        data: response.data.results, 
        count: response.data.resultCount
      }));
      UpdatePlayList(response.data.results, response.data.resultCount, search)
      // NavigationServices.setRootMain();
    } else {
      throw response;
    }
  } catch (error) {
    yield put(SampleActions.actionFailure());
  }
}


const UpdatePlayList = async (musicList, count, search) => {
  await TrackPlayer.reset();
  await TrackPlayer.setupPlayer();
  let  playlist = [];
  for ( var index = 0; index < count; index++){
    playlist.push({
        url: musicList[index].previewUrl,
        title: musicList[index].trackCensoredName,
        artist: musicList[index].artistName,
        artwork: musicList[index].artworkUrl60,
    });
  }
  await TrackPlayer.add(playlist);
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
  // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  const queue = await TrackPlayer.getQueue();
  if(queue){
    console.log('[update queue]');
  }
  console.log('[update music list]', search);
};
