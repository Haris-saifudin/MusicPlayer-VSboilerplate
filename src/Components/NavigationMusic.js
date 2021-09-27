import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../Redux/SampleRedux';
import ApplicationStyles from '../Themes/ApplicationStyles';

class NavigationMusic extends PureComponent {
  render(){
    const {navMusic, actionNavMusic} = this.props;
    return(
      <View>
        <View style={ApplicationStyles.tabBar}>
          <TouchableOpacity activeOpacity={0.8} style={
            (navMusic.song)? ApplicationStyles.activeTabBar: ApplicationStyles.defaultTabBar}
            onPress={() =>  actionNavMusic('song')}>
            <Text style={
              (navMusic.song)? ApplicationStyles.activeTextTabBar:  ApplicationStyles.defaultTextTabBar
            }>SONG</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={
            (navMusic.album)? ApplicationStyles.activeTabBar: ApplicationStyles.defaultTabBar}
            onPress={() =>  actionNavMusic('album')}>
            <Text style={
              (navMusic.album)? ApplicationStyles.activeTextTabBar:  ApplicationStyles.defaultTextTabBar
            }>ALBUM</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.tron.error({state});
  return {
    navMusic: SampleSelectors.getNavMusic(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionNavMusic: (navbar) => dispatch(SampleActions.actionNavBarMusic(navbar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMusic);
