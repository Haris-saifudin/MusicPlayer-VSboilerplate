import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../Redux/SampleRedux';
import ApplicationStyles from '../Themes/ApplicationStyles';
import TrackPlayer, {Capability} from 'react-native-track-player';
import { throttle, debounce } from 'lodash';

class MusicList extends PureComponent {
  constructor(props){
    super(props);
    this.state = ({
      query: '',
      tabBar:{
        song: true,
        album: false,
      },
      data: true
    })
  }
  

  onSelectMusic = async(item, index) =>{
    const {selectMusic} = this.props;
    this.setState({
      query: '',
      updatePlayList: true,
     
    });
    selectMusic(item);

    //select playlist
    await TrackPlayer.skip(index);
    await TrackPlayer.play()
  }

  _throttle = (item, index) =>{
    const throttling = throttle(() => this.onSelectMusic(item, index), 1000);
    throttling();
  }

  // render by song
  renderItem = (item, index) =>{
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={ () => this._throttle(item, index)}>
        <View style={ApplicationStyles.card}>
          <FastImage style={ApplicationStyles.image60} 
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

  // render by album
  renderItemAlbum = (item, index) =>{
    return(
      <TouchableOpacity activeOpacity={0.8}>
        <View style={ApplicationStyles.card}>
          <FastImage style={ApplicationStyles.imageAlbum} 
            source={{
              uri: item.artworkUrl60,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={ApplicationStyles.description}>
            <Text style={ApplicationStyles.titleCard}>{item.collectionCensoredName}</Text>
            <Text style={{height: 22}}>{item.collectionType}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {musicList, navMusic} = this.props;
    const ITEM_HEIGHT = 66;
    console.log("[search screen]");
    return (
      <View style={{flex: 1}}>      
        <FlatList 
          data={(navMusic.song) ? musicList.data : musicList.album}
          keyExtractor={item => (navMusic.song) ? 
            item.trackId.toString(): item.collectionId.toString()
          }
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
          maxToRenderPerBatch={7}
          windowSize={18}
          renderItem={({item, index}) => ((navMusic.song) ? 
          this.renderItem(item, index): this.renderItemAlbum(item, index))
        }  
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
    navMusic: SampleSelectors.getNavMusic(state)
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

// update play list
export const UpdatePlayList = async (musicList, count, search) => {
  await TrackPlayer.reset();
  await TrackPlayer.setupPlayer();
  let  playlist = [];
  for ( var index = 0; index < count; index++){
    playlist.push({
        url: musicList[index].previewUrl,
        title: musicList[index].trackCensoredName,
        artist: musicList[index].artistName,
        artwork: musicList[index].artworkUrl60,
    });
  }
  await TrackPlayer.add(playlist);
  await TrackPlayer.stop();
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, 
      Capability.Pause,  
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,],
  });
  // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  // const queue = await TrackPlayer.getQueue();
  // if(queue){
  //   console.log('[add playlist]');
  // }
  console.log('[update music list]', search);
};


export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
