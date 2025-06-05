import { BiMenu } from "react-icons/bi"
import { Link, useResolvedPath } from "react-router-dom"

const Navbar = () => {
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
            <Link to={"/top-up"} className={`font-medium ${path === "/top-up" && "text-red-500"}`}>Top Up</Link>
            <Link to={"/transactions"} className={`font-medium ${path === "/transactions" && "text-red-500"}`}>Transaction</Link>
            <Link to={"/profile"} className={`font-medium ${path === "/profile" && "text-red-500"}`}>Akun</Link>
          </ul>
        </nav>

        <div className="block md:hidden">
          <button
            className="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
          >
            <BiMenu size={18} />
          </button>
        </div>
      </div>
    </header >
  )
}

export default Navbar