import React, {Component} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../Redux/SampleRedux';
import ApplicationStyles from '../Themes/ApplicationStyles';
import TrackPlayer from 'react-native-track-player';

class MusicList extends Component {
  constructor(props){
    super(props);
    this.state = ({
      query: '',
      tabBar:{
        artist: true,
        album: false
      }
    })
  }

  onSelectMusic = async(item, index) =>{
    const {selectMusic, musicList, setVisibility} = this.props;
    this.setState({
      query: '',
    });
    const queue = await TrackPlayer.getQueue();
    if(queue){
      this.setState({
        updatePlayList: true,
      });
      selectMusic(item);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    }
  }

  
  renderItem = (item, index) =>{
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={ () => this.onSelectMusic(item, index)}>
        <View style={ApplicationStyles.card}>
          <FastImage style={{height: 60, width: 60, borderRadius: 3}} 
            source={{
              uri: item.artworkUrl60,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={ApplicationStyles.description}>
            <Text style={ApplicationStyles.titleCard}>{item.trackCensoredName}</Text>
            <Text style={{height: 22}}>{item.kind} - {item.collectionName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  onPressTabBar(type){
    switch(type){
      case "artist":
        this.setState({
          tabBar:{
            artist: true,
            album: false
          }
        }); break;
      
      case "album" : {
        this.setState({
          tabBar:{
            artist: false,
            album: true
          }
        }); break;
      }
      default: null
  }
}

  render() {
    const {musicList} = this.props;
    return (
      <View style={{flex: 1}}>
        <View style={ApplicationStyles.tabBar}>
          <TouchableOpacity activeOpacity={0.8} style={
            (this.state.tabBar.artist)? ApplicationStyles.activeTabBar: ApplicationStyles.defaultTabBar}
            onPress={() => this.onPressTabBar('artist')}>
            <Text style={
              (this.state.tabBar.artist)? ApplicationStyles.activeTextTabBar:  ApplicationStyles.defaultTextTabBar
            }>ARTIST</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={
            (this.state.tabBar.album)? ApplicationStyles.activeTabBar: ApplicationStyles.defaultTabBar}
            onPress={() => this.onPressTabBar('album')}>
            <Text style={
              (this.state.tabBar.album)? ApplicationStyles.activeTextTabBar:  ApplicationStyles.defaultTextTabBar
            }>ALBUM</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
          data={musicList.data}
          keyExtractor={item => item.trackId}
          renderItem={({item, index}) => this.renderItem(item, index)}  
        />
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
    setVisibility: () => dispatch(SampleActions.actionVisibility()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
