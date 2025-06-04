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

export const topUp = async (data) => {
  try {
    const response = await api.post('/topup', data, {
      headers: getTokenHeader(),
    });

    return response?.data;
  } catch (error) {
    handleApiError(error, 'failed to top up balance');
  }
};

export const payTransaction = async (data) => {
  try {
    const response = await api.post('/transaction', data, {
      headers: getTokenHeader(),
    });

    return response?.data;
  } catch (error) {
    handleApiError(error, 'failed to pay transaction');
  }
};
