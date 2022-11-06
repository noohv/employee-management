import { CREATE_JOBTITLE, FETCH_JOBTITLES } from '../constants/actionTypes';

let initialState = { 
    data: [],
}

export default (state = initialState , action) => {
    switch(action.type) {
        case FETCH_JOBTITLES:
            return {
                ...state,
                data: action.payload,
            }

        case CREATE_JOBTITLE:
            return {
                data: [...state.data, action.payload],
            }

        default:
            return state;
    }
}