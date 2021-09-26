# VsBoilerPlate (Experimental)
#### New Boilerplate for React-Native Project.

## How to run:
1. yarn install
2. npx pod-install
3. Setup **Firebase** -> create new firebase project
  * **Android** : Generating Android credentials on firebase console -> download google-services.json -> replace file in /android/app/google-service.json
  * **iOS** : Generating iOS credentials on firebase console -> download GoogleService-Info.plist -> add and replace to project using xcode
4. Setup **Appcenter** -> create project on appcenter.ms (iOS / Android)
5. install appcenter-cli **npm install -g appcenter-cli**
6. code-push deployment add {app-name} --d / appcenter codepush deployment list -a {owner/appName} --displayKeys
7. **Android** -> change key on **android/app/build.gradle** :
  * **staging** : android -> buildTypes -> releaseStaging -> resValue
  * **production** : android -> buildTypes -> release -> resValue
8. **iOS** -> change key on xcode -> select project -> select Build Setting -> **CODEPUSH_KEY** -> release and staging
9. Setup **Bugsee** -> create project on bugsee console
  * **Android** : change bugsee key on main/res/values/string.xml
  * **iOS** : change bugsee key on AppDelegate.m [Bugsee launchWithToken:@{bugsee_key}]
10. Run
  * **Android**: npx react-native run-android but I prefer you to use yarn android-debug (for debug mode) and yarn android-release (for release mode)
  * **IOS**: open VsBoilerPlate.xcworkspace -> then run 

## How to change app Splashcreen
1. **IOS**: modify launchscreen.storyboard from xcode
2. **Android**: modify res/layout/launch_screen.xml from android studio

## How to tes bugsee
1. **IOS**: Shake / Screenshot
2. **Android**: Shake / click bugsee notif on tray

## How to use Navigation
1. Push Screen
 * Register Your Screen in the /Navigation/RegisterComponent
 * You can import NavigationServices from folder Navigation
 * You can Push Stack Screen:
```
NavigationServices.push(
  // Push the screen registered in the /Navigation/RegisterComponent
  NAVIGATION_NAME.AUTH.register,
  {
    // Optional passing paramaters
    params: true
  },
  {
    // Optional options object to configure the screen
    topBar: {
      title: {
        text: 'Title'
      }
    }
  }
);
```
2. Pop Screen
```
NavigationServices.pop();
```
3. Pop to Root Screen
```
NavigationServices.popToRoot();
```
4. Show Modal
 * Register Your Modal Screen in the /Navigation/RegisterComponent
 * You can import NavigationServices from folder Navigation
 * You can Show the Modal:
```
NavigationServices.showModal(
 NAVIGATION_NAME.COMPONENTS.modal, {
  modalPresentationStyle: 'overCurrentContext',
  layout: {
    backgroundColor: 'transparent'
  } // Optional options object to configure the modal
});
```
5. Show Overlay
 * Register Your Overlay in the /Navigation/RegisterComponent
 * You can import NavigationServices from folder Navigation
 * You can Show the Overlay:
```
NavigationServices.showOverlay(
 NAVIGATION_NAME.COMPONENTS.overlay, {
  layout: {
    componentBackgroundColor: 'transparent',
  },  // Optional options object to configure the overlay
});
```

## Dependencies:
1. react-native
2. apisauce for API request
3. redux for state management
4. redux-sagas for redux middleware
5. react-native-navigation for navigation
6. react-native-mmkv-storage for storage
7. redux-persist for persist storage
8. react-native-v8 (android only) for performace optimation
9. react-native-firebase/app
10. react-native-firebase/messaging
11. react-native-code-push
12. appcenter
13. react-native-bugsee
