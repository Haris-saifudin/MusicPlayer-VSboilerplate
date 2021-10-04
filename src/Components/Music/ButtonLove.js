import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import LibraryActions, { LibrarySelectors } from '../../Redux/LibraryRedux';
import images from '../../Themes/Images';
import { RemoveMusic, AddMusicToLibrary } from './MusicManager';
import {values} from 'lodash';
import TrackPlayer from 'react-native-track-player';


const ButtonLove = ({loveStatus, addToLibrary, removeFromLibrary,
   item, getPlayList, index, library, setVisbility}) =>{

  const [addPlaylistMusic, setAddPlaylistMusic] = useState(true);
  
  const getTrack = async() =>{
    const getCurrentTrack = await TrackPlayer.getCurrentTrack();
    const getTrack = await TrackPlayer.getTrack(getCurrentTrack);
    if(await getTrack.trackId === item.trackId){
      setVisbility();
      RemoveMusic(getCurrentTrack, 'delete-playlist');
    }
    else{
      RemoveMusic(index);
    }
  }

  const updateLoveStatus = () => {
    if(loveStatus){
      //when music list is played, and you want to unlove from library
      if(getPlayList.type === 'library-list' && getPlayList.play === true){
        getTrack();
      }
      removeFromLibrary(item.trackId);
      console.log("[Remove from library]");
    }

    else{
      if(getPlayList.type === 'library-list' && getPlayList.play === true){
        const libraryArr = values(library);
        for(var indexLibrary = 0; indexLibrary < libraryArr.length; indexLibrary++){

          // update playlist music when 'library-list' played
          if(item.trackId < libraryArr[indexLibrary].trackId){

            // add playlist with specific index
            AddMusicToLibrary(item, indexLibrary);
            setAddPlaylistMusic(true);
            break;
          }
          else{
            setAddPlaylistMusic(false);
          }
        }

        //add playlist to end index.
        if(addPlaylistMusic === false){
          AddMusicToLibrary(item);
        }
      }
      addToLibrary(item);
    }
  }

  return(
        <TouchableOpacity activeOpacity={0.8} onPress={ () => updateLoveStatus()}
          style={{marginLeft: 4, flexDirection: 'column', justifyContent: 'center'}}
        >
          <Image style={{height: 20, width: 20, marginRight: 12}} source={(loveStatus)? images.love: images.unlove} />
        </TouchableOpacity>
  )
}

const mapStateToProps = (state, {item}) => {
  return {
    getPlayList: MusicSelectors.getPlayList(state),
    loveStatus: LibrarySelectors.isExistInLibrary(state, item.trackId),
    library: LibrarySelectors.getLibrary(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToLibrary: (data) => dispatch(LibraryActions.addToLibrary(data)),
    removeFromLibrary: (id) => dispatch(LibraryActions.removeFromLibrary(id)),
    setVisbility: (state) => dispatch(MusicActions.actionVisibility(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLove);

