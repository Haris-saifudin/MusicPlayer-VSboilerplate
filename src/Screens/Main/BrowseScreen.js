import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import SessionActions from '../../Redux/SessionRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import MusicCard from '../../Components/MusicCard';
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
        <View style={{flex: 1, marginTop: 30, alignItems: 'flex-end', paddingHorizontal: 16}}>
          {/* <Button title="RESET" onPress={() => this.logOut()} /> */}
          <TouchableOpacity activeOpacity={0.8}  onPress={() => this.logOut()}
            style={
              {height: 40,
              width: 120, 
              borderRadius: 20,
              backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center', 
              justifyContent: 'center'}
            } >
            <Image style={{width: 18, height: 18, marginRight: 10}} source={images.logout} />
            <Text style={[ApplicationStyles.titleOnBoard, {fontSize: 18, color: 'white'}]}>Sign Out</Text>
          </TouchableOpacity>
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

