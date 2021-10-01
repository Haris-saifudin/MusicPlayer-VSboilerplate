import React, {PureComponent, useEffect} from 'react';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  State,
  RepeatMode,
  Event,
  useTrackPlayerEvents
} from 'react-native-track-player';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import { connect, useDispatch, useSelector } from 'react-redux';


export const UpdatePlayList = async (musicList, count, type, index) => {
  await TrackPlayer.reset();
  await TrackPlayer.stop();
  await TrackPlayer.setupPlayer();
  
  console.log(type);
  if(type === 'update-library'){
    await TrackPlayer.add(musicList);
  }
  else{
    await TrackPlayer.add(musicList);
  }

  // console.log("[type]", type);
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [
      Capability.Play, 
      Capability.Pause,  
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,],
  });
  console.log('[update music list]');

  if(type === 'update-library' || type === 'update'){
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
  }
};


export const PlayingMusic = async(param) =>{
    console.log('param');
    if (param === 2) { // 3 (play) , 2 (pause)
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
}
export const AddPlaylist = async(item) =>{
  await TrackPlayer.add(item);
}


export const ForwardMusic = async() =>{
  await TrackPlayer.skipToNext();
  await TrackPlayer.play();
}

export const RemoveMusic = async(index) =>{
  await TrackPlayer.remove(index)
}

export const PreviousMusic = async() =>{
  await TrackPlayer.skipToPrevious();
  await TrackPlayer.play();
}

export const onSelectMusic = async(index) =>{
  //select playlist
  await TrackPlayer.skip(index);
  await TrackPlayer.play()
}

export const StopMusic = async(item) =>{
  //select playlist
  await TrackPlayer.stop();
}

export const Pause = async() =>{
  //select playlist
  await TrackPlayer.pause();
}
