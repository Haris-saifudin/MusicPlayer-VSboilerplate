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
import { UpdatePlayList , onSelectMusic} from '../../Components/Music/MusicManager';
class LibraryScreen extends PureComponent {

  updatePlayList (index){
    const {getLibrary, getCountLibrary} = this.props;
    UpdatePlayList(getLibrary, getCountLibrary, 'library');
    // onSelectMusic(index);
  }

  unlove(index){
    const {getLibrary, deleteLibrary} = this.props;
    let temp = [...getLibrary];
    temp.splice(index, 1);
    deleteLibrary(index, temp);
  }

  renderItemSong = ({item, index}) =>{
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.updatePlayList(index)}>
        <View style={[ApplicationStyles.card, {marginHorizontal: 16}]}>
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
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.unlove(index) }
            style={{marginLeft: 4, flexDirection: 'column', justifyContent: 'center'}}
          >
            <Image style={{height: 20, width: 20, marginRight: 12}} source={(item.like)?images.love:images.unlove} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const {getLibrary} = this.props;
    console.log(getLibrary);
    const ITEM_HEIGHT = 66;
    return (
      <View style={ApplicationStyles.containerApp}>
        {(getLibrary !== null)?
          <FlatList 
            data={getLibrary}
            keyExtractor={item => item.trackId.toString() }
            getItemLayout={(data, index) => (
              {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
            )}
            maxToRenderPerBatch={7}
            windowSize={18}
            renderItem={(item, index) => this.renderItemSong(item, index)}
            /> : null
        }
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
