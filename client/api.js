import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/store';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().auth.refreshToken;
        const userId = store.getState().auth.user?.id;
        const role = store.getState().auth.user?.role;

        const response = await axios.post('http://localhost:4000/auth/refresh-token', {
          refreshToken,
          userId,
          role
        });

        const { accessToken } = response.data;
        store.dispatch({ type: 'auth/refreshToken', payload: { accessToken } });
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;