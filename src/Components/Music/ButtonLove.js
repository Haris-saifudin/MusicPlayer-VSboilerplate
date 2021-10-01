import React, {PureComponent, useState} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import images from '../../Themes/Images';
import StopMusic, { AddPlaylist, RemoveMusic, UpdatePlayList } from './MusicManager';

const pushLibrary = (item, param) =>{
  let playlist = {
    trackId: item.trackId,
    artworkUrl60: item.artworkUrl60,
    trackCensoredName:item.trackCensoredName,
    collectionName: item.collectionName,
    kind: item.kind,
    previewUrl: item.previewUrl,
    url: item.previewUrl,
    title: item.trackCensoredName,
    artist: item.artist,
    artwork: item.artwork,
    like: param,
   }
   return playlist;
 }

 const updateLibrary = (item) =>{
  let playlist = [{
    trackId: item.trackId,
    artworkUrl60: item.artworkUrl60,
    trackCensoredName:item.trackCensoredName,
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

const Replace = (musicList, index, item) =>{
  const arr = [];
  if(musicList === arr){
    let unlove = [...musicList];
    unlove.splice(0, 1, pushLibrary(item, false));
    console.log("[unlove]");
    return unlove;
  }
  else{
    for(let count = 0; count < musicList.length; count++){
      if(item.trackId === musicList[count].trackId){
        if(musicList[count].like === true){
          let unlove = [...musicList];
          unlove.splice(count, 1, pushLibrary(item, false));
          return unlove;
        }
      }
    }
  } 
}

const unLove = (getLibrary, index, item) =>{
  const unlove = [];
  unlove.push(...getLibrary);
  console.log("[lib] ", getLibrary.length, "-", getLibrary);
  unlove.splice(index, 1);
  console.log("[unlove] ", unlove.length, "-", unlove);
  return unlove
}

const Love = (musicList, index, item) =>{
  let love = [];
  love = [...musicList];
  love.splice(index, 1, pushLibrary(item, true));
  return love
}

const ButtonLove = ({
    musicList, 
    index, 
    getLibrary, 
    deleteLibrary,
    getCountLibrary,
    addToLibrary,
    type,
    item,
    setLove,
    getPlayList
  }) =>{

  const [checkLibrary, setCheckLibrary] = useState(false);

  // let checkLibrary = true;
  let love = [];
  const toggleLove = (item, type, dataIndex) =>{
    if(type === 'music-list'){
      if(getCountLibrary === 0 || getCountLibrary < 0 || getLibrary === null){
        addToLibrary(updateLibrary(item));
        love = [...musicList.song];
        love.splice(index, 1, pushLibrary(item, true));
        setLove(love);
      }
      else if(getLibrary === undefined){
        love = [...musicList.song];
        love.splice(index, 1, pushLibrary(item, false));
        setLove(love);
      }
      else{
        for(let count = 0; count < getLibrary.length; count++){
          if(item.trackId === getLibrary[count].trackId){
            console.log('[any same id]');

            const unlove = unLove(getLibrary, index);
            deleteLibrary(count, unlove);
            checkLibrary = true;
            if(getPlayList === "library-list"){
              RemoveMusic(count);
            }
            love = [...musicList.song];
            love.splice(index, 1, pushLibrary(item, false));
            setLove(love);
            break;
          }
          else{
            console.log('[id not same]');
            checkLibrary = false;
          }
        }
        if(checkLibrary === false){
            const pinSongToLibrary =[...getLibrary];
            pinSongToLibrary.push( pushLibrary(item, true) );
            addToLibrary(pinSongToLibrary);
            console.log("[add library]");
            if(getPlayList === 'library-list'){
              AddPlaylist( pushLibrary(item, true));
            }
            let love = Love(musicList.song, index, item);
            setLove(love);

            console.log(getLibrary.length);
        }
        console.log(checkLibrary, getCountLibrary);
      }
    }

    else if(type === 'libray-list'){
      let replace = [...getLibrary];
      replace.splice(index, 1);
      deleteLibrary(index, replace);
      const unlove = Replace(musicList.song, index, item);
      console.log(getPlayList);
      if(getPlayList === 'library-list'){
        RemoveMusic(index);
      }
      setLove(unlove);
    }
  }

  const updateLib = (item, type, dataIndex) =>{
    if(type === 'music-list'){
      if(getLibrary === null){
        const update = [];
        update.push({
          trackId: item.trackId,
          artworkUrl60: item.artworkUrl60,
          trackCensoredName:item.trackCensoredName,
          collectionName: item.collectionName,
          kind: item.kind,
          previewUrl: item.previewUrl,
          url: item.previewUrl,
          title: item.trackCensoredName,
          artist: item.artist,
          artwork: item.artwork,
          like: true,
        });
        console.log("[add library]",update);
        addToLibrary(update);
        // const pushLib = pushLibrary(item, true);
        // let updateSongList = [];
        // updateSongList.push(musicList.song);
        // // console.log(updateSongList);
        // updateSongList.splice(dataIndex, 1, pushLib);
        // console.log("[update song list]", updateSongList);
        // setCheckLibrary(true);
      }
      else{
        console.log("[List Library]",getLibrary);
        for(var index =0; index < getLibrary.length; index++){
          if(item.trackId === getLibrary[index].trackId){
            console.log("true");
            setCheckLibrary(true);
            if(checkLibrary === true){

              if(getLibrary.length === 1){
                addToLibrary(null);

                if(getPlayList === 'library-list'){
                  AddPlaylist(null);
                }
              }

              else{
                const deleteLibraryList = [...getLibrary];
                deleteLibraryList.splice(index, 1);
                addToLibrary(deleteLibraryList);
                
                if(getPlayList === 'library-list'){
                  AddPlaylist(deleteLibraryList);
                }
              }
            }
            break;
          }
          else{
            console.log("false");
            setCheckLibrary(false);
          }
        }
        console.log("[check library]", checkLibrary);
        if(checkLibrary === false){
          const update = [...getLibrary];
          // update.push(getLibrary);
          update.push({
            trackId: item.trackId,
            artworkUrl60: item.artworkUrl60,
            trackCensoredName:item.trackCensoredName,
            collectionName: item.collectionName,
            kind: item.kind,
            previewUrl: item.previewUrl,
            url: item.previewUrl,
            title: item.trackCensoredName,
            artist: item.artist,
            artwork: item.artwork,
            like: true,
          });
          addToLibrary(update);
          console.log("[update]", update);
          setCheckLibrary(true);
        }

      }
    }
    
    if(type === 'library-list'){
      console.log('library');
      for(var index =0; index < getLibrary.length; index++){
        if(item.trackId === getLibrary[index].trackId){
          console.log("true, index =", index);
          if(getLibrary.length === 1){
            addToLibrary(null);
            if(getPlayList === 'library-list'){
              AddPlaylist(null);
            }
          }
          else{
            const deleteLibraryList = [...getLibrary];
            deleteLibraryList.splice(index, 1);
            addToLibrary(deleteLibraryList);
            if(getPlayList === 'library-list'){
              AddPlaylist(deleteLibraryList);
            }
          }

          
          break;
        }
      }
    }

  }


  return(
        <TouchableOpacity activeOpacity={0.8} onPress={ () => updateLib(item, type, index)}
          style={{marginLeft: 4, flexDirection: 'column', justifyContent: 'center'}}
        >
          <Image style={{height: 20, width: 20, marginRight: 12}} source={(item.like)?images.love:images.unlove} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLove);

