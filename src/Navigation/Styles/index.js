import {Images, } from '../../Themes/'

const DefaultOptions = {
  statusBar: {
    visible: true, // Optional
    style: 'dark', // Optional ('light', 'dark')
    backgroundColor: 'white', // Optional, Android only
    drawBehind: false, // Optional, Android only
    translucent: false, // Optional, Android only
    animated: true, // Optional, IOs only
    hideWithTopBar: true, // Optional, IOs only
    blur: true, // Optional, IOs only
  },
  topBar: {
    visible: false, // Optional
    animate: false, // Optional
    title: {
      text: 'Title', // Optional
      fontSize: 17, // Optional
      color: 'red', // Optional
      // fontFamily: , // Optional
      alignment: 'center', // Optional (center, fill)
      topMargin: 0, // Optional
    }, // Optional
    subtitle:  {
      text: 'Subtitle', // Optional
      fontSize: 11, // Optional
      color: 'red', // Optional
      // fontFamily: , // Optional
      alignment: 'center', // Optional (center, fill)
    }, // Optional
    backButton: {
      accessibilityLabel: 'back', // Optional
      id: 'id', // Optional, Android only
      color: 'red', // Optional
      icon: Images.icon, // Optional
      showTitle: 1, // Optional, IOs only
      title: 'title', // Optional, IOs only
      visible: true, // Optional
    }, // Optional
    background: {
      color: 'blue', // Optional
      clipToBounds: true, // Optional, IOs only
      translucent: true, // Optional, IOs only
      blur: true, // Optional, IOs only
    }, // Optional
    barStyle: 'black', // Optional (default, black)
    borderColor: 'red', // Optional, IOs only
    borderHeight: 1, // Optional, Android only
    drawBehind: false, // Optional
    elevation: 1, // Optional, Android only
    hideOnScroll: false, // Optional
    hideNavBarOnFocusSearchBar: false, // Optional, IOs 11+ only
    // leftButtons: , // Optional
    // leftButtonColor: 'red'
    noBorder: false, // Optional, IOs only
    rightButtons: [
      {
        id: 'id',
        text: 'Button 1', // Optional
        allCaps: false, // Optional, Android only
        fontSize: 11, // Optional
        // icon: Images.icon, // Optional
        showAsAction: 'always', // Optional ('always', 'never', 'withText', 'ifRoom')
      }
    ], // Optional
    rightButtonColor: 'red', // Optional
    searchBar: true, // Optional, IOs 11+ only
    searchBarHiddenWhenScrolling: true, // Optional, IOs 11+ only
    searchBarPlaceholder: 'search', // Optional, IOs 11+ only
  }, // Optional
  bottomTabs: {
    animate: true, // Optional
    visible: true,// Optional
    barStyle: 'black', // Optional (default, black)
    backgroundColor: 'white', // Optional
    translucent: true, // Optional, IOs only
    currentTabIndex: 4, // Optional
    drawBehind: false, // Optional
    elevation: 2, // Optional, Android only
    hideShadow: true, // Optional, IOs only
    hideOnScroll: true, // Optional, Android only
    preferLargeIcons: true, // Optional, Android only
    tabsAttachMode: 'together', // Optional ('together','afterInitialTab','onSwitchToTab')
    testID: 'bottomTabsId', // Optional
    titleDisplayMode: 'alwaysShow', // Optional ('alwaysShow','showWhenActive','alwaysHide')
  },
  bottomTab: {
    textColor: 'grey',
    selectedTextColor: 'white',
    selectedIconColor: 'white', 
  },
  layout: {
    backgroundColor: 'white',
    componentBackgroundColor: 'white',
    fitSystemWindows: true, 
    orientation: 'portrait', // Optional ['portrait', 'landscape']
    topMargin: 0, // Optional, Android only
  },
  animations: {
    push: {
      waitForRender: Platform.OS === 'ios',
    },
    pop: {
      waitForRender: Platform.OS === 'ios',
    },
  },
  // overlay: {}, // Optional,
  // modal: {}, // Optional,
  // preview: {}, // Optional,
  // splitView: {}, // Optional,
  // fab: {}, // Optional, Android only
};

export default DefaultOptions;
