import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Font from '../../Themes/Fonts';
import images from '../../Themes/Images';

class PlayScreen extends PureComponent {
  render() {
    const {music} = this.props;
    const {onPlayMusic, playMusic} = this.props;
    return (
      <View style={ApplicationStyles.containerApp}>
        {(onPlayMusic) ? (
        <View style={ApplicationStyles.playMusic}>
          <Image style={{width: 40, height: 40}} source={{uri: onPlayMusic.artworkUrl60}}/> 
          <View style={ApplicationStyles.description}>
            <Text style={ApplicationStyles.trackName}>{onPlayMusic.trackName}</Text>
            <Text style={Font.style.normal, {height: 22}}>{onPlayMusic.artistName} - {onPlayMusic.collectionName}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={music}>
            { (playMusic)?  <Image source={images.play} style={ApplicationStyles.image20} /> :
              <Image source={images.pause} style={ApplicationStyles.image20} />
            }
          </TouchableOpacity>
        </View>) :(<View style={ApplicationStyles.playMusic}>
          <View style={ApplicationStyles.boxImage}/>
          <View style={ApplicationStyles.description}>
            <Text style={Font.style.h6}>Not Playing</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={images.pause} style={ApplicationStyles.image20} />
          </TouchableOpacity>
        </View>)}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.error({state});
  return {
    payload: SampleSelectors.getDataAction(state),
    playMusic: SampleSelectors.getActiveMusic(state),
    musicList: SampleSelectors.getMusicList(state),
    onPlayMusic: SampleSelectors.getOnPlayMusic(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset()),
    music: () => dispatch(SampleActions.actionPlayMusic()),
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
