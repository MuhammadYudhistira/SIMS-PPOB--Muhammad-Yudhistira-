import { useSelector } from 'react-redux'
import { getSelectedService } from '../infromation/informationSlice'
import HeadBanner from '../../ui/HeadBanner'
import { formatRupiah, parseRupiah } from '../../utils/formatRupiah'
import { useState } from 'react'
import { FaRegCreditCard } from 'react-icons/fa'
import Modal from '../../ui/Modal'
import { payTransaction } from '../../services/transactions'
import { useNavigate } from 'react-router-dom'

const TransactionDetailPage = () => {

  const service = useSelector(getSelectedService)
  const navigate = useNavigate()

  const [total_amount, setTotalAmount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState(null);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const raw = parseRupiah(e.target.value);
    if (raw < 0) {
      setError('Jumlah tidak boleh kurang dari 0');
      setTotalAmount(0);
    } else {
      setError('');
      setTotalAmount(raw);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      service_code: service?.service_code,
    }
    try {
      await payTransaction(data)
      setModal({
        type: 'success',
        message: 'Pembayaran Berhasil',
        amount: formatRupiah(total_amount),
      });
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

      <div className='my-16 space-y-6 w-full'>
        <h3 className="text-xl font-medium">Pembayaran</h3>
        <div className="size-12 flex items-center justify-start rounded-lg gap-3 w-full">
          <img
            src={service?.service_icon}
            alt={service?.service_name}
            className="object-contain size-12"
          />
          <span className="text-lg text-left capitalize font-semibold">{service?.service_name}</span>
        </div>
      </div>

      <div className='space-y-6 md:col-span-2'>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="relative w-full">
          <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
            <FaRegCreditCard size={14} />
          </div>
          <input
            type="email"
            placeholder="Masukkan Jumlah Pembayaran"
            value={formatRupiah(total_amount)}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
          />
        </div>
        <button
          type='submit'
          disabled={total_amount <= 0}
          className='bg-red-500 px-4 py-2 w-full text-white font-medium rounded cursor-pointer disabled:bg-red-300'
          onClick={() => setShowModal(!showModal)}
        >
          Bayar
        </button>
      </div>

      {showModal && (
        <Modal
          type="information"
          message="Anda Yakin untuk melakukan Pembayaran sebesar"
          amount={formatRupiah(total_amount)}
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
            setTotalAmount(0);
            setModal(null);
            navigate('/')
          }}
        />
      )}
    </div>
  )
}

export default TransactionDetailPage