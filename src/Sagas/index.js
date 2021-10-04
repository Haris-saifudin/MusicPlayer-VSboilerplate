import {takeLatest, all, select} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {SampleSelectors, SampleTypes} from '../Redux/SampleRedux';
import { SessionSelectors } from '../Redux/SessionRedux';
import {StartupTypes} from '../Redux/StartupRedux';
import Api from '../Services/Api';

/* ------------- Sagas ------------- */

import {SampleAction, SampleReset} from './SampleSagas';
import {SearchAction} from './SearchSagas';
import {startup} from './StartupSagas';
import {ActionReset, ActionNavigateToMain} from './SessionSagas';
import { reducers } from '../Redux';


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = Api.create();




/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(SampleTypes.ACTION_REQUEST, ActionNavigateToMain, api),
    takeLatest(SampleTypes.RESET, ActionReset, reducers),
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(SampleTypes.ACTION_SEARCH_MUSIC, SearchAction, api),
    // some sagas receive extra parameters in addition to an action
    // takeLatest(SampleTypes.SAMPLE_REQUEST, SampleAction)
  ]);
}
