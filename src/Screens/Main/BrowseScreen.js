import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import SessionActions from '../../Redux/SessionRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import MusicCard from '../../Components/Music/MusicCard';
import TrackPlayer from 'react-native-track-player';
import images from '../../Themes/Images';

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
    reset: () => dispatch(MusicActions.reset()),
    session: (status) => dispatch(SessionActions.changeSessionStatus(status)),
    selectMusic: (params) => dispatch(MusicActions.actionSelectMusic(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BrowseScreen);

