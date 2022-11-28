import { AUTH_SUCCESS, AUTH_ERROR, LOG_OUT, AUTH_CLEAR_ERROR} from '../constants/actionTypes';

const initialState = {
  authData: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ ...action.payload })) 
      return {
        ...state, 
        authData: action.payload, 
        success: 'Pieslēgšanās veiksmīga!' 
      }

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    
    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    
    case LOG_OUT:
      localStorage.clear()
      return { 
        ...state, 
        authData: null
      }

    default:
      return state
  }
}

export default authReducer
