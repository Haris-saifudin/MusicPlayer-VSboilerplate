import React, {PureComponent} from 'react';
import {View } from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Search from '../../Components/MusicSearch';
import MusicCard from '../../Components/MusicCard';
import MusicList from '../../Components/Music/MusicList';
import { SessionSelectors } from '../../Redux/SessionRedux';
import { UpdatePlayList } from '../../Components/Music/MusicManager';
class SearchScreen extends PureComponent {

  // componentDidMount(){
  //  this.updateMusic()
  // }

  // updateMusic = () =>{
  //   const {musicList} = this.props;
  //   UpdatePlayList(musicList.song, musicList.count);
  // }

  render() {
    const {payload, musicList} = this.props;
    return (
      <View style={ApplicationStyles.containerSearch}>
        <Search />
        {(payload.error)? null : <MusicList />}
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
