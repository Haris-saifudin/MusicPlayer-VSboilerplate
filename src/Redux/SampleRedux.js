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
  actionNavBarMusic: ['navbar'],
  actionAddToLibrary: ['library'],
  actionDeleteLibrary: ['index', 'item'],
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
  visibility: true,
  nav: {
    song: true,
    album: false
  },
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
  getNavMusic: (state) => state.sample.nav,
  getLibrary: (state) => state.sample.library,
  getCountLibrary: (state) => state.sample.countLibrary,
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
    countLibrary: 0
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

export const actionNavBarMusicReducer = (state, {navbar}) => {
  if(navbar === 'song'){
    return {
      ...state,
      nav:{
        song: true,
        album: false
      }
    };
  }
  else{
    return {
      ...state,
      nav:{
        song: false,
        album: true
      }
    };
  }
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
  if(state.library !== null){
    const temporary = state.library;
    temporary.push({data : library, love: true});
    // console.log("[add] ",state.library);
    return {
      ...state,
      library: temporary,
      countLibrary: state.countLibrary + 1,
    };
  }
  else{
    return{
      ...state,
      library: [{data: library, love: true}],
      countLibrary: state.countLibrary + 1,
    }
  }

};

export const actionDeleteLibraryReducer = (state, {index, item}) => {
  const  deleteLibrary = state.library;
  deleteLibrary.splice(index, 1, item);
  // console.log("[delete] ", state.library);

  return {
    ...state,
    countLibrary: state.countLibrary -1,
    library: deleteLibrary
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
  [Types.ACTION_NAV_BAR_MUSIC]: actionNavBarMusicReducer,
  [Types.ACTION_ADD_TO_LIBRARY]: actionAddToLibraryReducer,
  [Types.ACTION_DELETE_LIBRARY]: actionDeleteLibraryReducer,
  [Types.RESET]: resetReducer,
});
