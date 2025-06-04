import api from '../api';
import getTokenHeader from '../utils/getTokenHeader';
import { handleApiError } from '../utils/handleApiError';

export const getBalance = async () => {
  try {
    const response = await api.get('/balance', {
      headers: getTokenHeader(),
    });

    return response?.data;
  } catch (error) {
    handleApiError(error, 'failed to fetch balance');
  }
};
