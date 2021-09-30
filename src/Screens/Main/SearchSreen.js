import React, {PureComponent} from 'react';
import {View, Text } from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Search from '../../Components/MusicSearch';
import MusicCard from '../../Components/MusicCard';
import MusicList from '../../Components/Music/MusicList';
import { SessionSelectors } from '../../Redux/SessionRedux';
import { UpdatePlayList } from '../../Components/Music/MusicManager';
class SearchScreen extends PureComponent {

  render() {
    const {payload, musicList} = this.props;
    return (
      <View style={ApplicationStyles.containerSearch}>
        <Search />
        {(payload.error)? null : 
          ((payload.payload)? <MusicList/> : 
            <View style={{flex: 1}}>
              <View style={{height: 30, height: 30, marginTop: 10,}}>
                <Text style={{textAlign: 'center', fontSize: 16}}>Type something on the search bar...</Text>
              </View>
            </View>
          )
        }
        <MusicCard/>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  console.tron.error({state});
  return {
    payload: SampleSelectors.getDataAction(state),
    session: SessionSelectors.getSessionStatus(state),
    musicList: SampleSelectors.getMusicList(state),
    onPlayMusic: SampleSelectors.getOnPlayMusic(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
