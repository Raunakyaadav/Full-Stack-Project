'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineShoppingBag, HiOutlineArrowLeft, HiOutlineSearch } from 'react-icons/hi';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Soft Premium Background Accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-md h-112 blur-[130px] rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: '#01A49E' }}
      />

      <div className="text-center max-w-md w-full relative z-10 flex flex-col mt-10 items-center">
        
        {/* Animated Icon Container */}
        <div className="relative flex flex-col items-center justify-center mb-8">
          {/* Floating Bag */}
          <div className="animate-[bounce_3s_infinite] ease-in-out">
            <HiOutlineShoppingBag 
              className="text-8xl stroke-[1.2]" 
              style={{ color: '#01A49E' }} 
            />
          </div>
          {/* Dynamic Scaling Shadow */}
          <div className="w-12 h-1.5 bg-slate-900/10 rounded-full blur-[2px] mt-2 animate-[pulse_3s_infinite] ease-in-out" />
        </div>

        {/* Text Content */}
        <span 
          className="text-xs font-bold tracking-widest uppercase mb-2 block"
          style={{ color: '#01A49E' }}
        >
          Error Code 404
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          This seems empty.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xs mx-auto leading-relaxed">
          The product or page you are looking for isn't here. Let's get you back to your shopping journey!
        </p>

        {/* E-commerce Action Elements */}
        <div className="mt-10 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Secondary Action: Go Back */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-200"
          >
            <HiOutlineArrowLeft className="text-base" />
            Go Back
          </button>

          {/* Primary Action: Storefront */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-[#01A49E]/10 hover:shadow-[#01A49E]/20 transition-all duration-200 hover:opacity-95 active:scale-[0.98]"
            style={{ backgroundColor: '#01A49E' }}
          >
            <HiOutlineSearch className="text-base" />
            Continue Shopping
          </Link>

        </div>

        {/* Subtle Footer Links */}
        <div className="mt-12 pt-6 border-t border-slate-100 w-full flex justify-center gap-6 text-xs text-slate-400">
          <Link href="/collections" className="hover:text-slate-600 transition-colors">New Arrivals</Link>
          <Link href="/support" className="hover:text-slate-600 transition-colors">Get Help</Link>
        </div>

      </div>
    </div>
  );
}