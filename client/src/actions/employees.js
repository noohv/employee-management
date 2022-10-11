import * as api from '../api';

// Action Creators 
export const getEmployees = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        
        dispatch({ type:'FETCH_ALL', payload: data });
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