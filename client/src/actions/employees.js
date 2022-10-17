import * as api from '../api';

// Action Creators 


export const getEmployees = () => async (dispatch) => {
    try {
        dispatch(showLoader())
        const { data } = await api.fetchPosts();
        dispatch({ type:'FETCH_ALL', payload: data });
        dispatch(hideLoader())
    } catch (error) {
        console.log(error.message)
    }
}

export const createEmployee = (employee) => async (dispatch) => {
    try {
        const { data } = await api.createEmployee(employee);

        dispatch({ type:'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateEmployee = (id, employee) => async (dispatch) => {
    try {
        const { data } = await api.updateEmployee(id, employee);

        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const showLoader = () => async (dispatch) => {
    dispatch({ type:'SHOW_LOADER' })
}

export const hideLoader = () => async (dispatch) => {
    dispatch({ type:'HIDE_LOADER' })
}