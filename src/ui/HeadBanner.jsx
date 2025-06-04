import { useState } from 'react'
import bgSaldo from '/Background Saldo.png'
import { useSelector } from 'react-redux';
import { getProfile, loadUserBalance } from '../modules/profile/profileSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { formatRupiah } from '../utils/formatRupiah';


const HeadBanner = () => {

  const user = useSelector(getProfile);
  const balance = useSelector(loadUserBalance);

  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="flex flex-col justify-center items-center md:items-start md:gap-4">
        <div className="rounded-full mb-3 md:mb-0">
          <img
            src={user?.profile_image || '/Logo.png'}
            alt="User Avatar"
            className="object-contain size-16"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-gray-600 text-lg font-medium">Selamat datang,</p>
          <h2 className="text-3xl font-semibold">{user?.first_name} {user?.last_name}</h2>
        </div>
      </div>

      <div className=" text-white rounded-xl p-6 bg-cover" style={{ backgroundImage: `url(${bgSaldo})` }}>
        <p className="mb-2">Saldo anda</p>
        <h3 className="text-2xl font-bold mb-4 leading-10">Rp {showBalance ? formatRupiah(balance) : '•••••••'}</h3>
        <button className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-md cursor-pointer" onClick={() => setShowBalance(!showBalance)}>
          <span>Lihat Saldo</span>
          {showBalance ? <FaEye size={16} className="rotate-180" /> : <FaEyeSlash size={16} />}
        </button>
      </div>
    </div>
  )
}

export default HeadBanner