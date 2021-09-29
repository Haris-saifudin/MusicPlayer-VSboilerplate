import React, {PureComponent, useEffect} from 'react';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import { connect, useDispatch, useSelector } from 'react-redux';


export const UpdatePlayList = async (musicList, count) => {
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
  await TrackPlayer.stop();
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
};


export const PlayingMusic = async(param) =>{
  // const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log('param');
    if (param === 2) { // 3 (play) , 2 (pause)
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
}

// export default PlayingMusic;

export const ForwardMusic = async() =>{
  await TrackPlayer.skipToNext();
  await TrackPlayer.play();
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

// const SelectMusic = ({item, index, selectMusic}) =>{
//   const onSelectMusic = async(index) =>{
//     //select playlist
//     await TrackPlayer.skip(index);
//     await TrackPlayer.play()
//   }

//   selectMusic(item);
//   onSelectMusic(index);
// }

// const mapStateToProps = (state) => {
//   // console.tron.error({state});
//   return {
//     payload: SampleSelectors.getDataAction(state),
//     playMusic: SampleSelectors.getActiveMusic(state),
//     musicList: SampleSelectors.getMusicList(state),
//     onPlayMusic: SampleSelectors.getOnPlayMusic(state),
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     reset: () => dispatch(SampleActions.reset()),
//     music: (status) => dispatch(SampleActions.actionPlayMusic(status)),
//     selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
//     searchMusic: (search) => dispatch(SampleActions.actionSearchMusic(search)),

//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SelectMusic);
