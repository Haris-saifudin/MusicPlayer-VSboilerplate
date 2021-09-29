import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import TrackPlayer, {Capability} from 'react-native-track-player';
import { throttle, debounce } from 'lodash';
import { onSelectMusic } from './MusicManager';


const ItemSong = ({item, index}) =>{
  return(
    <TouchableOpacity activeOpacity={0.8} onPress={() => onSelectMusic(index)}>
      <View style={ApplicationStyles.card}>
        <FastImage style={ApplicationStyles.image60} 
          source={{
            uri: item.artworkUrl60,
            priority: FastImage.priority.normal
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={ApplicationStyles.description}>
          <Text style={ApplicationStyles.titleCard}>{item.trackCensoredName}</Text>
          <Text style={{height: 22}}>{item.kind} - {item.collectionName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
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

export default ItemSong;
