import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ItemAlbum from '../../Components/Music/ItemAlbum';
import ItemSong from '../../Components/Music/ItemSong';

class AlbumScreen extends PureComponent {

  ItemAlbum = ({item, index}) =>{
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
    const {musicList} = this.props;
    const ITEM_HEIGHT = 66;
    return (
      <View style={{flex: 1}}>      
        <FlatList 
          data={musicList.album}
          keyExtractor={item => item.collectionId.toString() }
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
          maxToRenderPerBatch={7}
          windowSize={18}
          renderItem={(item, index) => this.ItemAlbum(item, index)}
          // renderItem={(item, index) => (ItemAlbum(item, index))}
        />
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    musicList: SampleSelectors.getMusicList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    //
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AlbumScreen);
 
