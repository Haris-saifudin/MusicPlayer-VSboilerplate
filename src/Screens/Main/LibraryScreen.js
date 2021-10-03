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

import {SessionSelectors, SessionsSelector} from '../../Redux/SessionRedux';
import {values} from 'lodash';

class LibraryScreen extends PureComponent {

  render() {
    const {library} = this.props;
    const ITEM_HEIGHT = 66;
    const libraryArr = values(library);
    // console.log("[library] ", libraryArr);
    return (
      <View style={ApplicationStyles.containerSearch}>
        <View style={{marginTop: 20, paddingHorizontal: 16, flex: 1}}>
          <Text style={[ApplicationStyles.titleOnBoard, {textAlign: 'left'}]}>Library</Text>
            <FlatList 
              data={libraryArr}
              keyExtractor={item => item.trackId.toString() }
              getItemLayout={(data, index) => (
                {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
              )}
              maxToRenderPerBatch={7}
              windowSize={18}
              renderItem={(item, index) => <SongItem item={item.item} index={item.index} type={'library-list'} />}
              />
        </View>
        <MusicCard/>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    library: SessionSelectors.getLibrary(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
