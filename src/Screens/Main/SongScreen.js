import React, {PureComponent} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import SongItem from '../../Components/Music/SongItem';
class SongScreen extends PureComponent {
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
    musicList: SampleSelectors.getMusicList(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongScreen);
 
