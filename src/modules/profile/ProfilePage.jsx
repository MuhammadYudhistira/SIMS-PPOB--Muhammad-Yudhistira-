import { useEffect, useRef, useState } from 'react'
import { profile as fetchProfile } from '../../services/auth';
import { FaAt, FaPen } from 'react-icons/fa'
import { IoPersonOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, setProfile } from './profileSlice'
import { updateImageProfile, updateProfile } from '../../services/profile'
import Modal from '../../ui/Modal'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {

  const profile = useSelector(getProfile)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [image, setImage] = useState(profile.profile_image || '/Banner 1.png');
  const [imageFile, setImageFile] = useState(null);
  const [modal, setModal] = useState(null)
  const [type, setType] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);


  const [formData, setFormData] = useState({
    email: profile.email || "",
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
  });

  const loadProfile = async () => {
    const profileRes = await fetchProfile(localStorage.getItem('token') || '');
    dispatch(setProfile(profileRes.data));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setModal({
        message: 'Format gambar tidak valid. Gunakan JPG, PNG, atau WEBP.',
        type: 'danger',
      });
      return;
    }

    setImageFile(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      dispatch(setProfile(response?.data));

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);

        const imageRes = await updateImageProfile(imageFormData);
        dispatch(setProfile(imageRes?.data));
      }

      setModal({
        message: 'Profile updated Successfully',
        type: 'success',
      });
    } catch (error) {
      if (error instanceof Error) {
        setModal({
          message: error.message,
          type: 'danger',
        });
      } else {
        setModal({
          message: 'something went wrong',
          type: 'danger',
        });
      }
    } finally {
      setIsSubmitting(false);
      setType('profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  useEffect(() => {
    if (!profile?.email) {
      loadProfile();
    }
  }, []);

  useEffect(() => {
    if (profile?.email) {
      setFormData({
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
      });

      setImage(profile.profile_image || '/Banner 1.png');
    }
  }, [profile]);

  const isEdited = type === 'edit';

  return (
    <div className='w-[60%] flex flex-col items-center mx-auto px-4 py-6 space-y-6'>
      <div className='relative'>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <div
          onClick={triggerFileInput}
          className="absolute right-0 bottom-1.5 flex items-center justify-center text-sm bg-white rounded-full size-8 cursor-pointer border border-gray-300 hover:bg-gray-100 transition-all"
        >
          <FaPen size={12} />
        </div>

        <img src={image} alt="Preview" className='rounded-full size-44 object-cover' />
      </div>
      <h2 className='text-3xl font-semibold'>{profile.first_name} {profile.last_name}</h2>

      <form onSubmit={handleSubmit} className='w-full space-y-4'>

        <div>
          <label htmlFor="email">Email</label>
          <div className="relative">
            <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
              <FaAt size={14} />
            </div>
            <input
              type="email"
              placeholder="Masukkan Email Anda"
              readOnly
              name='email'
              value={formData.email}
              className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
            />
          </div>
        </div>
        <div>
          <label htmlFor="first_name">Nama Depan</label>

          <div className="relative">
            <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
              <IoPersonOutline size={14} />
            </div>
            <input
              type="text"
              placeholder="Nama Depan"
              name='first_name'
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
            />
          </div>
        </div>
        <div>
          <label htmlFor="last_name">Nama Belakang</label>

          <div className="relative">
            <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
              <IoPersonOutline size={14} />
            </div>
            <input
              type="text"
              name='last_name'
              placeholder="Nama Belakang"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
            />
          </div>
        </div>
        {isEdited ? (
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50">
            {isSubmitting ? 'Menyimpan' : 'Simpan'}
          </button>
        ) : (
          <>
            <button
              type="button"
              className="w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={() => setType('edit')}
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="w-full bg-white hover:bg-gray-100 cursor-pointer text-red-500 px-4 py-2 border border-red-300 rounded disabled:opacity-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </form>
      {modal && (
        <Modal
          message={modal.message}
          type={modal.type}
          onOk={() => setModal(null)}
        />
      )}
    </div>
  )
}

export default ProfilePage