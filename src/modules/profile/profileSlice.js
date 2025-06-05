import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    email: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    balance: 0,
  },
  reducers: {
    setProfile: (state, action) => {
      const { email, first_name, last_name, profile_image } = action.payload;
      console.log(action.payload);
      state.email = email || '';
      state.first_name = first_name || '';
      state.last_name = last_name || '';
      state.profile_image = profile_image || '';
    },
    updateBalance: (state, action) => {
      state.balance = action.payload.balance || 0;
    },
    clearProfile: (state) => {
      state.email = '';
      state.first_name = '';
      state.last_name = '';
      state.profile_image = '';
    },
  },
});

export const { setProfile, clearProfile, updateBalance } = profileSlice.actions;
export default profileSlice;

export const getProfile = (state) => state.profile;
export const loadUserBalance = (state) => state.profile.balance;
