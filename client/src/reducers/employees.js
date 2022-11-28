import { 
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_ERROR,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_SUCCESS, 
  UPDATE_EMPLOYEE_ERROR, 
  DELETE_EMPLOYEE_SUCCESS, 
  DELETE_EMPLOYEE_ERROR, 
  DELETE_ABSENCE_SUCCESS, 
  DELETE_ABSENCE_ERROR, 
  ADD_ABSENCE_SUCCESS,
  ADD_ABSENCE_ERROR, 
  SHOW_LOADER, 
  HIDE_LOADER,
  CLEAR_EMPLOYEES_MESSAGE
 } from '../constants/actionTypes';

let initialState = { 
  isLoading: true,
  data: [],
}

export default (state = initialState , action) => {
  switch(action.type) {
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        employee: null
      }

    case FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: action.payload
      }
    
    case FETCH_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((i) => i._id !== action.payload),
        employee: null,
        success: 'Lietotājs dzēsts!'
      }
    
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ADD_EMPLOYEE_SUCCESS:
      return {
        data: [...state.data, action.payload],
        success: 'Lietotājs veiksmīgi pievienots!'
      }

    case ADD_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        data: state.data.map((employee)=> {
          if(employee._id === action.payload._id) {
            return {...employee, ...action.payload}
          } else {
            return employee
          }
        }),
        employee: action.payload,
        success: 'Lietotāja dati atjaunoti!'
      }

    case UPDATE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ADD_ABSENCE_SUCCESS:
      return {
         ...state,
        employee: {...state.employee, absences: [...state.employee.absences, action.payload]},
        success: 'Darbinieka prombūtne pievienota!'
      }
      
    case ADD_ABSENCE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_ABSENCE_SUCCESS:
      return {
        ...state,
        employee:{
          ...state.employee,
          absences: state.employee.absences.filter((i) => i._id !== action.payload),
        },
        success: 'Prombūtne dzēsta!'
      }

    case DELETE_ABSENCE_ERROR:
      return {
        ...state,
        error: action.payload
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

    case CLEAR_EMPLOYEES_MESSAGE:
      return {
        ...state,
        success: null,
        error: null
      }

    default:
      return state;
  }
}