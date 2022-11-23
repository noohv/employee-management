import { FETCH_ALL, CREATE, UPDATE, SHOW_LOADER, HIDE_LOADER, FETCH_EMPLOYEE, ADD_ABSENCE_SUCCESS, DELETE_EMPLOYEE, DELETE_ABSENCE, ADD_ABSENCE_ERROR } from '../constants/actionTypes';

let initialState = { 
  isLoading: true,
  data: [],
  error: null
}

export default (state = initialState , action) => {
  switch(action.type) {
    case FETCH_ALL:
      return {
        ...state,
        data: action.payload,
        employee: null
      }

    case FETCH_EMPLOYEE:
      return {
        ...state,
        employee: action.payload
      }
    
    case DELETE_EMPLOYEE:
      return {
        ...state,
        data: state.data.filter((i) => i._id !== action.payload),
        employee: null
      }

    case CREATE:
      return {
        data: [...state.data, action.payload],
      }

    case UPDATE:
      return {
        data: state.data.map((employee)=> {
          if(employee._id === action.payload._id) {
            return {...employee, ...action.payload}
          } else {
            return employee
          }
        }),
        employee: action.payload
      }

    case ADD_ABSENCE_SUCCESS:
      return {
         ...state,
        employee: {...state.employee, absences: [...state.employee.absences, action.payload]}
      }
      
    case ADD_ABSENCE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_ABSENCE:
      return {
        ...state,
        employee:{
          ...state.employee,
          absences: state.employee.absences.filter((i) => i._id !== action.payload),
        } 
      }

    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      }

    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      }

    default:
      return state;
  }
}