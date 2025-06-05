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

export const getTransactionHistory = async (offset = 0, limit = 5) => {
  try {
    const response = await api.get(
      `/transaction/history?limit=${limit}&offset=${offset}`,
      {
        headers: getTokenHeader(),
      }
    );

    return response?.data;
  } catch (error) {
    handleApiError(error, 'failed to fetch transaction history');
  }
};
