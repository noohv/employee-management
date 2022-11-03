import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchEmployees = () => API.get('/employees');
export const createEmployee = (newEmployee) => API.post('/employees', newEmployee);
export const updateEmployee = (id,updatedData) => API.patch(`/employees/${id}`, updatedData);
export const fetchEmployee = (id) => API.get(`/employees/${id}`);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const createAbsence = (id, absence) => API.post(`employees/${id}/absence`, absence);
export const deleteAbsence = (id) => API.delete(`/employees/${id}/absence`)

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);