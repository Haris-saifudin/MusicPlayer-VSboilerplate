import React, {PureComponent, useState} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
// import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';

const AlbumItem = ({item, index}) =>{
  return(
    <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(item)}>
      <View style={ApplicationStyles.card}>
          <FastImage style={ApplicationStyles.imageAlbum} 
            source={{
              uri: item.artworkUrl60,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={ApplicationStyles.description}>
            <Text numberOfLines={1} style={ApplicationStyles.titleCard}>{item.collectionCensoredName}</Text>
            <Text numberOfLines={1}>{item.collectionType}</Text>
          </View>
      </View>
    </TouchableOpacity>
  )
}


const mapStateToProps = (state) => {
  return {
    musicList: MusicSelectors.getMusicList(state),
    visibility: MusicSelectors.getVisibility(state),
    getLibrary: MusicSelectors.getLibrary(state),
    getCountLibrary: MusicSelectors.getCountLibrary(state),
    getPlayList: MusicSelectors.getPlayList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(MusicActions.actionSelectMusic(params)),
    deleteLibrary: (index, item) => dispatch(MusicActions.actionDeleteLibrary(index, item)),
    addToLibrary: (library) => dispatch(MusicActions.actionAddToLibrary(library)),
    setPlaylist: (list) => dispatch(MusicActions.actionSetPlayList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumItem);