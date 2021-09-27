import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
  Event
  
} from 'react-native-track-player';

import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../Redux/SampleRedux';
import ApplicationStyles from '../Themes/ApplicationStyles';
import Font from '../Themes/Fonts';
import images from '../Themes/Images';




const MusicCard = ({onPlayMusic, musicList, visibility, selectMusic}) => {
  const playbackState = usePlaybackState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [currentTrack, setCurrentTrack] = useState();


  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      //get current play
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const currentTrack = await TrackPlayer.getCurrentTrack();
      const {title, artist, artwork} = track || {};
      setTrackTitle(title);
      setTrackArtwork(artwork);
      setCurrentTrack(currentTrack);
    }
  });

 

  //toggle play and pause music
  const playingMusic = async() =>{
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }

  useEffect(() => {
    selectMusic(false);
  }, []);

  return (
    <View>
         {(visibility)?
          ((onPlayMusic)?
            (<View style={ApplicationStyles.playMusic}>
              <FastImage style={{height: 40, width: 40, borderRadius: 3}} 
                source={{
                  uri: trackArtwork,
                  priority: FastImage.priority.high
                }} />

              <View style={ApplicationStyles.description}>
                <Text style={{height: 22}, Font.style.description}>{trackTitle}</Text>
              </View>
              {(currentTrack !== 0) ? 
              (<TouchableOpacity activeOpacity={0.6} onPress={() => TrackPlayer.skipToPrevious()}>
                <Image source={images.previous} style={ApplicationStyles.icon} /> 
              </TouchableOpacity>): null}
              <TouchableOpacity activeOpacity={0.6}  onPress={() => playingMusic()}>
                <Image source={(playbackState === State.Stopped)? images.pause : ((playbackState === State.Playing) ? images.play: images.pause)} 
                style={ApplicationStyles.iconCardMusic} /> 
              </TouchableOpacity>
              {(currentTrack === (musicList.count -1))? <View style={ApplicationStyles.icon} /> :
                <TouchableOpacity activeOpacity={0.6} onPress={() => TrackPlayer.skipToNext()}>
                <Image source={images.next} style={ApplicationStyles.icon} /> 
                </TouchableOpacity>
              }
              
          </View>) : null )
          // (<View style={ApplicationStyles.playMusic}>
          //   <View style={ApplicationStyles.boxImage}/>
          //   <View style={ApplicationStyles.description}>
          //     <Text style={Font.style.description}>Not Playing</Text>
          //   </View>
          //   <TouchableOpacity activeOpacity={0.6}>
          //     <Image source={images.previous} style={ApplicationStyles.icon} /> 
          //   </TouchableOpacity>
          //   <TouchableOpacity activeOpacity={0.6}>
          //     <Image source={images.pause} style={ApplicationStyles.iconCardMusic} /> 
          //   </TouchableOpacity>
          //   <TouchableOpacity activeOpacity={0.6} >
          //     <Image source={images.next} style={ApplicationStyles.icon} /> 
          //   </TouchableOpacity>
          // </View>))
          
          : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    playMusic: SampleSelectors.getActiveMusic(state),
    onPlayMusic: SampleSelectors.getOnPlayMusic(state),
    visibility: SampleSelectors.getVisibility(state),
    musicList: SampleSelectors.getMusicList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    music: (status) => dispatch(SampleActions.actionPlayMusic(status)),
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicCard);