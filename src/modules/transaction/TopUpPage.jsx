import React, { useState } from 'react'
import HeadBanner from '../../ui/HeadBanner'
import { FaRegCreditCard } from 'react-icons/fa6'
import { formatRupiah, parseRupiah } from '../../utils/formatRupiah'
import Modal from '../../ui/Modal'
import { topUp } from '../../services/transactions'
import { useDispatch } from 'react-redux'
import { updateBalance } from '../profile/profileSlice'

const TopUpPage = () => {

  const dispatch = useDispatch()
  const [top_up_amount, setTopUpAmount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState(null);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const raw = parseRupiah(e.target.value);
    if (raw < 0) {
      setError('Jumlah tidak boleh kurang dari 0');
      setTopUpAmount(0);
    } else {
      setError('');
      setTopUpAmount(raw);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      top_up_amount: top_up_amount,
    }
    try {
      const response = await topUp(data)
      setModal({
        type: 'success',
        message: 'Top Up Berhasil',
        amount: formatRupiah(top_up_amount),
      });
      dispatch(updateBalance({ balance: response?.data?.balance }))
    } catch (error) {
      if (error instanceof Error) {
        setModal({ message: error.message, type: 'danger' });
      } else {
        setModal({ message: 'Terjadi Kesalahan', type: 'danger' });
      }
    } finally {
      setShowModal(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <HeadBanner />

      <div className='my-16'>
        <h3 className="text-lg">Silahkan masukkan</h3>
        <h2 className="text-3xl font-bold">Nominal Top Up</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='space-y-6 md:col-span-2'>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="relative w-full">
            <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
              <FaRegCreditCard size={14} />
            </div>
            <input
              type="email"
              placeholder="Masukkan Jumlah Top Up"
              value={formatRupiah(top_up_amount)}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
            />
          </div>
          <button
            type='submit'
            disabled={top_up_amount <= 0}
            className='bg-red-500 px-4 py-2 w-full text-white font-medium rounded cursor-pointer disabled:bg-red-300'
            onClick={() => setShowModal(!showModal)}
          >
            Top Up
          </button>
        </div>
        <div className='w-full'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='px-4 py-3 border border-gray-300 rounded cursor-pointer' onClick={() => setTopUpAmount(10_000)}>Rp10.000</div>
            <div className='px-4 py-3 border border-gray-300 rounded cursor-pointer' onClick={() => setTopUpAmount(20_000)}>Rp20.000</div>
            <div className='px-4 py-3 border border-gray-300 rounded cursor-pointer' onClick={() => setTopUpAmount(50_000)}>Rp50.000</div>
            <div className='px-4 py-3 border border-gray-300 rounded cursor-pointer' onClick={() => setTopUpAmount(100_000)}>Rp100.000</div>
            <div className='px-4 py-3 border border-gray-300 rounded cursor-pointer' onClick={() => setTopUpAmount(250_000)}>Rp250.000</div>
            <div className='px-4 py-3 border border-gray-300 rounded cursor-pointer' onClick={() => setTopUpAmount(500_000)}>Rp500.000</div>

          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          type="information"
          message="Anda Yakin untuk melakukan top up sebesar"
          amount={formatRupiah(top_up_amount)}
          onOk={handleSubmit}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      )}

      {modal && (
        <Modal
          type={modal.type}
          message={modal.message}
          amount={modal.amount}
          onOk={() => {
            setTopUpAmount(0);
            setModal(null);
          }}
        />
      )}
    </div>
  )
}

export default TopUpPage