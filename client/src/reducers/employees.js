import { FETCH_ALL, CREATE, UPDATE, SHOW_LOADER, HIDE_LOADER, FETCH_EMPLOYEE, NEW_ABSENCE, GET_ABSENCES } from '../constants/actionTypes';

let initialState = { 
    isLoading: true,
    data: [] 
}

export default (state = initialState , action) => {
    switch(action.type) {
        case FETCH_ALL:
            return {
                ...state,
                data: action.payload,
            }

        case FETCH_EMPLOYEE:
            return {
                ...state,
                employee: action.payload
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
            })}

        case NEW_ABSENCE:
            return {
                data: state.data.map((employee)=> {
                if(employee._id === action.payload._id) {
                    return {...employee, ...action.payload}
                } else {
                    return employee
                }
            })}

        case GET_ABSENCES:
            return {
                ...state,
                data: action.payload,
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