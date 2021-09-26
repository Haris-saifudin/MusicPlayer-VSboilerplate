import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import SessionActions from '../../Redux/SessionRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import MusicCard from '../../Components/MusicCard';
import TrackPlayer from 'react-native-track-player';

class BrowseScreen extends PureComponent {
  
  logOut = async() =>{
    const {session, reset, selectMusic} = this.props;
    session(false);
    reset();
    await TrackPlayer.reset();
    selectMusic(false);
  }

  render() {
    return (
      <View style={ApplicationStyles.containerApp}>
        <View style={ApplicationStyles.containerCenter}>
          <Button title="RESET" onPress={() => this.logOut()} />
        </View>
        <MusicCard/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.tron.error({state});
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset()),
    session: (status) => dispatch(SessionActions.changeSessionStatus(status)),
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BrowseScreen);

