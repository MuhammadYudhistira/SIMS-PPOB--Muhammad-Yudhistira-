import React, { useEffect, useMemo, useState } from 'react'
import HeadBanner from '../../ui/HeadBanner'
import { getTransactionHistory } from '../../services/transactions'
import { getFilteredTransactions, setTransactions, setTransactionsByMonth } from './transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatRupiah } from '../../utils/formatRupiah';

const TransactionsPage = () => {

  const dispatch = useDispatch();
  const transactions = useSelector(getFilteredTransactions);
  const limit = 5;
  const [isAllDataFetched, setIsAllDataFetched] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const months = useMemo(() => {
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('id-ID', { month: 'long' });

    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth() - 3 + i);
      return {
        label: formatter.format(date),
        value: `${(date.getMonth() + 1).toString().padStart(2, '0')}`
      };
    });
  }, [])

  const fetchLatestTransactions = async () => {
    try {
      const response = await getTransactionHistory(0, limit);
      const newRecords = response?.data?.records || [];

      dispatch(setTransactions(newRecords));
      dispatch(setTransactionsByMonth({ month: 'All' }));
      setIsAllDataFetched(newRecords.length < limit);
    } catch (error) {
      console.error({ message: error?.message || 'Terjadi kesalahan', type: 'danger' });
    }
  };

  const loadMoreTransactions = async () => {
    const currentOffset = transactions.length;
    try {
      const response = await getTransactionHistory(currentOffset, limit);
      const moreRecords = response?.data?.records || [];

      if (moreRecords.length === 0) {
        setIsAllDataFetched(true);
        return;
      }
      dispatch(setTransactions([...transactions, ...moreRecords]));

      if (!selectedMonth === "All" || selectedMonth) {
        dispatch(setTransactionsByMonth({ month: selectedMonth }));
      }
    } catch (error) {
      console.error({ message: error?.message || 'Terjadi kesalahan', type: 'danger' });
    }
  };


  const handleClickMore = () => {
    loadMoreTransactions();
  };

  useEffect(() => {
    fetchLatestTransactions();
  }, []);

  const handleSelectedMonth = (month) => {
    setSelectedMonth(month);
    dispatch(setTransactionsByMonth({
      month: month,
    }));
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <HeadBanner />

      <div className='mb-6'>
        <h3 className="text-2xl font-semibold">Semua Transaksi</h3>
        <div className='space-x-4 text-gray-500 font-medium'>
          <button
            onClick={() => handleSelectedMonth("All")}
            className={selectedMonth === "All" ? 'text-black font-semibold' : ''}
          >Semua</button>
          {months.map((month) => (
            <button
              key={month.value}
              onClick={() => handleSelectedMonth(month.value)}
              className={selectedMonth === month.value ? 'text-black font-semibold' : ''}
            >
              {month.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {transactions.length !== 0 ? (
          <>
            {transactions.map((transaction, index) => {
              const date = new Date(transaction.created_on);

              const tanggal = date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });

              const jam = date.getHours().toString().padStart(2, '0');
              const menit = date.getMinutes().toString().padStart(2, '0');
              const transactionDate = `${tanggal} ${jam}:${menit} WIB`;

              return (
                <div
                  key={index}
                  className="w-full flex justify-between items-start px-4 py-2 gap-4 border border-gray-200 rounded-lg"
                >
                  <div className="space-y-2">
                    <h3
                      className={`text-2xl ${transaction?.transaction_type === 'PAYMENT'
                        ? 'text-red-500'
                        : 'text-teal-500'
                        } font-medium`}
                    >
                      {transaction?.transaction_type === 'PAYMENT' ? '- ' : '+ '}
                      Rp {formatRupiah(transaction?.total_amount)}
                    </h3>
                    <p className="text-xs text-gray-300">{transactionDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {transaction.description}
                    </h3>
                  </div>
                </div>
              );
            })}

            {isAllDataFetched ? (
              <p className="w-full mt-6 text-center font-semibold text-gray-500">
                Semua data telah ditampilkan
              </p>
            ) : (
              <button
                className="w-full mt-6 font-semibold text-red-500 cursor-pointer"
                onClick={handleClickMore}
              >
                Show More
              </button>
            )}
          </>
        ) : (
          <p className="w-full mt-6 text-center font-semibold text-gray-500">
            Tidak ada transaksi yang ditemukan
          </p>
        )}
      </div>

    </div>
  )
}

export default TransactionsPage