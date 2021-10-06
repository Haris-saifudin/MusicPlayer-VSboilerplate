/* eslint-disable no-undef */
import {Navigation} from 'react-native-navigation';
import {put, select} from 'redux-saga/effects';
import NavigationServices from '../Navigation/NavigationServices';   
import {SessionSelectors} from '../Redux/SessionRedux';
import {connect, useSelector} from 'react-redux';

/**
 * This sagas will called at the first time when app lauch
 * this function used to thandle navigation, or any logic that required
 * at initial stattup such as get get user information, set token, navigation, etc
 * @param {*} action
 */

//  const session = yield select(SessionSelectors.getSessionStatus);

export function* startup(action) {
  const status = yield select(SessionSelectors.getSessionStatus);
  console.log("[startup]");
  if (status) {
    NavigationServices.setRootMain();
  } else {
    NavigationServices.setRootAuth();
  }
}

// const mapStateToProps = (state) => {
//   console.tron.error({state});
//   return {
//     // playMusic: SampleSelectors.getActiveMusic(state),
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(startup);
