import React from 'react';
import {Navigation} from 'react-native-navigation';
import App from '../Screens/App';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import MainScreen from '../Screens/Main/MainScreen';
import SettingScreen from '../Screens/Main/SettingScreen';
import ModalScreen from '../Screens/Main/ModalScreen';
import Alert from '../Components/Alert';
import Toast from '../Components/Toast';
import ReduxWrapper from './ReduxWrapper';
import SearchSreen from '../Screens/Main/SearchSreen';
import BrowseScreen from '../Screens/Main/BrowseScreen';
import RadioScreen from '../Screens/Main/RadioScreen';
import LibraryScreen from '../Screens/Main/LibraryScreen';
import PlayScreen from '../Screens/Main/PlayScreen';
import OnboardScreen from '../Screens/Auth/OnboardScreen';
import MusicCard from '../Components/MusicCard';
import TrackPlayer from 'react-native-track-player';
import MusicSearch from '../Components/MusicSearch';
import MusicList from '../Components/MusicList';
import NavigationMusic from '../Components/NavigationMusic';
import { TabBar } from 'react-native-tab-view';


export const NAVIGATION_NAME = {
  APP: 'app',
  AUTH: {
    login: 'auth.login',
    register: 'auth.register',
    onboard: 'auth.onboard'
  },
  MAIN: {
    main: 'main.main',
    setting: 'main.setting',
    browse: 'main.browse',
    library: 'main.library',
    play: 'main.play',
    search: 'main.search',
    radio: 'main.radio'
  },
  COMPONENTS: {
    modal: 'component.modal',
    alert: 'component.alert',
    toast: 'component.toast',
    musicCard: 'component.musicCard',
    musicSeaarch: 'component.musicSearch',
    musicList: 'component.musicList',
    navMusic: 'component.navmusic',
    tobTabBar: 'component.topTabBar'
  }
};

export default function () {
  TrackPlayer.registerPlaybackService(() => require('../../service'));
  Navigation.registerComponent(NAVIGATION_NAME.APP, () => ReduxWrapper(App));
  Navigation.registerComponent(NAVIGATION_NAME.AUTH.login, () =>
    ReduxWrapper(LoginScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.AUTH.register, () =>
    ReduxWrapper(RegisterScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.main, () =>
    ReduxWrapper(MainScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.setting, () =>
    ReduxWrapper(SettingScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.modal, () =>
    ReduxWrapper(ModalScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.alert, () =>
    ReduxWrapper(Alert)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.toast, () =>
    ReduxWrapper(Toast)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.musicCard, () =>
    ReduxWrapper(MusicCard)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.musicSeaarch, () =>
    ReduxWrapper(MusicSearch)
  );  
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.musicList, () =>
    ReduxWrapper(MusicList)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.navMusic, () =>
    ReduxWrapper(NavigationMusic)
  );
  Navigation.registerComponent(NAVIGATION_NAME.COMPONENTS.tobTabBar, () =>
    ReduxWrapper(TabBar)
  );


  Navigation.registerComponent(NAVIGATION_NAME.AUTH.onboard, () =>
    ReduxWrapper(OnboardScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.browse, () =>
    ReduxWrapper(BrowseScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.library, () =>
    ReduxWrapper(LibraryScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.play, () =>
    ReduxWrapper(PlayScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.radio, () =>
    ReduxWrapper(RadioScreen)
  );
  Navigation.registerComponent(NAVIGATION_NAME.MAIN.search, () =>
    ReduxWrapper(SearchSreen)
  );
  
}
