import { sample } from 'lodash';
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
  actionAddToLibrary: ['library'],
  actionDeleteLibrary: ['item'],
  actionSetPlayList : ['list'],
  actionSetLove: ['love']
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
  playlist: 'music-list',
  onPlayMusic:[],
  search: undefined,
  visibility: true,
  library: null,
  countLibrary: 0
};

/* ------------- Selectors ------------- */

export const SampleSelectors = {
  selectAction: ({state}) => state.sample,
  getDataAction: (state) => state.sample.action,
  getActiveMusic: (state) => state.sample.playMusic,
  getMusicList: (state) => state.sample.musicList,
  getOnPlayMusic: (state) => state.sample.onPlayMusic,
  searchAction: (state) => state.sample.search,
  getVisibility: (state) => state.sample.visibility,
  getLibrary: (state) => state.sample.library,
  getCountLibrary: (state) => state.sample.countLibrary,
  getPlayList: (state) => state.sample.playlist,
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
    musicList: payload,
    playMusic: false,
    onPlayMusic: false,
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

export const actionPlayMusicReducer = (state, {status}) => {
  return {
    ...state,
    playMusic: status,
  };
};

export const actionSelectMusicReducer = (state, {params}) => {
  return {
    ...state,
    onPlayMusic: params,
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
    onPlayMusic: false,
    visibility: false,
  };
};

export const resetReducer = (state) => {
  return {
    ...state,
    library: null,
    countLibrary: 0
  };
};


export const actionAddToLibraryReducer = (state, {library}) => {
  // if(state.countLibrary < 0){
  //   count = 0;
  // }
  // else{
  //   count = state.countLibrary + 1
  // }
  return{
    ...state,
    library,
    // countLibrary: count
  }

};

export const actionDeleteLibraryReducer = (state, {item}) => {
  // let count;
  // let data;
  // if(state.countLibrary -1 < 0){
  //   count = 0;
  //   data = [];
  // }
  // else{
  //   count = state.countLibrary -1;
  //   data = item
  // }

  // console.log("action delete....");
  return {
    ...state,
    // countLibrary: count,
    library: item,
  };
};


export const actionSetPlayListReducer = (state, {list}) => {
  return {
    ...state,
    playlist: list
  };
};

export const actionSetLoveReducer = (state, {love}) => {
  return {
    ...state,
    musicList:{
      ...state.musicList,
      song: love
    },
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
  [Types.ACTION_VISIBILITY]: actionVisibilityReducer,
  [Types.ACTION_ADD_TO_LIBRARY]: actionAddToLibraryReducer,
  [Types.ACTION_DELETE_LIBRARY]: actionDeleteLibraryReducer,
  [Types.RESET]: resetReducer,
  [Types.ACTION_SET_PLAY_LIST]: actionSetPlayListReducer,
  [Types.ACTION_SET_LOVE]: actionSetLoveReducer,
});
