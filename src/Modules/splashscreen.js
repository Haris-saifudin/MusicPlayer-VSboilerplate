import {NativeModules, Platform} from 'react-native';

const RNSplashScreen = NativeModules.SplashScreen;

function show() {
  if (Platform.OS === 'android') {
    RNSplashScreen.show();
  } else {
    console.log('not available for ios');
  }
}

function hide() {
  if (Platform.OS === 'android') {
    RNSplashScreen.hide();
  } else {
    console.log('not available for ios');
  }
}

export default {
  show,
  hide
};
