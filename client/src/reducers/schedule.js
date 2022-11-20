import { CREATE_SCHEDULE, GET_SCHEDULES, GET_SCHEDULE } from '../constants/actionTypes';

let initialState = { 
  data: [],
}

export default (state = initialState , action) => {
  switch(action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        data: action.payload,
      }

      case GET_SCHEDULE:
      return {
        ...state,
        data: action.payload,
      }

    case CREATE_SCHEDULE:
      return {
          data: [...state.data, action.payload],
      }

    default:
      return state
  }
}