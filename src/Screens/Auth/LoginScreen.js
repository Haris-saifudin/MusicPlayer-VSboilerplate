import React, {PureComponent} from 'react';
import {Button, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import NavigationServices from '../../Navigation/NavigationServices';
import {NAVIGATION_NAME} from '../../Navigation/RegisterComponent';
import SampleActions, {SampleSelectors} from '../../Redux/SampleRedux';
import { Fonts } from '../../Themes';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import images from '../../Themes/Images';
class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.navigateToMain = this.navigateToMain.bind(this);
    this.navigateToRegister = this.navigateToRegister.bind(this);
  }
  componentDidMount(){
    // const {payload} = this.props;
    // console.log(payload)
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
      <View style={ApplicationStyles.containerCenter}>
        <Text style={Fonts.style.h2}>LET START </Text>
        {/* <Button
          title="Navigate To Main with Redux Action"
          onPress={this.navigateToMain}
        />
        <Button
          title="Navigate To Register Screen"
          onPress={this.navigateToRegister}
        /> */}
        <TouchableOpacity activeOpacity={0.8}  onPress={this.navigateToMain}>
          <Image style={ApplicationStyles.cardImages} source={images.card}/>
        </TouchableOpacity>
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
