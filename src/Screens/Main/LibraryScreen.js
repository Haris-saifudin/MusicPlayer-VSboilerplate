import React, {PureComponent} from 'react';
import {Button, Image, FlatList, Text, View , TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Font from '../../Themes/Fonts';
import images from '../../Themes/Images';
import MusicCard from '../../Components/MusicCard';
import SongScreen from './SongScreen';
import ItemSong from '../../Components/Music/ItemSong';
import FastImage from 'react-native-fast-image';
class LibraryScreen extends PureComponent {

  renderItemSong = ({item, index}) =>{
    // console.log(item, "======", index);
    // (item) => item.json();
    console.log(item.data.trackName);
    return(
      <TouchableOpacity activeOpacity={0.8}>
        <View style={ApplicationStyles.card}>
          <FastImage style={ApplicationStyles.image60} 
            source={{
              uri: item.data.artworkUrl60,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={ApplicationStyles.description}>
            <Text style={ApplicationStyles.titleCard}>{item.data.trackCensoredName}</Text>
            <Text style={{height: 22}}>{item.data.kind} - {item.data.collectionName}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}
            style={{marginLeft: 4, flexDirection: 'column', justifyContent: 'center'}}
          >
            {/* <Image style={{height: 20, width: 20}} source={(getLibrary[index].love)? images.love:images.unlove} /> */}
            <Image style={{height: 20, width: 20}} source={(item)?images.love:images.unlove} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const {getLibrary, onPlayMusic} = this.props;

    console.log("[Library]", getLibrary);
    const ITEM_HEIGHT = 55;
    return (
      <View style={ApplicationStyles.containerApp}>
        {/* <SongScreen /> */}
        {/* <FlatList 
          data={getLibrary}
          keyExtractor={item => item.data.trackId.toString() }
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
          maxToRenderPerBatch={7}
          windowSize={18}
          renderItem={(item, index) => this.renderItemSong(item, index)}
          /> */}
        {(getLibrary === null)? <Text> True </Text> : <Text>false</Text>}
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
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
