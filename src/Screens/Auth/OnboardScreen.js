import React, {PureComponent} from 'react';
import {Button, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import NavigationServices from '../../Navigation/NavigationServices';
import {NAVIGATION_NAME} from '../../Navigation/RegisterComponent';
import SampleActions, {SampleSelectors} from '../../Redux/SampleRedux';
import SessionActions from '../../Redux/SessionRedux';
import { Fonts } from '../../Themes';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import images from '../../Themes/Images';

class OnboardScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.navigateToMain = this.navigateToMain.bind(this);
    this.navigateToRegister = this.navigateToRegister.bind(this);
  }

  navigateToMain() {
    const {sampleRequst, session} = this.props;
    sampleRequst();
    session(true);
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
        <View style={{width: 360}}>
          <Text style={ApplicationStyles.titleOnBoard}>Listen Now</Text>
        </View>
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
    sampleRequst: () => dispatch(SampleActions.actionRequest()),
    session: (status) => dispatch(SessionActions.changeSessionStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardScreen);
