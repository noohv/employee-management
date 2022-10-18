import { FETCH_ALL, CREATE, UPDATE, SHOW_LOADER, HIDE_LOADER } from '../constants/actionTypes';

let initialState = { 
    loading:false,
    eventData: [] 
}

export default (employees = initialState , action) => {
    switch(action.type) {
        case FETCH_ALL:
            return {
                ...employees,
                eventData: action.payload,
            }

        case CREATE:
            return {
                eventData: [...employees.eventData, action.payload],
            }

        case UPDATE:
            return{
                eventData : [...employees.eventData, employees.eventData.map((employee) => employee._id === action.payload._id ? action.payload : employee)]
            } 
            
        case HIDE_LOADER:
            return {
                ...employees,
                loading: false,
            }

        case SHOW_LOADER:
            return {
                ...employees,
                loading: true,
            }

        default:
            return employees;
    }
}