import { AUTH, LOG_OUT } from '../constants/actionTypes';

const initialState = {
    authData: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));   
            return {...state, authData: action?.data };
        case LOG_OUT:
            localStorage.clear()
            return { ...state, authData: null}
        default:
            return state;
    }
}

export default authReducer;
