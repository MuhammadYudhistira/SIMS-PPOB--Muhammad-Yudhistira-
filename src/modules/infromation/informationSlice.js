import { createSlice } from '@reduxjs/toolkit';

export const informationSlice = createSlice({
  name: 'profile',
  initialState: {
    banner: [],
    services: [],
  },
  reducers: {
    setInformation: (state, action) => {
      const { banner, services } = action.payload;
      state.banner = banner || [];
      state.services = services || [];
    },
  },
});

export const { setInformation } = informationSlice.actions;
export default informationSlice;

export const getBanner = (state) => state.information.banner;
export const getServices = (state) => state.information.services;
