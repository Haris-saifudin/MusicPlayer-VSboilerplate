import React, {PureComponent} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ItemAlbum from '../../Components/Music/ItemAlbum';
import ItemSong from '../../Components/Music/ItemSong';

class AlbumScreen extends PureComponent {
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
          renderItem={(item, index) => (ItemAlbum(item, index))}
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
 
