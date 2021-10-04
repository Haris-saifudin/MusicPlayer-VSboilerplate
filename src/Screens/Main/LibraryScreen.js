import React, {PureComponent} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import MusicCard from '../../Components/Music/MusicCard';
import SongItem from '../../Components/Music/SongItem';
import {LibrarySelectors} from '../../Redux/LibraryRedux';
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
    library: LibrarySelectors.getLibrary(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen);
