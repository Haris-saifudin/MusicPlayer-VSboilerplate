import React, {PureComponent} from 'react';
import {Image, FlatList, Text, View , TouchableOpacity, Button, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import TrackPlayer, {Capability} from 'react-native-track-player';
import { throttle, debounce } from 'lodash';
import { onSelectMusic } from './MusicManager';

const ItemSong = ({item, index, SelectMusic}) =>{
  return(
    <TouchableOpacity activeOpacity={0.8} onPress={() => onSelectMusic(index)}>
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

export default ItemSong
// const mapStateToProps = (state) => {
//   return {
//     visibility: SampleSelectors.getVisibility(state),
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(RenderSongItem);

