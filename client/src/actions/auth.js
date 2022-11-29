import { AUTH_SUCCESS, AUTH_ERROR, AUTH_SHOW_LOADING, AUTH_HIDE_LOADING } from '../constants/actionTypes';
import * as api from '../api';

const EXPIRY_TIME = 8 * (60 * 60 * 1000) // 8 hour expiry time for JWT token

export const signin = (formData, navigate) => async (dispatch) => {
  let expiryDate = new Date(Date.now() + EXPIRY_TIME)
  try {
    dispatch({type: 'AUTH_SHOW_LOADING'})
    let { data } = await api.signIn(formData)
    data = {...data, expDate: expiryDate}
    dispatch({ type: AUTH_SUCCESS, payload: data })
    navigate('/', {replace: true})
    dispatch({type: 'AUTH_HIDE_LOADING'})
  } catch (error) {
    const message = error.response.data.message
    dispatch({ type: AUTH_ERROR, payload: message })
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  let expiryDate = new Date(Date.now() + EXPIRY_TIME)
  try {
    dispatch({type: 'AUTH_SHOW_LOADING'})
    let { data } = await api.signUp(formData)
    data = {...data, expDate: expiryDate}
    dispatch({ type: AUTH_SUCCESS, payload: data })
    navigate('/', {replace: true})
    dispatch({type: 'AUTH_HIDE_LOADING'})
  } catch (error) {
    const message = error.response.data.message
    dispatch({ type: AUTH_ERROR, payload: message })
  }
}