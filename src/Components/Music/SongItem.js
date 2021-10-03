import React from 'react';
import {Text, View , TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import {SessionSelectors} from "../../Redux/SessionRedux";
import ApplicationStyles from '../../Themes/ApplicationStyles';
import { AddPlaylist, onSelectMusic, UpdatePlaylist} from './MusicManager';
import ButtonLove from './ButtonLove';
import {values} from 'lodash';

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
          <Text style={ApplicationStyles.titleCard}>{item.trackCensoredName}</Text>
          <Text style={{height: 22}}>{item.kind} - {item.collectionName}</Text>
        </View>
       <ButtonLove item={item} index={index}/>
      </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state) => {
  return {
    musicList: SampleSelectors.getMusicList(state),
    getPlayList: SampleSelectors.getPlayList(state),
    library: SessionSelectors.getLibrary(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
    setPlaylist: (list) => dispatch(SampleActions.actionSetPlayList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongItem);

