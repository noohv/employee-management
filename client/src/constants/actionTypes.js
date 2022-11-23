/* 
    Constants for React Redux actions and reducers
*/

// Constants for employees

export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
// export const DELETE = 'DELETE';
export const FETCH_ALL = 'FETCH_ALL'
export const FETCH_EMPLOYEE = 'FETCH_EMPLOYEE'
export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'

export const CREATE_ABSENCE = 'CREATE_ABSENCE'
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE'
export const DELETE_ABSENCE = 'DELETE_ABSENCE'
export const ADD_ABSENCE_ERROR = 'ADD_ABSENCE_ERROR'
export const ADD_ABSENCE_SUCCESS = 'ADD_ABSENCE_SUCCESS'

export const FETCH_JOBTITLES = 'FETCH_JOBTITLES'
export const CREATE_JOBTITLE = 'CREATE_JOBTITLE'

export const GET_SCHEDULE = 'GET_SCHEDULE'
export const CREATE_SCHEDULE = 'CREATE_SCHEDULE'
export const GET_SCHEDULES = 'GET_SCHEDULES'

// Constants for Authorization

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR'
export const LOG_OUT = 'LOG_OUT'