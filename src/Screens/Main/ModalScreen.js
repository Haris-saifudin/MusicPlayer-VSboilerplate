import React, {PureComponent} from 'react';
import {Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {Images, ApplicationStyles} from '../../Themes/'
import {Navigation } from 'react-native-navigation';
import NavigationServices from '../../Navigation/NavigationServices';

class ModalScreen extends PureComponent {

  constructor(props) {
    super(props);
    // Register to events
    Navigation.events().bindComponent(this);
    this.dismissModal = this.dismissModal.bind(this);
  }

  dismissModal() {
    NavigationServices.dismissModal()
  }

  render() {
    return (
      <View style={ApplicationStyles.containerCenter}>
        <Text> Modal Screen </Text>
        <Button
          title="Close Modal"
          onPress={this.dismissModal}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
