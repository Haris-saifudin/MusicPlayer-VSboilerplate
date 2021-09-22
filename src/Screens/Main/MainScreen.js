import React, {PureComponent} from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import SampleActions from '../../Redux/SampleRedux';
import ApplicationStyles from '../../Themes/ApplicationStyles';

class MainScreen extends PureComponent {
  render() {
    const {reset} = this.props;
    return (
      <View style={ApplicationStyles.containerCenter}>
        <Text> Main Screen </Text>
        <Button title="RESET" onPress={reset} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.tron.error({state});
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(SampleActions.reset())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
