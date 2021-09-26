import React, {PureComponent} from 'react';
import {View } from 'react-native';
import {connect} from 'react-redux';
import SampleActions, { SampleSelectors } from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import Search from '../../Components/MusicSearch';
import MusicCard from '../../Components/MusicCard';
import MusicList from '../../Components/MusicList';

class SearchScreen extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      activeMusic: [],
      value: '',
    }
  }

  render() {
    const {payload} = this.props;
    return (
      <View style={ApplicationStyles.containerSearch}>
        <Search />
        {(payload.payload)?<MusicList/> : null}
        <MusicCard/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.error({state});
  return {
    payload: SampleSelectors.getDataAction(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMusic: (params) => dispatch(SampleActions.actionSelectMusic(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
