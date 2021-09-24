import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../Redux/SampleRedux';
import ApplicationStyles from '../Themes/ApplicationStyles';
import Font from '../Themes/Fonts';
import images from '../Themes/Images';


const setupIfNecessary = async () => {
  // if app was relaunched and music was already playing, we don't setup again.

  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const CardMusic = ({onPlayMusic, music}) => {
  const playbackState = usePlaybackState();

  const playingMusic = async() =>{
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
      music(true);
    } else {
      await TrackPlayer.pause();
      music(false);
    }

  }

  useEffect(() => {
    setupIfNecessary();
  }, []);

  return (
    <View>
         {(onPlayMusic)?
          (<View style={ApplicationStyles.playMusic}>
            <Image style={{width: 40, height: 40}} source={{uri: onPlayMusic.artworkUrl60}}/> 
            <View style={ApplicationStyles.description}>
              <Text style={ApplicationStyles.trackName}>{onPlayMusic.trackCensoredName}</Text>
              <Text style={Font.style.normal, {height: 22}}>{onPlayMusic.artistName} - {onPlayMusic.collectionName}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => playingMusic()}>
              <Image source={
                (playbackState === State.Stopped)? images.pause :(
                (playbackState === State.Playing) ? images.play: images.pause)} 
              
              style={ApplicationStyles.image20} /> 
            </TouchableOpacity>
        </View>) :
        (<View style={ApplicationStyles.playMusic}>
          <View style={ApplicationStyles.boxImage}/>
          <View style={ApplicationStyles.description}>
            <Text style={Font.style.h6}>Not Playing</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={images.pause} style={ApplicationStyles.image20} />
          </TouchableOpacity>
        </View>)}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    playMusic: SampleSelectors.getActiveMusic(state),
    onPlayMusic: SampleSelectors.getOnPlayMusic(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    music: (status) => dispatch(SampleActions.actionPlayMusic(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);