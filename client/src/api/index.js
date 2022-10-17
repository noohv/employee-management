import axios from 'axios';

const url = 'http://localhost:5000/employees';

export const fetchPosts = () => axios.get(url);
export const createEmployee = (newEmployee) => axios.post(url, newEmployee);
export const updateEmployee = (id,updatedData) => axios.patch(`${url}/${id}`, updatedData);