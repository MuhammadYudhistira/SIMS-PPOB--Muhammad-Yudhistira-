import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: 'test',
    first_name: 'test',
    last_name: 'test',
    profile_image: 'test',
  },
  reducers: {
    setUser: (state, action) => {
      const { email, first_name, last_name, profile_image } = action.payload;
      state.email = email || '';
      state.first_name = first_name || '';
      state.last_name = last_name || '';
      state.profile_image = profile_image || '';
    },
    clearUser: (state) => {
      state.email = '';
      state.first_name = '';
      state.last_name = '';
      state.profile_image = '';
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice;

export const user = (state) => state.auth;
