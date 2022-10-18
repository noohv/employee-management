import { AUTH, LOG_OUT } from '../constants/actionTypes';

const initialState = {
    authData: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data);
            return state;
        case LOG_OUT:
            return state;
    
        default:
            return state;
    }
}

export default authReducer;
