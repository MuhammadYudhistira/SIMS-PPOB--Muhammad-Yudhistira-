import api from '../api';
import getTokenHeader from '../utils/getTokenHeader';
import { handleApiError } from '../utils/handleApiError';

export const fetchBanner = async () => {
  try {
    const response = await api.get('/banner', {
      headers: getTokenHeader(),
    });

    return response?.data;
  } catch (error) {
    handleApiError(error, 'failed to fetch Banner');
  }
};

export const fetchService = async () => {
  try {
    const response = await api.get('/services', {
      headers: getTokenHeader(),
    });

    return response?.data;
  } catch (error) {
    handleApiError(error, 'failed to fetch Services');
  }
};
