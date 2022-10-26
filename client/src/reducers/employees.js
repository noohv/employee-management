import { FETCH_ALL, CREATE, UPDATE, SHOW_LOADER, HIDE_LOADER, FETCH_ONE } from '../constants/actionTypes';

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

        case FETCH_ONE:
            return {
                eventData: action.payload
            }
        

        case CREATE:
            return {
                eventData: [...employees.eventData, action.payload],
            }

        case UPDATE:
            return {
                eventData: employees.eventData.map((employee)=> {
                if(employee._id === action.payload._id) {
                    return {...employee, ...action.payload}
                } else {
                    return employee
                }
            })}
            
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