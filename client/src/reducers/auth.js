import { 
  AUTH_SUCCESS, 
  AUTH_ERROR, 
  LOG_OUT, 
  AUTH_CLEAR_ERROR, 
  AUTH_SHOW_LOADING, 
  AUTH_HIDE_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR
} from '../constants/actionTypes';

const initialState = {
  authData: null,
  users: [],
  isLoading: false
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
    
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.authData, action.payload],
        success: "Lietotājs veiksmīgi pievienots"
      }

    case CREATE_USER_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case LOG_OUT:
      localStorage.clear()
      return { 
        ...state, 
        authData: null
      }
    
    case AUTH_SHOW_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case AUTH_HIDE_LOADING:
      return {
        ...state,
        isLoading: false
      }

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export default authReducer
