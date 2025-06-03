import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaAt, FaLock } from 'react-icons/fa6';
import { IoPersonOutline } from 'react-icons/io5';

const LoginPage = () => {

  const [type, setType] = useState('login');
  const [showPassword, SetShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const router = useRouter();

  const isLogin = type === 'login';


  return (
    <div className="max-h-screen min-h-screen flex items-center justify-center px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl bg-white overflow-hidden">
        <div className="p-8 sm:p-12 min-h-[750px] flex flex-col justify-center">
          <div className='flex flex-col items-center justify-center gap-8 mb-16'>
            <div className="flex items-center gap-2" href="#">
              <img src="/Logo.png" />
              <span className="font-semibold md:text-2xl">SIMS PPOB</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              {isLogin ? 'Masuk atau buat akun untuk memulai' : 'Lengkapi data untuk membuat akun'}
            </h2>
          </div>
          <form
            // onSubmit={handleSubmit} 
            className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
                  <FaAt size={14} />
                </div>
                <input
                  type="email"
                  placeholder="Masukkan Email Anda"
                  // value={formData.email}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, email: e.target.value })
                  // }
                  className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
                />
              </div>
            </div>
            {!isLogin && (
              <>
                <div>
                  <div className="relative">
                    <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
                      <IoPersonOutline size={14} />
                    </div>
                    <input
                      type="text"
                      placeholder="Nama Depan"
                      name='first_name'
                      // value={formData.email}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, email: e.target.value })
                      // }
                      className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
                      <IoPersonOutline size={14} />
                    </div>
                    <input
                      type="text"
                      name='last_name'
                      placeholder="Nama Belakang"
                      // value={formData.email}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, email: e.target.value })
                      // }
                      className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <div className="relative">
                <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
                  <FaLock size={14} />
                </div>
                <input
                  // type={showPassword ? 'text' : 'password'}
                  type="password"
                  placeholder={isLogin ? "Masukkan Password Anda" : "Buat Password"}
                  // value={formData.password}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, password: e.target.value })
                  // }
                  className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-600 cursor-pointer"
                // onClick={() => SetShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <div className="relative">
                  <div className="absolute left inset-y-0 flex items-center justify-center pl-3 pt-1 text-gray-400 text-sm">
                    <FaLock size={14} />
                  </div>
                  <input
                    // type={showPassword ? 'text' : 'password'}
                    type="password"
                    placeholder="Konfirmasi Password"
                    // value={formData.password}
                    // onChange={(e) =>
                    //   setFormData({ ...formData, password: e.target.value })
                    // }
                    className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md pl-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-600 cursor-pointer"
                  // onClick={() => SetShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>
            )}


            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-md flex items-center justify-center gap-2 text-white font-medium text-sm ${!loading
                ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                : 'bg-red-400 hover:bg-red-700 cursor-not-allowed'
                } }`}>
              {loading ? (
                <>
                  <LoadingSpinnerButton />
                  Processing...
                </>
              ) : isLogin ? (
                "Masuk"
              ) : (
                'Registrasi'
              )}
            </button>

            <p className="mt-6 text-sm text-center text-gray-600">
              {isLogin ? (
                <>
                  Belum punya akun? registrasi{' '}
                  <button
                    type="button"
                    className="text-red-600 hover:underline font-medium cursor-pointer">
                    di sini
                  </button>
                </>
              ) : (
                <>
                  Sudah punya akun? login{' '}
                  <button
                    type="button"
                    className="text-red-600 hover:underline font-medium cursor-pointer">
                    di sini
                  </button>
                </>
              )}
            </p>
          </form>
        </div>

        <div className="hidden md:block relative min-h[750px] w-full">
          <img
            src={'../../public/Illustrasi Login.png'}
            alt="Auth Images"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

    </div>
  )
}

export default LoginPage