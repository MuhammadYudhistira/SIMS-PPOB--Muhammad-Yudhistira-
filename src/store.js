import { configureStore } from '@reduxjs/toolkit';
import authSlice from './modules/auth/authSlice';
import profileSlice from './modules/profile/profileSlice';
import informationSlice from './modules/infromation/informationSlice';
import transactionsSlice from './modules/transaction/transactionSlice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    information: informationSlice.reducer,
    transactions: transactionsSlice.reducer,
  },
});
