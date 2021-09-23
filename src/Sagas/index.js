import {takeLatest, all, select} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {SampleSelectors, SampleTypes} from '../Redux/SampleRedux';
import { SessionSelectors } from '../Redux/SessionRedux';
import {StartupTypes} from '../Redux/StartupRedux';
import Api from '../Services/Api';

/* ------------- Sagas ------------- */

import {SampleAction, SampleReset, SearchAction} from './SampleSagas';
import {startup} from './StartupSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = Api.create();




/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  // const status = yield select(SessionSelectors.getSessionStatus);
  // console.log('sessions :', session);
  yield all([
    // some sagas only receive an action
    takeLatest(SampleTypes.ACTION_REQUEST, SampleAction, api),
    takeLatest(SampleTypes.RESET, SampleReset),
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(SampleTypes.ACTION_SEARCH_MUSIC, SearchAction, api),
    // some sagas receive extra parameters in addition to an action
    // takeLatest(SampleTypes.SAMPLE_REQUEST, SampleAction)
  ]);
}


// export default function* session() {
//   const session = yield select(SessionSelectors.getSessionStatus);
// }