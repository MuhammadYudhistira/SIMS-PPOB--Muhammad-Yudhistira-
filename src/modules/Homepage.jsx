import { FaEye, FaEyeSlash } from 'react-icons/fa'
import bgSaldo from '/Background Saldo.png'
import { fetchBanner, fetchService } from '../services/information';
import { profile as fetchProfile } from '../services/auth';
import { useEffect, useState } from 'react';
import BannerCard from '../ui/BannerCard';
import ServiceItem from '../ui/ServiceItem';
import { getBalance } from '../services/transactions';
import { setInformation } from './infromation/informationSlice';
import { setProfile } from './profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

const Homepage = () => {

  const dispatch = useDispatch()
  const { banner, services } = useSelector((state) => state.information);
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false)


  const pageData = async () => {
    try {
      if (!banner.length || !services.length) {
        const [bannerRes, serviceRes] = await Promise.all([
          fetchBanner(),
          fetchService()
        ]);
        dispatch(setInformation({
          banner: bannerRes.data,
          services: serviceRes.data,
        }));
      }

      const [profileRes, balanceRes] = await Promise.all([
        fetchProfile(localStorage.getItem('token') || ''),
        getBalance()
      ]);

      setUser(profileRes.data);
      setBalance(balanceRes.data.balance || 0);
      profileRes.data.balance = balanceRes.data.balance;
      dispatch(setProfile(profileRes.data));
    } catch (error) {
      if (error instanceof Error) {
        console.error({ message: error.message, type: 'danger' });
      } else {
        console.error({ message: 'Terjadi kesalahan', type: 'danger' });
      }
    }
  };

  useEffect(() => {
    pageData();
  }, []);

  return (
    <main className="container mx-auto px-4 py-6">
      {/* User Profile and Balance */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* User Profile */}
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
          {/* <h3 className="text-2xl font-bold mb-4 leading-10">Rp •••••••</h3> */}
          <h3 className="text-2xl font-bold mb-4 leading-10">Rp {showBalance ? balance : '•••••••'}</h3>
          <button className="flex items-center gap-2 text-sm bg-white/10 px-3 py-1 rounded-md cursor-pointer" onClick={() => setShowBalance(!showBalance)}>
            <span>Lihat Saldo</span>
            {showBalance ? <FaEye size={16} className="rotate-180" /> : <FaEyeSlash size={16} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 mt-16">
        {services.map((service, index) => (
          <ServiceItem key={index} icon={service.service_icon} label={service.service_name} />
        ))}
      </div>


      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Temukan promo menarik</h3>
        <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar">
          <div className="flex gap-2 w-max">
            {banner?.map((item, index) => (
              <BannerCard name={item.banner_name} src={item.banner_image} key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Homepage