import { fetchBanner, fetchService } from '../services/information';
import { profile as fetchProfile } from '../services/auth';
import { useEffect } from 'react';
import BannerCard from '../ui/BannerCard';
import ServiceItem from '../ui/ServiceItem';
import { getBalance } from '../services/transactions';
import { getBanner, getServices, setInformation, setSelectedService } from './infromation/informationSlice';
import { getProfile, setProfile, updateBalance } from './profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import HeadBanner from '../ui/HeadBanner';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const banner = useSelector(getBanner);
  const services = useSelector(getServices);
  const user = useSelector(getProfile);


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

      if (!user?.email) {
        const profileRes = await fetchProfile(localStorage.getItem('token') || '');
        dispatch(setProfile(profileRes.data));
      }

      const balanceRes = await getBalance();
      dispatch(updateBalance({ balance: balanceRes.data.balance }));

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
      console.error({ message, type: 'danger' });
      if (error.message === "Token tidak tidak valid atau kadaluwarsa") {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleServiceClick = (code) => {
    dispatch(setSelectedService(code));
    navigate(`/transactions/${code}`);
  }

  useEffect(() => {
    pageData();
  }, []);


  return (
    <div className="container mx-auto px-4 py-6">
      <HeadBanner />

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 mt-16">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            icon={service.service_icon}
            label={service.service_name}
            code={service.service_code}
            onClick={() => handleServiceClick(service.service_code)}
          />
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
    </div>
  )
}

export default Homepage