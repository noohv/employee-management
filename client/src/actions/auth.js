import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {

        navigate.push('/')
    } catch (error) {
        console.log(error.message)
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        
        navigate.push('/')
    } catch (error) {
        console.log(error.message)
    }
}