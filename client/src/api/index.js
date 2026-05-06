import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile && profile !== "undefined") {
    // Agar token seedha profile mein hai ya alag se hai
    const token = localStorage.getItem('token') || JSON.parse(profile).token;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);
export const getTasks = () => API.get('/tasks');
export const createNewTask = (data) => API.post('/tasks', data);
export const updateTaskStatus = (id, data) => API.patch(`/tasks/${id}`, data);
export const fetchTeam = () => API.get('/users/team');

export default API;