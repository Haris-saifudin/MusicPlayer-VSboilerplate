import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ItemSong from '../../Components/Music/ItemSong';
import { onSelectMusic } from '../../Components/Music/MusicManager';
import images from '../../Themes/Images';

class SongScreen extends PureComponent {

  selectMusic = (item, index) =>{
    const {selectMusic} = this.props;
    onSelectMusic(index);
    selectMusic(item);
  }

  checkLibrary = false;

  toggleLove = (item) =>{
    const {getLibrary, addToLibrary, getCountLibrary, deleteLibrary} = this.props;
    for(var index = 0; index < getCountLibrary; index++){
      if(item.trackId === getLibrary[index].data.trackId){
        console.log('duplicate');
        this.checkLibrary = true;  
        let replace= {
          data: item,
          love: false
        }
        deleteLibrary(index,replace);
        break;
      }{
        console.log('nothing');
        this.checkLibrary = false;        
      }
    }

    if(this.checkLibrary === false){
      addToLibrary(item);
    }

    console.log(getCountLibrary);
  }

  renderItemSong = ({item, index}) =>{
    const {getLibrary} = this.props;
    // console.log("[toggle love]", getLibrary);

    // console.log(getLibrary[1].love);
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={ () => this.selectMusic(item, index)}>
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
          <TouchableOpacity activeOpacity={0.8} onPress={ () => this.toggleLove(item)}
            style={{marginLeft: 4, flexDirection: 'column', justifyContent: 'center'}}
          >
            {/* <Image style={{height: 20, width: 20}} source={(getLibrary[index].love)? images.love:images.unlove} /> */}
            <Image style={{height: 20, width: 20}} source={images.unlove} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {musicList} = this.props;
    const ITEM_HEIGHT = 66;
    return (
      <View style={{flex: 1}}>      
        <FlatList 
          data={musicList.data}
          keyExtractor={item => item.trackId.toString() }
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
          maxToRenderPerBatch={7}
          windowSize={18}
          renderItem={(item, index) => this.renderItemSong(item, index)}
          // renderItem={(item, index) => (ItemSong(item, index))}
          
        />
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    musicList: SampleSelectors.getMusicList(state),
    getLibrary: SampleSelectors.getLibrary(state),
    getCountLibrary: SampleSelectors.getCountLibrary(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
    addToLibrary: (library) => dispatch(SampleActions.actionAddToLibrary(library)),
    deleteLibrary: (index, item) => dispatch(SampleActions.actionDeleteLibrary(index, item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongScreen);
 
