import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  actionRequest: ['data'],
  actionSearchMusic: ['search'],
  actionSuccess: ['payload', 'select'],
  actionFailure: null,
  reset: null,
  actionPlayMusic: ['status'],
  actionSelectMusic: ['params'],
});

export const SampleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  action: {
    fetching: false,
    data: undefined,
    payload: undefined,
    error: undefined,
  },
  musicList: [],
  playMusic: false,
  onPlayMusic:[],
  search: undefined,
  massage: {}
};

/* ------------- Selectors ------------- */

export const SampleSelectors = {
  selectAction: ({state}) => state.action,
  getDataAction: (state) => state.sample.action,
  getActiveMusic: (state) => state.sample.playMusic,
  getMusicList: (state) => state.sample.musicList,
  getOnPlayMusic: (state) => state.sample.onPlayMusic,
  searchAction: (state) => state.sample.search,

};

/* ------------- Reducers ------------- */


export const actionRequestReducer = (state, {data}) => {
  return {
    ...state.action,
    fetching: true,
    data
  };
};

export const actionSuccessReducer = (state, {payload, select}) => {
  console.log(state);
  return {
    ...state.action,
    action:{
        ...state.action,
        payload,
        fetching: false,
        error: false,
    },
    onPlayMusic: select,
    musicList: payload,
    playMusic: false,
  };
};

export const actionFailureReducer = (state) => {
  return {
    ...state.action,
    fetching: false,
    error: true
  };
};

export const actionPlayMusicReducer = (state, {status}) => {
  console.log(state);
  return {
    ...state,
    playMusic: status,
  };
};

export const actionSelectMusicReducer = (state, {params}) => {
  console.log(state);
  return {
    ...state,
    action: {
      ...state.action,
    },
    onPlayMusic: params,
    // playMusic: true
  };
};

export const actionSearchMusicReducer = (state, {search}) => {
  console.log(state);
  return {
    ...state,
    search,
  };
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_REQUEST]: actionRequestReducer,
  [Types.ACTION_SUCCESS]: actionSuccessReducer,
  [Types.ACTION_FAILURE]: actionFailureReducer,
  [Types.ACTION_PLAY_MUSIC]: actionPlayMusicReducer,
  [Types.ACTION_SELECT_MUSIC]: actionSelectMusicReducer,
  [Types.ACTION_SEARCH_MUSIC]: actionSearchMusicReducer,
});
