import React, {PureComponent} from 'react';
import {Button, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import NavigationServices from '../../Navigation/NavigationServices';
import {NAVIGATION_NAME} from '../../Navigation/RegisterComponent';
import SampleActions, {SampleSelectors} from '../../Redux/SampleRedux';
import Fonts from '../../Themes/Fonts';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import images from '../../Themes/Images';
class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.navigateToMain = this.navigateToMain.bind(this);
    this.navigateToRegister = this.navigateToRegister.bind(this);
  }

  navigateToMain() {
    const {sampleRequst} = this.props;
    sampleRequst();
  }

  navigateToRegister() {
    NavigationServices.push(
      NAVIGATION_NAME.AUTH.register,
      {
        // passing parameter
        fromLogin: true
      },
      {
        // passing option
        topBar: {
          title: {
            text: 'Register'
          }
        }
      }
    );
  }

  render() {
    return (
      <View style={ApplicationStyles.containerOnboard}>
        <View style= {{alignContent: 'flex-start'}}>
          <Text style={{fontFamily: Fonts.type.bold, fontSize: Fonts.size.h2, fontWeight: 'bold'}}>Listen Now</Text>
        </View>
        {/* <Button
          title="Navigate To Main with Redux Action"
          onPress={this.navigateToMain}
        />
        <Button
          title="Navigate To Register Screen"
          onPress={this.navigateToRegister}
        /> */}
        <View style={ApplicationStyles.container}>
          <TouchableOpacity activeOpacity={0.8}  onPress={this.navigateToMain}>
            <Image style={ApplicationStyles.cardImages} source={images.card}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payload: SampleSelectors.getDataAction(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sampleRequst: () => dispatch(SampleActions.actionRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
