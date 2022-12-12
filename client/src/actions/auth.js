import { 
  AUTH_SUCCESS, 
  AUTH_ERROR, 
  AUTH_SHOW_LOADING, 
  AUTH_HIDE_LOADING, 
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from '../constants/actionTypes';
import * as api from '../api';

const EXPIRY_TIME = 8 * (60 * 60 * 1000) // JWT token expiry time

// Redux action creator for user sign in
export const signin = (formData, navigate) => async (dispatch) => {
  let expiryDate = new Date(Date.now() + EXPIRY_TIME)
  dispatch({ type: AUTH_SHOW_LOADING })
  try {
    let { data } = await api.signIn(formData)
    data = {...data, expDate: expiryDate}
    dispatch({ type: AUTH_SUCCESS, payload: data })
    navigate('/', {replace: true})
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.message })
  }
  dispatch({ type: AUTH_HIDE_LOADING })
}

// Redux action creator for getting user list
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_SHOW_LOADING })
    let { data } = await api.getUsers()
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data })
    dispatch({ type: AUTH_HIDE_LOADING })
  } catch (error) {
    dispatch({ type: FETCH_USERS_ERROR, payload: error.response.data.message })
  }
}

// Redux action creator for user sign up
export const createUser = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_SHOW_LOADING })
  try {
    let { data } = await api.createUser(formData)
    dispatch({ type: CREATE_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CREATE_USER_ERROR, payload: error.response.data.message })
  }
  dispatch({ type: AUTH_HIDE_LOADING })
}

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: AUTH_SHOW_LOADING })
  try {
    await api.deleteUser(id)
    dispatch({ type: DELETE_USER_SUCCESS, payload: id })

  } catch (error) {
    dispatch({ type: DELETE_USER_ERROR, payload: error.response.data.message })
  }
  dispatch({ type: AUTH_HIDE_LOADING })
}
