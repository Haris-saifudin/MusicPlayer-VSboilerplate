import React, {PureComponent} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import SongItem from '../../Components/Music/SongItem';
import {StopMusic} from '../../Components/Music/MusicManager'
import TrackPlayer from 'react-native-track-player';
class SongScreen extends PureComponent {
  // componentWillUnmount() {
  //   this.stopMusic();
  //  }
 
  stopMusic = () =>{
    const {setVisibility} = this.props;
    setVisibility();
    TrackPlayer.stop();
    console.log('Stop Music');
  }

  render() {
    const {musicList} = this.props;
    const ITEM_HEIGHT = 66;
    return (
      <View style={{flex: 1}}>      
        <FlatList 
          data={musicList.song}
          keyExtractor={item => item.trackId.toString() }
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
          maxToRenderPerBatch={7}
          windowSize={18}
          renderItem={(item, index) => <SongItem item={item.item} index={item.index} type={'music-list'} />}
        />
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    musicList: MusicSelectors.getMusicList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVisibility: () => dispatch(MusicActions.actionVisibility()),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongScreen);
 
