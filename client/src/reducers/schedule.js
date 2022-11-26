import { ADD_SCHEDULE_SUCCESS, ADD_SCHEDULE_ERROR, FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_ERROR, FETCH_SCHEDULES_SUCCESS, FETCH_SCHEDULES_ERROR, CLEAR_SCHEDULES_MESSAGE } from '../constants/actionTypes';

let initialState = { 
  data: [],
  schedule: {
    employeeSchedules: []
  },
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
      schedule: action.payload
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

    case CLEAR_SCHEDULES_MESSAGE:
      return {
        ...state,
        error: null,
        success: null
      }

    default:
      return state
  }
}