import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

const EXPIRY_TIME = 0.0166667

export const signin = (formData, navigate) => async (dispatch) => {
    let expiryDate = new Date(Date.now() + EXPIRY_TIME * (60 * 60 * 1000));
    try {
        let { data } = await api.signIn(formData);
        data = {...data, expDate: expiryDate}

        dispatch({ type: AUTH, data });

        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    let expiryDate = new Date(Date.now() + EXPIRY_TIME * (60 * 60 * 1000) );
    try {
        let { data } = await api.signUp(formData);
        data = {...data, expDate: expiryDate}
        
        dispatch({ type: AUTH, data });

        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}