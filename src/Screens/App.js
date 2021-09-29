/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, PureComponent } from 'react';
import { StatusBar, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import REDUX_PERSIST from '../Config/ReduxPersist';
import splashscreen from '../Modules/splashscreen';
import StartupActions from '../Redux/SampleRedux';
import { fcmService } from '../Services/FCMService';
import messaging from '@react-native-firebase/messaging';
import DownloadUpdateModal from '../Components/DownloadUpdateModal';

class App extends PureComponent {
  componentDidMount() {
    if (!REDUX_PERSIST.active) {
      const { startup } = this.props;
      startup();
    }
    // this.requestUserPermission()
    // this.FCMInit()
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  FCMInit = () => {
    fcmService.register(
      this.onRegister,
      this.onOpenNotification,
    );
  }

  onRegister = token => {
    console.log('[NotificationFCM] onRegister: ', token);
  };

  onOpenNotification(notify) {
    console.log('[NotificationFCM] onOpenNotification: ', notify);
  }

  render() {
    splashscreen.hide();
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <DownloadUpdateModal />
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(StartupActions.startup())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
