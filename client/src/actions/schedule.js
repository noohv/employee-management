import { ADD_SCHEDULE_SUCCESS, ADD_SCHEDULE_ERROR, FETCH_SCHEDULES_SUCCESS, FETCH_SCHEDULES_ERROR, FETCH_SCHEDULE_SUCCESS, FETCH_SCHEDULE_ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const createSchedule = (schedule) => async (dispatch) => {
  try {
    const { data } = await api.createSchedule(schedule)
    dispatch({ type: ADD_SCHEDULE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_SCHEDULE_ERROR, payload: error })
  }
}

export const getSchedules = () => async (dispatch) => {
  try {
    const { data } = await api.getSchedules()
    dispatch({ type: FETCH_SCHEDULES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_SCHEDULES_ERROR, payload: error })
  }
}

export const getSchedule = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSchedule(id)
    dispatch({ type: FETCH_SCHEDULE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_SCHEDULE_ERROR, payload: error })
  }
}