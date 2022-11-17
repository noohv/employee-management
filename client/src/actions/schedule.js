import { CREATE_SCHEDULE, GET_SCHEDULES } from '../constants/actionTypes';
import * as api from '../api';

export const createSchedule = (schedule) => async (dispatch) => {
    try {
        const { data } = await api.createSchedule(schedule);

        dispatch({ type: CREATE_SCHEDULE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getSchedules = () => async (dispatch) => {
    try {
        const { data } = await api.getSchedules();
        dispatch({ type: GET_SCHEDULES, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}