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
  State,
  usePlaybackState,
  useTrackPlayerEvents,
  Event
} from 'react-native-track-player';

import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Font from '../../Themes/Fonts';
import images from '../../Themes/Images';
import {PlayingMusic, PreviousMusic, ForwardMusic} from './MusicManager';

const MusicCard = ({getPlaylist, visibility, selectMusic}) => {
  const playbackState = usePlaybackState();
  const [playlist, setPlaylist] = useState({
    trackArtwork: '',
    trackTitle: '',
    currentTrack: '',
  });

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      //get current play
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const currentTrack = await TrackPlayer.getCurrentTrack();
      const {title, artwork} = track || {};
      setPlaylist({
        trackArtwork: artwork,
        trackTitle: title,
        currentTrack: currentTrack,
      })
    }
  });

  useEffect(() => {
    selectMusic(false);
  }, []);

  return (
    <View>
      {(visibility)?
        ((getPlaylist.play)?
          (<View style={ApplicationStyles.playMusic}>
            <FastImage style={{height: 40, width: 40, borderRadius: 3}} 
              source={{
                uri: playlist.trackArtwork,
                priority: FastImage.priority.high
              }} />

            <View style={ApplicationStyles.description}>
              <Text numberOfLines={1} style={ Font.style.description}>{playlist.trackTitle}</Text>
            </View>

            {(playlist.currentTrack !== 0) ? 
              (<TouchableOpacity activeOpacity={0.6} onPress={() => PreviousMusic()}>
                <Image source={images.previous} style={ApplicationStyles.icon} /> 
              </TouchableOpacity>)
              : null
            }

            <TouchableOpacity activeOpacity={0.6}  onPress={() => PlayingMusic(playbackState)}>
              <Image source={(playbackState === State.Stopped)? images.pause : ((playbackState === State.Playing) ? images.play: images.pause)} 
              style={ApplicationStyles.iconCardMusic} /> 
            </TouchableOpacity>

            {/* {(playlist.currentTrack === ((getPlayList === 'music-list')?(musicList.count -1): (getLibrary === null)? null:(getLibrary.length - 1))?
              <View style={ApplicationStyles.icon} /> : */}
              <TouchableOpacity activeOpacity={0.6} onPress={() => ForwardMusic()}>
                <Image source={images.next} style={ApplicationStyles.icon} /> 
              </TouchableOpacity>
            {/* )} */}

          </View>) 
        : null )
      : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    getPlaylist: MusicSelectors.getPlayList(state),
    visibility: MusicSelectors.getVisibility(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(MusicActions.actionSelectMusic(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicCard);