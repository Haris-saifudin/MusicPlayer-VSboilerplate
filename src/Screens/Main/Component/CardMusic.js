import React, {PureComponent} from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import SampleActions from '../../../Redux/SampleRedux';
import ApplicationStyles from '../../../Themes/ApplicationStyles';

class CardMusic extends PureComponent {
  render() {
    const {playMusic, music} = this.props;
    return (
      <View style={ApplicationStyles.containerCenter}>
        <Text> {playMusic} </Text>
        <Button title="RESET" onPress={music} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.error({state});
  return {
    playMusic: SampleSelectors.getActiveMusic(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset()),
    music: () => dispatch(SampleActions.actionPlayMusic())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
