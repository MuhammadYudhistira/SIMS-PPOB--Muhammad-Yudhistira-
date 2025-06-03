const Navbar = () => {
  return (
    <header className="mx-auto w-[80%] bg-white border-b border-gray-200">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="flex items-center gap-3" href="#">
              <img src="/Logo.png" />
              <span className="font-medium md:text-lg">SIMS PPOB</span>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-12 text-sm">
                <li>
                  <a className="font-medium transition hover:text-gray-500/75" href="#"> Top Up </a>
                </li>

                <li>
                  <a className="font-medium transition hover:text-gray-500/75" href="#"> Transaction </a>
                </li>

                <li>
                  <a className="font-medium transition hover:text-gray-500/75" href="#"> Akun </a>
                </li>
              </ul>
            </nav>
            {/* 
            <div className="block md:hidden">
              <button
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar