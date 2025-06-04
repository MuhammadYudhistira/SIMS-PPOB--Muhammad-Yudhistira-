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
    setSelectedService: (state, action) => {
      const code = action.payload;
      state.selectedService =
        state.services.find((service) => service.service_code === code) || null;
    },
  },
});

export const { setInformation, setSelectedService } = informationSlice.actions;
export default informationSlice;

export const getBanner = (state) => state.information.banner;
export const getServices = (state) => state.information.services;
export const getSelectedService = (state) => state.information.selectedService;
