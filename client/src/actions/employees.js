import { FETCH_ALL, FETCH_EMPLOYEE, CREATE, UPDATE, SHOW_LOADER, HIDE_LOADER, DELETE_EMPLOYEE, DELETE_ABSENCE, ADD_ABSENCE_ERROR, ADD_ABSENCE_SUCCESS } from '../constants/actionTypes';
import * as api from '../api';

// Employee action methods

// Action to get list of all employees
export const getEmployees = () => async (dispatch) => {
  try {
    dispatch(showLoader())
    const { data } = await api.fetchEmployees()
    dispatch({ type: FETCH_ALL, payload: data })
    dispatch(hideLoader())
  } catch (error) {
    console.log(error.message)
  }
}

export const getEmployee = (id) => async (dispatch) => {
  try {
    dispatch(showLoader())
    const { data } = await api.fetchEmployee(id)
    dispatch({ type: FETCH_EMPLOYEE, payload: data })
    dispatch(hideLoader())
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await api.deleteEmployee(id);
    dispatch({ type: DELETE_EMPLOYEE, payload: id })
  } catch (error) {
    console.log(error.message)
  }
}


export const createEmployee = (employee) => async (dispatch) => {
  try {
    const { data } = await api.createEmployee(employee);
    dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const updateEmployee = (id, employee) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployee(id, employee)
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const createAbsence = (id, absence) => async (dispatch) => {
  try {
    const { data } = await api.createAbsence(id, absence)
    
    dispatch({ type: ADD_ABSENCE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response.data.message
    dispatch({ type: ADD_ABSENCE_ERROR, payload: message})
  }
}

export const deleteAbsence = (id, empId) => async (dispatch) => {
  try {
    await api.deleteAbsence(id, empId)
    dispatch({ type: DELETE_ABSENCE, payload: id })
  } catch (error) {
    console.log(error.message)   
  }
}

export const showLoader = () => async (dispatch) => {
    dispatch({ type: SHOW_LOADER })
}

export const hideLoader = () => async (dispatch) => {
    dispatch({ type: HIDE_LOADER })
}