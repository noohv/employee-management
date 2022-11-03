import { FETCH_ALL, CREATE, UPDATE, SHOW_LOADER, HIDE_LOADER, FETCH_EMPLOYEE, CREATE_ABSENCE, DELETE_EMPLOYEE, DELETE_ABSENCE } from '../constants/actionTypes';

let initialState = { 
    isLoading: true,
    data: [],
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

        case CREATE_ABSENCE:
            return {
                ...state,
                employee: {...state.employee, absence: [...state.employee.absence, action.payload]}
            }
            
        case DELETE_ABSENCE:
            return {
                ...state,
                data: state.data.map((employee) => {
                    if(employee._id === state.employee._id) {
                        employee.absence.filter((i) => i._id !== action.payload)
                    } else {
                        return employee
                    }
                }),
                employee: state.employee.absence.filter((i) => i._id !== action.payload)
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