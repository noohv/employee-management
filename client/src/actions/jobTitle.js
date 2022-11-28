import { ADD_JOBTITLE_SUCCESS, ADD_JOBTITLE_ERROR, FETCH_JOBTITLES_SUCCESS, FETCH_JOBTITLES_ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const createJobTitle = (jobTitle) => async (dispatch) => {
  try {
    const { data } = await api.createJobTitle(jobTitle)
    dispatch({ type: ADD_JOBTITLE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_JOBTITLE_ERROR, payload: error.response.data.message })
  }
}

export const getJobTitles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchJobTitles()
    dispatch({ type: FETCH_JOBTITLES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_JOBTITLES_ERROR, payload: error.response.data.message })
  }
}