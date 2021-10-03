import React, {PureComponent, useState} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import SessionsActions, { SessionSelectors } from '../../Redux/SessionRedux';
import images from '../../Themes/Images';
import { RemoveMusic, AddMusicToLibrary } from './MusicManager';
import {values} from 'lodash';


const ButtonLove = ({loveStatus, addToLibrary, removeFromLibrary,
   item, getPlayList, index, library}) =>{

  const [addPlaylistMusic, setAddPlaylistMusic] = useState(true);
  return(
        <TouchableOpacity activeOpacity={0.8} onPress={ () => {
          if(loveStatus){
            //when music list is played, and u want to unlove from library
            if(getPlayList.type === 'library-list' && getPlayList.play === true){
              console.log("[on play]");
              RemoveMusic(index);
            }
            removeFromLibrary(item.trackId);
          }
          else{
            if(getPlayList.type === 'library-list' && getPlayList.play === true){
              const libraryArr = values(library);
              for(var indexLibrary = 0; indexLibrary< libraryArr.length; indexLibrary++){

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
        }}
          style={{marginLeft: 4, flexDirection: 'column', justifyContent: 'center'}}
        >
          <Image style={{height: 20, width: 20, marginRight: 12}} source={(loveStatus)? images.love: images.unlove} />
        </TouchableOpacity>
  )
}

const mapStateToProps = (state, {item}) => {
  return {
    getPlayList: SampleSelectors.getPlayList(state),
    loveStatus: SessionSelectors.isExistInLibrary(state, item.trackId),
    library: SessionSelectors.getLibrary(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToLibrary: (data) => dispatch(SessionsActions.addToLibrary(data)),
    removeFromLibrary: (id) => dispatch(SessionsActions.removeFromLibrary(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLove);

