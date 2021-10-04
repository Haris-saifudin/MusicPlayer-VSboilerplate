import {createReducer, createActions} from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addToLibrary: ['data'],
  removeFromLibrary: ['id']
});

export const SessionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  library:{},

};

/* ------------- Selectors ------------- */

export const LibrarySelectors = {
  getLibrary: (state) => state.library.library,
  isExistInLibrary: (state, id) => {
    if(state.library.library[id]){
      return true;
    }
    else{
      return false;
    }
  } 
};


/* ------------- Reducers ------------- */

export const addToLibraryReducer = (state, {data}) =>{
  return {
    ...state,
    library: {
      ...state.library,
      [data.trackId] : data
    }
  }
}

export const removeFromLibraryReducer = (state, {id}) =>{
  if(state.library[id]){
    delete state.library[id]
  }
  return {
    ...state,
    library:{
      ...state.library,
    }
  }
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TO_LIBRARY]: addToLibraryReducer,
  [Types.REMOVE_FROM_LIBRARY]: removeFromLibraryReducer,
});
