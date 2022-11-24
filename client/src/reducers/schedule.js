import { ADD_SCHEDULE_SUCCESS, ADD_SCHEDULE_ERROR, FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_ERROR, FETCH_SCHEDULES_SUCCESS, FETCH_SCHEDULES_ERROR } from '../constants/actionTypes';

let initialState = { 
  data: [],
  error: null
}

export default (state = initialState , action) => {
  switch(action.type) {
    case FETCH_SCHEDULES_SUCCESS:
      return {
        ...state,
        data: action.payload
      }

    case FETCH_SCHEDULES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case FETCH_SCHEDULE_SUCCESS:
    return {
      ...state,
      data: action.payload
    }

    case FETCH_SCHEDULE_ERROR:
    return {
      ...state,
      error: action.payload
    }

    case ADD_SCHEDULE_SUCCESS:
      return {
          data: [...state.data, action.payload],
          success: 'Grafiks veiksmīgi izveidots!'
      }
    
    case ADD_SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}