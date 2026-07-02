"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { FaCartArrowDown } from "react-icons/fa";
import MobileMenu from "./MobileMenu"; // Our client component
import SearchBar from "./searchBar";
import { useDispatch, useSelector } from "react-redux";
import { lstoCart } from "@/app/redux/features/cartSlice";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { lstoUser, UserLogout } from "@/app/redux/features/userSlice";
import { FaRegUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";


export default function Header() {
 const pathname = usePathname();
  const user = useSelector((state)=>state.user.data)
   const cartItem = useSelector((state) => state.cart);
 
  const [showMenu, setShowMenu] = useState(false);

  const dispatcher = useDispatch();

  useEffect(() => {
     dispatcher(lstoUser())
    dispatcher(lstoCart());
   
  }, []);

  function Logout(){
   dispatcher(UserLogout())
    localStorage.removeItem("token");
     localStorage.removeItem("user");
     localStorage.removeItem("loginAt");
  }

   const navLinks = [
    { name: "HOME", href: "/" },
    { name: "STORE", href: "/products" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-100 w-full ">
      <header className="flex items-center justify-between w-full py-3 px-4 shadow bg-white">
        <div className="flex items-center gap-3">
          {/* Client interaction handles mobile menu state */}
          <MobileMenu />

          <Link href={"/"}>
            <img
              className="responsive-logo"
              src="/LOGO.png"
              alt="Logo"
              width={150}
              height={48}
            />
          </Link>
        </div>

        {/* Desktop Nav (Pure HTML links, works perfectly on Server) */}
       <nav className="headerNav hidden md:flex gap-7 lg:gap-10 lg:text-sm font-semibold tracking-wider text-[#000000e1]">
      {navLinks.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative py-2 transition-all duration-300 ease-out group ${
              isActive ? "text-[#01A49E]" : "hover:text-[#01A49E]"
            }`}
          >
            {item.name}

            <span
              className={`absolute bottom-0 h-0.5 bg-[#01A49E] rounded-full transition-all duration-300 ease-out ${
                isActive
                  ? "left-0 w-full"
                  : "left-1/2 w-0 group-hover:left-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </nav>

        {/* Login/Register Section */}
        <div className="flex gap-3 md:pr-3 lg:gap-12 cart-section">
          <div className="relative flex items-center gap-3 md:mt-0">
            {/* User icon left side me rahega */}
            {user ? (
    <img onClick={() => setShowMenu(!showMenu)} onMouseEnter={() => setShowMenu(true)}
      src={user?.profilePic || "https://i.pravatar.cc/300"}
      alt="Profile"
      className="cursor-pointer w-10 h-10 lg:w-13 lg:h-13 rounded-full object-cover border-4 border-white shadow"
    />
  ) : (
    <FaRegUser  className="cursor-pointer text-xl lg:text-2xl text-gray-600" />
  )}

            {/* show menu */}
             {showMenu && (
       <div onMouseLeave={() => setShowMenu(false)}
        className= {` absolute left-0 mt-35 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50
        transition-all duration-300 ease-out origin-top-right
        ${
          showMenu
            ? "opacity-100 scale-100 translate-y-0 visible"
            : "opacity-0 scale-95 -translate-y-2 invisible"
        }`}
      >
        {/* Arrow */}
        <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>

        <Link href={"/user/profile"}>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
          <FaUser className="text-teal-600" />
          Profile
        </button>
        </Link>

        <button onClick={Logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
      )}

            {/* Welcome aur Link ek ke niche ek (flex-col) rahenge */}
            <div className="flex flex-col justify-center">
              <span className="text-gray-500 text-[10px] sm:text-xs leading-none mb-0.5">
                WELCOME
              </span>
              <Link
                href={user != null ? "/user/profile" : "/user/login"}
                className="font-semibold text-gray-600 lg:text-sm text-xs transition-colors duration-300 ease-in-out hover:text-[#01A49E] leading-tight"
              >
                {(user && user.name) || "LOG IN / REGISTER"}
              </Link>
            </div>
          </div>
          {/* Cart Section */}
          <div className="flex items-center gap-2 ">
            <div className="relative">
              <Link href="/cart">
                <FaCartArrowDown className="text-[26px] sm:text-3xl text-[#01A49E]" />
              </Link>
              <span className="absolute -top-3 left-6 text-white px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-[#03b7b1]  rounded-full">
                {cartItem.cart?.length || 0}
              </span>
            </div>
            <div className="hidden sm:flex flex-col ml-4 text-center">
              <span className="text-gray-500 text-xs">CART</span>
              <span className="text-gray-700 font-bold text-sm">
                ₹{cartItem?.final_total}
              </span>
            </div>
          </div>
        </div>
      </header>
      <SearchBar />
    </div>
  );
}
