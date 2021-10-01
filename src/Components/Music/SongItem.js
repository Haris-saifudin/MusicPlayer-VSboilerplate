import React, {PureComponent, useState} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import TrackPlayer, {Capability} from 'react-native-track-player';
import { throttle, debounce } from 'lodash';
import { onSelectMusic ,UpdatePlayList } from './MusicManager';
import images from '../../Themes/Images';
import ButtonLove from './ButtonLove';


const SongItem = ({
  item, 
  index, 
  getLibrary, 
  getCountLibrary,
  type,
  selectMusic,
  getPlayList,
  setPlaylist,
  musicList,
}) =>{


  const chooseMusic = (item, index) =>{
    if(type =='music-list'){
      if(getPlayList === 'music-list'){
        onSelectMusic(index);
        selectMusic(item);
      }
      else{
        UpdatePlayList(musicList.song, musicList.count, 'update', index);
        setPlaylist('music-list');
        selectMusic(item);
      }
    }
    else{
      if(getPlayList === 'library-list'){
        onSelectMusic(index);
        selectMusic(item);
        console.log(getPlayList);
      }
      else{
        UpdatePlayList(getLibrary, getCountLibrary, 'update-library', index);
        setPlaylist('library-list');
        selectMusic(item);
      }
    }

  }

  return(
    <TouchableOpacity activeOpacity={0.8} onPress={() => chooseMusic(item, index)}>
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
       <ButtonLove item={item} index={index} type={type}/>
      </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state) => {
  return {
    musicList: SampleSelectors.getMusicList(state),
    visibility: SampleSelectors.getVisibility(state),
    getLibrary: SampleSelectors.getLibrary(state),
    getCountLibrary: SampleSelectors.getCountLibrary(state),
    getPlayList: SampleSelectors.getPlayList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
    deleteLibrary: (index, item) => dispatch(SampleActions.actionDeleteLibrary(index, item)),
    addToLibrary: (library) => dispatch(SampleActions.actionAddToLibrary(library)),
    setPlaylist: (list) => dispatch(SampleActions.actionSetPlayList(list)),
    setLove: (love) => dispatch(SampleActions.actionSetLove(love)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);

