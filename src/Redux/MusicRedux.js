import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  actionRequest: ['data'],
  actionSearchMusic: ['search'],
  actionSuccess: ['payload'],
  actionFailure: null,
  reset: null,
  actionPlayMusic: ['status'],
  actionSelectMusic: ['params'],
  actionVisibility: null,
  actionSetPlayList : ['list'],
});

export const MusicTypes = Types;
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
  playlist: {
    type: 'music-list',
    play: false,
  },
  search: undefined,
  visibility: true,
};

/* ------------- Selectors ------------- */

export const MusicSelectors = {
  selectAction: ({state}) => state.music,
  getDataAction: (state) => state.music.action,
  getActiveMusic: (state) => state.music.playMusic,
  getMusicList: (state) => state.music.musicList,
  searchAction: (state) => state.music.search,
  getVisibility: (state) => state.music.visibility,
  getLibrary: (state) => state.music.library,
  getCountLibrary: (state) => state.music.countLibrary,
  getPlayList: (state) => state.music.playlist,
};

/* ------------- Reducers ------------- */
export const actionRequestReducer = (state, {data}) => {
  return {
    ...state,
    fetching: true,
    data
  };
};

export const actionSuccessReducer = (state, {payload}) => {
  return {
    ...state,
    action:{
        payload,
        fetching: false,
        error: false,
    },
    playlist: {
      ...state.playlist,
      play: false,
    },
    musicList: payload,
    playMusic: false,
  };
};

export const actionFailureReducer = (state) => {
  return {
    ...state,
    action:{
      fetching: false,
      error: true
    }
  };
};

export const actionSelectMusicReducer = (state, {params}) => {
  return {
    ...state,
    visibility: true,
  };
};

export const actionVisibilityReducer = (state) => {
  return {
    ...state,
    visibility: false,
  };
};

export const actionSearchMusicReducer = (state, {search}) => {
  return {
    ...state,
    search,
    visibility: false,
  };
};


export const actionSetPlayListReducer = (state, {list}) => {
  return {
    ...state,
    playlist: {
      type: list,
      play: true,
    }
  };
};

/* ------------- Hookup Reducers To Types ------------- */


export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_REQUEST]: actionRequestReducer,
  [Types.ACTION_SUCCESS]: actionSuccessReducer,
  [Types.ACTION_FAILURE]: actionFailureReducer,
  [Types.ACTION_SELECT_MUSIC]: actionSelectMusicReducer,
  [Types.ACTION_SEARCH_MUSIC]: actionSearchMusicReducer,
  [Types.ACTION_VISIBILITY]: actionVisibilityReducer,
  [Types.ACTION_SET_PLAY_LIST]: actionSetPlayListReducer,
});
