import api from '../api';
import { handleApiError } from '../utils/handleApiError';

export const login = async (userDataLogin) => {
  try {
    const response = await api.post('/login', userDataLogin);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Login gagal');
  }
};

export const register = async (userDataRegister) => {
  try {
    const response = await api.post('/registration', userDataRegister);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Registration gagal');
  }
};

export const profile = async (token) => {
  try {
    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Get Profile gagal');
  }
};
