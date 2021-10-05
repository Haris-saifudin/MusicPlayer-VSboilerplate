import React from 'react';
import {Text, View , TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import { AddPlaylist, onSelectMusic, UpdatePlaylist} from './MusicManager';
import ButtonLove from './ButtonLove';
import {values} from 'lodash';
import { LibrarySelectors } from '../../Redux/LibraryRedux';

const SongItem = ({
  item, 
  index, 
  type,
  selectMusic,
  getPlayList,
  setPlaylist,
  musicList,
  library
}) =>{
  const libraryArr = values(library);

  const chooseMusic = (item, index) =>{
    console.log("[playlist]", getPlayList);
    if(type =='music-list'){
      if(getPlayList.type === 'music-list' && getPlayList.play === true){
        onSelectMusic(index);
        selectMusic(item);
      }
      else{
        setPlaylist('music-list');
        AddPlaylist('update', musicList.song, index);
        selectMusic(item);
      }
    }
    else{
      if(getPlayList.type === 'library-list' && getPlayList.play === true){
        onSelectMusic(index);
        selectMusic(item);
      }
      else{
        AddPlaylist('update' ,libraryArr, index);
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
          <Text numberOfLines={1} style={ApplicationStyles.titleCard}>{item.trackCensoredName}</Text>
          <Text numberOfLines={1} >{item.kind} - {item.collectionName}</Text>
        </View>
       <ButtonLove item={item} index={index}/>
      </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state) => {
  return {
    musicList: MusicSelectors.getMusicList(state),
    getPlayList: MusicSelectors.getPlayList(state),
    library: LibrarySelectors.getLibrary(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(MusicActions.actionSelectMusic(params)),
    setPlaylist: (list) => dispatch(MusicActions.actionSetPlayList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);

