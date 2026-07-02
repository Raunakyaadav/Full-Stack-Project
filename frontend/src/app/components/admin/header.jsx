import {
  FaCog,
  FaBell,
  FaTh,
  FaSearch,
  FaBars,
} from "react-icons/fa";

export default function Header() {
  return (
      <header className="bg-white sticky top-0 shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-2xl text-gray-700">
              <FaBars />
            </button>

            <div className="relative">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-xl text-gray-600">
              <FaBell />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <h3 className="font-semibold text-gray-800">Raunak</h3>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>
  );
}