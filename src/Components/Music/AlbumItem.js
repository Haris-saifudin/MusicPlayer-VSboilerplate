import React, {PureComponent, useState} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
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
            <Text style={ApplicationStyles.titleCard}>{item.collectionCensoredName}</Text>
            <Text style={{height: 22}}>{item.collectionType}</Text>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumItem);