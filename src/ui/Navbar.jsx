import { useState } from "react";
import { BiMenu } from "react-icons/bi"
import { FaXmark } from "react-icons/fa6";
import { Link, useNavigate, useResolvedPath } from "react-router-dom"

const Navbar = () => {

  const listNavbar = [
    { name: "Top Up", path: "/top-up" },
    { name: "Transaction", path: "/transactions" },
    { name: "Akun", path: "/Profile" },
  ];

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const path = useResolvedPath().pathname
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <Link to={"/"} className="flex items-center gap-3">
            <img src="/Logo.png" />
            <span className="font-medium md:text-lg">SIMS PPOB</span>
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            {listNavbar.map((item, index) => (
              <Link key={index} to={item.path} className={`font-medium ${path === item.path && "text-red-500"}`}>{item.name}</Link>
            ))}
          </ul>
        </nav>

        <div className="block md:hidden">
          <button
            className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BiMenu size={18} />
          </button>
        </div>

        <>
          <div
            className={`fixed top-0 left-0 mx-auto flex h-[100vh] w-full items-center justify-between bg-black/50 px-4 ${isOpen ? "z-50 overflow-hidden opacity-100" : "-z-1 opacity-0"
              }`}
            onClick={() => setIsOpen(!isOpen)}
          ></div>
          <aside
            className={`${isOpen ? "z-50 -translate-x-0" : "-z-1 translate-x-100"
              } fixed top-0 right-0 h-[100vh] w-64 bg-white transition-transform duration-300 2xl:absolute 2xl:h-full`}
          >
            <div className="flex h-full flex-col items-center justify-center">
              <button
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaXmark />
              </button>

              {listNavbar.map((item, index) => (
                <p
                  key={index}
                  className="w-full text-center cursor-pointer px-4 py-2 text-lg font-semibold text-(--text-color-black) opacity-80 transition duration-300 ease-in-out  hover:opacity-100 hover:bg-white"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </aside>
        </>
      </div>
    </header >
  )
}

export default Navbar