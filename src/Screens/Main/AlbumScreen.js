import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import {connect} from 'react-redux';
import MusicActions, { MusicSelectors } from '../../Redux/MusicRedux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import AlbumItem from '../../Components/Music/AlbumItem';
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
          renderItem={(item, index) => <AlbumItem item={item.item} index={item.index} />}
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
    //
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AlbumScreen);
 
