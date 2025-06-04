import { configureStore } from '@reduxjs/toolkit';
import authSlice from './modules/auth/authSlice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
