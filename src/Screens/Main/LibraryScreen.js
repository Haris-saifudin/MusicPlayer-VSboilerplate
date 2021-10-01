import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Font from '../../Themes/Fonts';
import images from '../../Themes/Images';
import MusicCard from '../../Components/MusicCard';
import SongScreen from './SongScreen';
import FastImage from 'react-native-fast-image';
import SongItem from '../../Components/Music/SongItem';
import { UpdatePlayList , onSelectMusic} from '../../Components/Music/MusicManager';
class LibraryScreen extends PureComponent {

  render() {
    const {getLibrary, musicList} = this.props;
    // console.log("[get library]", getLibrary);
    const ITEM_HEIGHT = 66;
    return (
      <View style={ApplicationStyles.containerSearch}>
        <View style={{marginTop: 20, paddingHorizontal: 16, flex: 1}}>
          <Text style={[ApplicationStyles.titleOnBoard, {textAlign: 'left'}]}>Library</Text>
          {(getLibrary !== null)?
            <FlatList 
              data={getLibrary}
              keyExtractor={item => item.trackId.toString() }
              getItemLayout={(data, index) => (
                {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
              )}
              maxToRenderPerBatch={7}
              windowSize={18}
              renderItem={(item, index) => <SongItem item={item.item} index={item.index} type={'library-list'} />}
              /> : null
          }
        </View>
        <MusicCard/>

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
    getLibrary: SampleSelectors.getLibrary(state),
    getCountLibrary: SampleSelectors.getCountLibrary(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset()),
    music: (status) => dispatch(SampleActions.actionPlayMusic(status)),
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
    searchMusic: (search) => dispatch(SampleActions.actionSearchMusic(search)),
    deleteLibrary: (index, item) => dispatch(SampleActions.actionDeleteLibrary(index, item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
