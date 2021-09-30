import React, {PureComponent, useState} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import TrackPlayer, {Capability} from 'react-native-track-player';
import { throttle, debounce } from 'lodash';
import { onSelectMusic } from './MusicManager';
import images from '../../Themes/Images';
import { UpdatePlayList } from './MusicManager';

const pushLibrary = (item) =>{
  let playlist = {
    trackId: item.trackId,
    artworkUrl60: item.artworkUrl60,
    trackCensoredName: item.trackCensoredName,
    collectionName: item.collectionName,
    kind: item.kind,
    previewUrl: item.previewUrl,
    url: item.previewUrl,
    title: item.trackCensoredName,
    artist: item.artist,
    artwork: item.artwork,
    like: true,
   }
   return playlist;
 }

 const updateLibrary = (item) =>{
  let playlist = [{
     trackId: item.trackId,
     artworkUrl60: item.artworkUrl60,
     trackCensoredName: item.trackCensoredName,
     collectionName: item.collectionName,
     kind: item.kind,
     previewUrl: item.previewUrl,
     url: item.previewUrl,
     title: item.trackCensoredName,
     artist: item.artist,
     artwork: item.artwork,
     like: true,
   }]
   return playlist;
 }


const SongItem = ({
    item, 
    index, 
    SelectMusic, 
    getLibrary, 
    deleteLibrary,
    getCountLibrary,
    addToLibrary,
    type,
    selectMusic,
    getPlayList,
    setPlaylist,
    musicList
  }) =>{

  let checkLibrary = false;
  
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
      console.log("[music-list]",getPlayList);
    }
    else{
      if(getPlayList === 'library-list'){
        onSelectMusic(index);
        selectMusic(item);
        console.log(getPlayList);
      }
      else{
        UpdatePlayList(getLibrary, getCountLibrary, 'update', index);
        setPlaylist('library-list');
        selectMusic(item);
      }
      console.log("[libray-list]",getPlayList);
    }
    console.log("[type]",type);

  }

  const toggleLove = (item, type, index) =>{
    if(type === 'music-list'){
      if(getCountLibrary === 0 || getLibrary === null ){
        addToLibrary(updateLibrary(item));
      }
      else{
        for(var index = 0; index < getLibrary.length; index++){
          console.log("item", item.trackId, "database", getLibrary[index].trackId)
          if(item.trackId === getLibrary[index].trackId){
            console.log('[any same id]');
            checkLibrary = true; 
            let temp = [...getLibrary];
            temp.splice(index, 1);
            deleteLibrary(index, temp);
            break;
          }
          else{
            console.log('[id not same]');
            checkLibrary = false; 
          }
        }
        if(checkLibrary === false){
            let pinSongToLibrary =[...getLibrary];
            pinSongToLibrary.push( pushLibrary(item) );
            addToLibrary(pinSongToLibrary);
            console.log("[add library");
        }
      }
    }

    else if(type === 'libray-list'){
      let temp = [...getLibrary];
      temp.splice(index, 1);
      deleteLibrary(index, temp);
      UpdatePlayList(temp, getCountLibrary-1, 'none', index);
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
        <TouchableOpacity activeOpacity={0.8} onPress={ () => toggleLove(item, type, index)}
          style={{marginLeft: 4, flexDirection: 'column', justifyContent: 'center'}}
        >
          <Image style={{height: 20, width: 20, marginRight: 12}} source={(item.like)?images.love:images.unlove} />
        </TouchableOpacity>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);

