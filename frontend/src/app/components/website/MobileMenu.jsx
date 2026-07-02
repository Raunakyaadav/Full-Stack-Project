// components/MobileMenu.tsx
"use client";

import { HiHome, HiShoppingBag, HiInformationCircle, HiPhone } from "react-icons/hi2"; // Premium Icons
import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown, IoMdMenu, IoMdClose } from "react-icons/io";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button */}
      <button className="md:hidden text-3xl text-gray-800" onClick={toggleSidebar}>
        <IoMdMenu />
      </button>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Drawer */}
     <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col md:hidden ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}>
  
  {/* Header Section */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
    <div className="flex items-center space-x-2">
      {/* Brand Color Indicator */}
      <div className="w-2.5 h-6 bg-[#01A49E] rounded-full"></div>
      <span className="font-bold text-lg tracking-wider text-gray-800">MENU</span>
    </div>
    <button 
      onClick={toggleSidebar} 
      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200 text-2xl"
    >
      <IoMdClose />
    </button>
  </div>

  {/* Navigation Links */}
  <nav className="flex-1 flex flex-col px-3 py-4 gap-1 overflow-y-auto">
    
    <Link 
      href="/" 
      onClick={toggleSidebar}
      className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-[#01A49E]/10 hover:text-[#01A49E] transition-all duration-200 group"
    >
      <HiHome className="text-xl text-gray-400 group-hover:text-[#01A49E] transition-colors" />
      <span>Home</span>
    </Link>

    <Link 
      href="/products" 
      onClick={toggleSidebar}
      className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-[#01A49E]/10 hover:text-[#01A49E] transition-all duration-200 group"
    >
      <HiShoppingBag className="text-xl text-gray-400 group-hover:text-[#01A49E] transition-colors" />
      <span>Store</span>
    </Link>

    <Link 
      href="/about" 
      onClick={toggleSidebar}
      className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-[#01A49E]/10 hover:text-[#01A49E] transition-all duration-200 group"
    >
      <HiInformationCircle className="text-xl text-gray-400 group-hover:text-[#01A49E] transition-colors" />
      <span>About Us</span>
    </Link>

    <Link 
      href="/contact" 
      onClick={toggleSidebar}
      className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-[#01A49E]/10 hover:text-[#01A49E] transition-all duration-200 group"
    >
      <HiPhone className="text-xl text-gray-400 group-hover:text-[#01A49E] transition-colors" />
      <span>Contact</span>
    </Link>

  </nav>

  {/* Sidebar Bottom/Footer Section (Optional but looks great) */}
  <div className="p-4 border-t border-gray-100 bg-gray-50/50">
    <p className="text-xs text-center text-gray-400 font-medium">
      © {new Date().getFullYear()} YourBrand. All rights reserved.
    </p>
  </div>

</div>
    </>
  );
}