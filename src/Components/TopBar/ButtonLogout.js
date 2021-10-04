import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import SessionActions, { SessionSelectors } from '../../Redux/SessionRedux';
import { ApplicationStyles } from '../../Themes';
import images from '../../Themes/Images';
import TrackPlayer from 'react-native-track-player';

const ButtonLogout = ({reset, selectMusic, session}) => {  

  logOut = async() =>{
    session(false);
    reset();
    await TrackPlayer.reset();
    selectMusic(false);
  }

  return(
    <View style={{ width: 110, height: 40}}>
      <TouchableOpacity activeOpacity={0.8}  onPress={() => logOut()}
        style={
          {height: 40,
          width: 110, 
          borderRadius: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center', 
          justifyContent: 'center'}
      } >
        <Text style={[ApplicationStyles.titleOnBoard, {fontSize: 18, color: 'red'}]}>Logout</Text>
      </TouchableOpacity>
   </View>
  )
}

const mapStateToProps = (state) => {
  return {
    //
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(MusicActions.reset()),
    session: (status) => dispatch(SessionActions.changeSessionStatus(status)),
    selectMusic: (params) => dispatch(MusicActions.actionSelectMusic(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogout);

