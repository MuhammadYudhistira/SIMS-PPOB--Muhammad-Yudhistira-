import { createSlice } from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    filtered: [],
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload || [];
      state.filtered = action.payload || [];
    },
    setTransactionsByMonth: (state, action) => {
      const { month } = action.payload;

      if (month === 'All') {
        state.filtered = state.transactions;
      } else {
        state.filtered = state.transactions.filter((tx) => {
          const txMonth = new Date(tx.created_on).getMonth() + 1;
          return txMonth.toString().padStart(2, '0') === month;
        });
      }
    },
  },
});

export const { setTransactions, setTransactionsByMonth } =
  transactionsSlice.actions;

export default transactionsSlice;

export const getTransactions = (state) => state.transactions.transactions;
export const getFilteredTransactions = (state) => state.transactions.filtered;
