import {Navigation as RNNavigation} from 'react-native-navigation';
import NavigationServices from './NavigationServices';
import RegisterComponent, {NAVIGATION_NAME} from './RegisterComponent';
import DefaultOptions from './Styles/'

RegisterComponent();

RNNavigation.events().registerComponentDidAppearListener((nav) => {
  console.tron.send('state.action.complete', {
    name: `NAVIGATE/${nav.componentName}`,
    action: nav
  });
  NavigationServices.setActiveNavigation(nav);
});

RNNavigation.setDefaultOptions({
  statusBar: DefaultOptions.statusBar,
  topBar: DefaultOptions.topBar,
  bottomTabs: DefaultOptions.bottomTabs,
  bottomTab: DefaultOptions.bottomTab,
  layout: DefaultOptions.layout,
  animations: DefaultOptions.animations,
});

RNNavigation.events().registerAppLaunchedListener(() => {
  RNNavigation.setRoot({
    root: {
      stack: {
        id: 'root',
        children: [
          {
            component: {
              name: NAVIGATION_NAME.APP
            }
          }
        ],
      }
    }
  });
});
