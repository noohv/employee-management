import { ADD_JOBTITLE_SUCCESS, ADD_JOBTITLE_ERROR, FETCH_JOBTITLES_SUCCESS, FETCH_JOBTITLES_ERROR } from '../constants/actionTypes';

let initialState = { 
  data: [],
}

export default (state = initialState , action) => {
  switch(action.type) {
    case FETCH_JOBTITLES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case FETCH_JOBTITLES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ADD_JOBTITLE_SUCCESS:
      return {
        data: [...state.data, action.payload],
        success: 'Ieraksta pievienošana veiksmīga!'
      }
    
    case ADD_JOBTITLE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}