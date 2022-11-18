import { CREATE_JOBTITLE, FETCH_JOBTITLES } from '../constants/actionTypes';
import * as api from '../api';

export const createJobTitle = (jobTitle) => async (dispatch) => {
  try {
    const { data } = await api.createJobTitle(jobTitle)
    dispatch({ type: CREATE_JOBTITLE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const getJobTitles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchJobTitles()
    dispatch({ type: FETCH_JOBTITLES, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}