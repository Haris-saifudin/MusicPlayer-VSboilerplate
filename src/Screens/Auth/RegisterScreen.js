import React, {PureComponent} from 'react';
import {Button, Text, View} from 'react-native';
import NavigationServices from '../../Navigation/NavigationServices';
import ApplicationStyles from '../../Themes/ApplicationStyles';

class RegisterScreen extends PureComponent {
  render() {
    return (
      <View style={ApplicationStyles.containerCenter}>
        <Text> Register Screen </Text>
        <Button title="Pop" onPress={() => NavigationServices.pop()} />
      </View>
    );
  }
}

export default RegisterScreen;
