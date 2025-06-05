import api from '../api';
import getTokenHeader from '../utils/getTokenHeader';
import { handleApiError } from '../utils/handleApiError';

export const updateProfile = async (data) => {
  try {
    const response = await api.put('/profile/update', data, {
      headers: getTokenHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Update Profile Gagal');
  }
};

export const updateImageProfile = async (data) => {
  try {
    const response = await api.put('/profile/image', data, {
      headers: {
        ...getTokenHeader(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Update Profile Gagal');
  }
};
