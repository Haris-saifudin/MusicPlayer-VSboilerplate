import React, {PureComponent, useEffect} from 'react';
import TrackPlayer, {
  Capability, RepeatMode,
} from 'react-native-track-player';

export const UpdatePlaylist = async () => {
  // await TrackPlayer.reset();
  // await TrackPlayer.stop();
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      // Capability.Stop,
      // Capability.SkipToNext,
      // Capability.SkipToPrevious
    ],
  });

  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const AddPlaylist = async(type, item, index) => {
  if(type === 'update'){
    console.log('add new playlist');
    await TrackPlayer.reset();
    await UpdatePlaylist();
    await TrackPlayer.add(item);
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
  }
  else{
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
  }
}

export const PlayingMusic = async(param) =>{
    if (param === 2) { // 3 (play) , 2 (pause)
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
}

export const ForwardMusic = async() =>{
  await TrackPlayer.skipToNext();
  await TrackPlayer.play();
}

export const RemoveMusic = async(index) =>{
  // if current track is played, 
  if(await TrackPlayer.getCurrentTrack() === index){
    await TrackPlayer.skipToNext();
    await TrackPlayer.remove(index);
    console.log("delete success");
  }
  else{
    await TrackPlayer.remove(index);
    console.log("delete");
  }
}

export const AddMusicToLibrary = async(item, index) =>{
  await TrackPlayer.add(item, index);
}

export const PreviousMusic = async() =>{
  await TrackPlayer.skipToPrevious();
  await TrackPlayer.play();
}

export const onSelectMusic = async(index) =>{
  await TrackPlayer.skip(index);
  await TrackPlayer.play();
}

export const StopMusic = async(item) =>{
  await TrackPlayer.stop();
}

export const Pause = async() =>{
  await TrackPlayer.pause();
}

export const CurrentTrack = async() =>{
  const track = await TrackPlayer.getCurrentTrack();
  return track;
}
