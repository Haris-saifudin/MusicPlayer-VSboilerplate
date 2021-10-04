import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';

import ApplicationStyles from '../../Themes/ApplicationStyles';
import MusicCard from '../../Components/Music/MusicCard';

class PlayScreen extends PureComponent {

  render() {
    return (
      <View style={ApplicationStyles.containerApp}>
        <MusicCard />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.tron.error({state});
  return {
    payload: MusicSelectors.getDataAction(state),
    playMusic: MusicSelectors.getActiveMusic(state),
    musicList: MusicSelectors.getMusicList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(MusicActions.reset()),
    music: (status) => dispatch(MusicActions.actionPlayMusic(status)),
    selectMusic: (params) => dispatch(MusicActions.actionSelectMusic(params)),
    searchMusic: (search) => dispatch(MusicActions.actionSearchMusic(search)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
