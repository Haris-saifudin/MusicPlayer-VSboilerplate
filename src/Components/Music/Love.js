import * as React from 'react';
import { PureComponent } from 'react';
import { View, useWindowDimensions , StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AlbumScreen from '../../Screens/Main/AlbumScreen';


export const updateLib = (musicList, id) =>{
  const update = []
  for(var index =0; index < musicList.length; index++){
    if(musicList[index].trackId === id){
      update.push({
        trackId: musicList[index].trackId,
        artworkUrl60: musicList[index].artworkUrl60,
        trackCensoredName:musicList[index].trackCensoredName,
        collectionName: musicList[index].collectionName,
        kind: musicList[index].kind,
        previewUrl: musicList[index].previewUrl,
        url: musicList[index].previewUrl,
        title: musicList[index].trackCensoredName,
        artist: musicList[index].artist,
        artwork: musicList[index].artwork,
        like: true,
      })
    }
  }
}