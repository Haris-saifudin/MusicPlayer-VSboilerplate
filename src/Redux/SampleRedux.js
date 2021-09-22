import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  actionRequest: ['data'],
  // actionSearchRequest: ['search'],
  actionSuccess: ['payload'],
  actionFailure: null,
  reset: null,
  actionPlayMusic: null,
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
  massage: {}
};

/* ------------- Selectors ------------- */

export const SampleSelectors = {
  selectAction: ({action}) => action.action,
  getDataAction: (state) => state.sample.action,
  getActiveMusic: (state) => state.sample.playMusic,
  getMusicList: (state) => state.sample.musicList,
  getOnPlayMusic: (state) => state.sample.onPlayMusic,
  // searchAction: ({action}) => action.action,

};

/* ------------- Reducers ------------- */

export const actionSearchRequestReducer = (state, {search}) => {
  console.log('search request');
  return {
    ...state.action,
    fetching: true,
    data: search
  };
};

export const actionRequestReducer = (state, {data}) => {
  return {
    ...state.action,
    fetching: true,
    data
  };
};

export const actionSuccessReducer = (state, {payload}) => {
  return {
    ...state.action,
    action:{
        ...state.action,
        payload,
        fetching: false,
        error: false,
    },
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

export const actionPlayMusicReducer = (state) => {
  return {
    ...state,
    playMusic: !state.playMusic
  };
};

export const actionSelectMusicReducer = (state, {params}) => {
  console.log(params)
  return {
    ...state,
    onPlayMusic: params,
    playMusic: true
  };
};


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_REQUEST]: actionRequestReducer,
  [Types.ACTION_SUCCESS]: actionSuccessReducer,
  [Types.ACTION_FAILURE]: actionFailureReducer,
  [Types.ACTION_PLAY_MUSIC]: actionPlayMusicReducer,
  [Types.ACTION_SELECT_MUSIC]: actionSelectMusicReducer,
  // [Types.ACTION_SEARCH_REQUEST]: actionSearchRequestReducer,
});
