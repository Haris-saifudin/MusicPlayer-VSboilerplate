import React, {PureComponent, useCallback} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../Redux/SampleRedux';
import ApplicationStyles from '../Themes/ApplicationStyles';
import Font from '../Themes/Fonts';
import TrackPlayer from 'react-native-track-player';
import { debounce } from 'lodash';

class Search extends PureComponent {
  searchQuery = "";

  constructor(props){
    super(props);
  }
  
  cancel(){
    Keyboard.dismiss();
    if(this.textInput){
      this.textInput.clear();
    }
    this.searchQuery = '';
  }
  
  onSearchMusic(text){
    const {music, searchMusic} = this.props;
    this.searchQuery = text;
    music(false);
    const debouncedSave = debounce(() => searchMusic(this.searchQuery), 1000);
    debouncedSave();
  }

  //hide music card
  searchMusic = async() =>{
    const {setVisibility} = this.props;
    setVisibility();
    await TrackPlayer.stop();
  }

  render() {
    return (
        <View style={ApplicationStyles.container}>
          <View style={ApplicationStyles.topBar}>
            <TextInput
              ref={r => this.textInput = r}
              style={ApplicationStyles.textInput}
              placeholder={"search in apple music"}
              onChangeText={(text) => this.onSearchMusic(text)}
              onFocus={() =>this.searchMusic()}
            />
            <TouchableOpacity  activeOpacity={0.8} onPress={() => this.cancel()} style={{width: 60, alignContent: 'center', alignItems: 'center'}}>
              <Text style={[Font.style.normal, {color: 'red', fontWeight: 'bold'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}


const mapStateToProps = (state) => {
  // console.tron.error({state});
  return {
    payload: SampleSelectors.getDataAction(state),
    playMusic: SampleSelectors.getActiveMusic(state),
    musicList: SampleSelectors.getMusicList(state),
    onPlayMusic: SampleSelectors.getOnPlayMusic(state),
    visibility: SampleSelectors.getVisibility(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset()),
    music: (status) => dispatch(SampleActions.actionPlayMusic(status)),
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
    searchMusic: (search) => dispatch(SampleActions.actionSearchMusic(search)),
    setVisibility: () => dispatch(SampleActions.actionVisibility()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
