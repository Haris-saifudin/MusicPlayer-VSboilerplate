import React, {PureComponent, useCallback} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import { SampleAction } from '../../Sagas/SampleSagas';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Font from '../../Themes/Fonts';
import images from '../../Themes/Images';
import CardMusic from '../../Components/CardMusic';
import TrackPlayer from 'react-native-track-player';
// import debounce from 'lodash.debounce';
import { debounce } from 'lodash';
import Search from '../../Components/Search';

class SearchScreen extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      activeMusic: [],
      value: '',
      statusMusic: false,
      onSearch: false,
    }
  }

  cancel = () => {
    const {selectMusic} = this.props;
    Keyboard.dismiss();
    this.setState({
      query: ''
    });
    selectMusic(this.state.activeMusic);
  }

  onSearchMusic = (text) =>{
    const {music, searchMusic} = this.props;
    this.setState({
      query: text,
    });
    music(false);
    const debouncedSave = debounce(() => searchMusic(this.state.query), 1000);
		debouncedSave();
  }

  searchMusic = async() =>{
    const {music} = this.props;
    music(false);
    await TrackPlayer.reset();
    this.setState({
      onSearch : true
    })
  }

  onBlurSearch = () =>{
    const {selectMusic} = this.props;
    this.setState({
      onSearch : false
    })
    selectMusic(false)
  }

  onSelectMusic = async(item) =>{
    const {music, selectMusic} = this.props;
    this.setState({
      query: '',
      activeMusic: item,
      statusMusic: true
    });
    selectMusic(item);
    await TrackPlayer.reset();
    console.log(item.previewUrl);
    await TrackPlayer.add({
      url: item.previewUrl,
      title: item.trackCensoredName,
      artist: item.artistName,
      artwork: item.artworkUrl60,
      // duration: 28,
    });
    await TrackPlayer.play();
  }

  render() {
    const {payload, playMusic, musicList, onPlayMusic} = this.props;
    const {music, reset, selectMusic, searchMusic} = this.props;
    console.log(payload);
    return (
      <View style={ApplicationStyles.containerSearch}>
        <View style={ApplicationStyles.container}>
          <View style={ApplicationStyles.topBar}>
            <TextInput
              style={ApplicationStyles.textInput}
              placeholder={"search in apple music"}
              onChangeText={(text) => this.onSearchMusic(text)}
              value={this.state.query}
              onFocus={() =>this.searchMusic()}
              onBlur={() => this.onBlurSearch()}
            />
            <TouchableOpacity  activeOpacity={0.8} onPress={this.cancel}>
              <Text style={Font.style.normal, {color: '#FF0000'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* <Search /> */}
        {(payload.payload)?
          <View style={{flex: 1}}>
              <FlatList 
                data={musicList.data}
                keyExtractor={item => item.trackId.toString()}
                renderItem={(item) =>{
                  return(
                    <TouchableOpacity activeOpacity={0.8} onPress={ (() => this.onSelectMusic(item.item))}>
                      <View style={ApplicationStyles.card}>
                        <Image style={{height: 60, width: 60}} source={{uri: item.item.artworkUrl60}}/>
                        <View style={ApplicationStyles.description}>
                          <Text style={ApplicationStyles.titleCard}>{item.item.trackCensoredName}</Text>
                          <Text style={Font.style.normal, {height: 22}}>{item.item.artistName} - {item.item.collectionName}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
          </View>
          : null
        }
      {(this.state.onSearch)? null : <CardMusic />}
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset()),
    music: (status) => dispatch(SampleActions.actionPlayMusic(status)),
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
    searchMusic: (search) => dispatch(SampleActions.actionSearchMusic(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
