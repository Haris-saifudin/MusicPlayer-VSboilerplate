import {Navigation} from 'react-native-navigation';
import {NAVIGATION_NAME} from './RegisterComponent';
import {Images} from '../Themes/'

/**
 * This services used to help you handle navigation easyly
 * put function that help you navigate here.
 */

let activeNav;

function setActiveNavigation(nav) {
  activeNav = nav;
}

function getActiveNavigation() {
  return activeNav;
}

// sample to set Auth.login screen as Root Screen
function setRootAuth() {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'auth',
        children: [
          {
            component: {
              name: NAVIGATION_NAME.AUTH.onboard
            }
            
          }
        ],
        options:{
          statusBar: {
            visible: true, // Optional
            style: 'dark', // Optional ('light', 'dark')
            backgroundColor: 'white', // Optional, Android only
          }
        }
      }
    }
  });
}

function setRootMain(){
  Navigation.setRoot({
    root:{
      bottomTabs:{
        id: 'button_tab_main',
        children:[
          {
            stack: {
              id: 'browse',
              children:[
                {
                  component:{
                    name: NAVIGATION_NAME.MAIN.browse
                  }
                }
              ],
              options: {
                bottomTab : {
                  text: 'Browse', // Optional
                  textColor: 'grey', // Optional
                  icon: Images.browse, // Optional
                  selectedIcon: Images.browse, // Optional
                  iconColor: 'grey',
                  selectedIconColor: 'red',
                  selectedTextColor: 'red'
                },
                topBar : {
                  rightButtons: [
                    {
                      id: 'custom',
                      component: {
                        name: NAVIGATION_NAME.TOPBAR.logout 
                      },
                      text: 'Logout', // Optional
                      allCaps: false, // Optional, Android only
                      fontSize: 18, // Optional
                      fontWeight: 'bold',
                      showAsAction: 'always', // Optional ('always', 'never', 'withText', 'ifRoom')
                    
                    }
                  ], 
                  visible: true,
                  title: {
                    text: ''
                    // text: 'Browse', // Optional
                    // fontSize: 22, // Optional
                    // color: 'black', // Optional
                    // // fontFamily: , // Optional
                    // fontWeight: 'bold', 
                    // alignment: 'center', // Optional (center, fill)
                    // topMargin: 0, // Optional
                  }, // Optional
                  subtitle: {
                    text: ''
                  },
                  background:{
                    color: 'white'
                  },
                  rightButtonColor: 'red',
                  borderHeight: 0,
                  //
                }
              }
            }
          },
          {
            stack: {
              id: 'play',
              children:[
                {
                  component:{
                    name: NAVIGATION_NAME.MAIN.play
                  }
                }
              ],
              options: {
                bottomTab : {
                  text: 'Play', // Optional
                  textColor: 'grey', // Optional
                  icon: Images.circleplay, // Optional
                  selectedIcon: Images.circleplay, // Optional
                  iconColor: 'grey',
                  selectedIconColor: 'red',
                  selectedTextColor: 'red'
                },
               
              }
            }
          },
          {
            stack: {
              id: 'library',
              children:[
                {
                  component:{
                    name: NAVIGATION_NAME.MAIN.library
                  }
                }
              ],
              options:{
                bottomTab:{
                  text: 'Library',
                  textColor: 'grey', // Optional
                  icon: Images.library, // Optional
                  selectedIcon: Images.library, // Optional
                  iconColor: 'grey',
                  selectedIconColor: 'red',
                  selectedTextColor: 'red'
                }
              }
            }
          },
          {
            stack: {
              id: 'radio',
              children:[
                {
                  component:{
                    name: NAVIGATION_NAME.MAIN.radio
                  }
                }
              ],
              options:{
                bottomTab:{
                  text: 'Radio',
                  textColor: 'grey', // Optional
                  icon: Images.radio, // Optional
                  selectedIcon: Images.radio, // Optional
                  iconColor: 'grey',
                  selectedIconColor: 'red',
                  selectedTextColor: 'red'
                }
              }
            }
          },
          {
            stack: {
              id: 'search',
              children:[
                {
                  component:{
                    name: NAVIGATION_NAME.MAIN.search
                  }
                }
              ],
              options:{
                bottomTab:{
                  text: 'Search',
                  textColor: 'grey', // Optional
                  icon: Images.search, // Optional
                  iconColor: 'grey',
                  selectedIcon: Images.search, // Optional
                  selectedIconColor: 'red',
                  selectedTextColor: 'red'
                },
                statusBar: {
                  visible: true, // Optional
                  style: 'dark', // Optional ('light', 'dark')
                  backgroundColor: 'white', // Optional, Android only
                }
              }
            }
          },
        ]
      }
    }
  })
}

// sample to navigate screen
function push(target, passProps = {}, options = {}) {
  Navigation.push(activeNav.componentId, {
    component: {
      name: target, // Push the screen registered with the 'Settings' key
      options,
      passProps
    }
  });
}

function showModal(target, options = {}) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: target,
            options,
          },
        },
      ],
    },
  });
}

function dismissModal() {
  Navigation.dismissModal(activeNav.componentId);
}

function showOverlay(target, options = {}) {
  Navigation.showOverlay({
    component: {
      name: target,
      options
    }
  });
}

function dismissOverlay() {
  Navigation.dismissOverlay(activeNav.componentId);
}

function mergeOptions(params) {
  Navigation.mergeOptions(activeNav.componentId, params);
}

function pop() {
  Navigation.pop(activeNav.componentId);
}

function popToRoot() {
  Navigation.popToRoot(activeNav.componentId);
}

export default {
  setActiveNavigation,
  getActiveNavigation,
  setRootAuth,
  setRootMain,
  push,
  showModal,
  dismissModal,
  showOverlay,
  dismissOverlay,
  mergeOptions,
  pop,
  popToRoot
};
