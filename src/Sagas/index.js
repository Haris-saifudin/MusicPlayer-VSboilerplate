import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {SampleSelectors, SampleTypes} from '../Redux/SampleRedux';
import {StartupTypes} from '../Redux/StartupRedux';
import Api from '../Services/Api';

/* ------------- Sagas ------------- */

import {SampleAction, SampleReset} from './SampleSagas';
import {startup} from './StartupSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = Api.create();

/* ------------- Connect Types To Sagas ------------- */
  // const play = yield select(SampleSelectors.getActiveMusic);

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(SampleTypes.ACTION_REQUEST, SampleAction, api),
    // takeLatest(SampleTypes.ACTION_SEARCH_REQUEST, SampleAction, api. ),
    takeLatest(SampleTypes.RESET, SampleReset),
    takeLatest(StartupTypes.STARTUP, startup),
    // takeLatest(SampleTypes.ACTION_PLAY_MUSIC, SampleAction, api, ),


    // some sagas receive extra parameters in addition to an action
    // takeLatest(SampleTypes.SAMPLE_REQUEST, SampleAction)
  ]);
}
