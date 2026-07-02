'use client'
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";



export default function OrderSuccess() {
 const { order_id } = useParams();

 
  return (
   <div className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-10 px-4 overflow-hidden">

  {/* Background Blur */}
  <div className="absolute w-52 h-52 bg-green-300/20 rounded-full blur-3xl top-5 left-5 animate-pulse"></div>
  <div className="absolute w-60 h-60 bg-emerald-300/15 rounded-full blur-3xl bottom-5 right-5 animate-pulse"></div>

  {/* Card */}
  <div className="relative bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-lg w-full text-center border border-green-100 animate-[fadeIn_.8s_ease]">

    {/* Success Icon */}
    <div className="flex justify-center animate-bounce mb-5">
      <div className="relative w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

        <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping opacity-30"></div>

        <svg
          className=" w-10 h-10 text-green-600 animate-[scale_.5s_ease]"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    {/* Heading */}
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
      Thank You!
    </h1>

    <p className="mt-2 text-gray-600">
      Your order has been placed successfully.
    </p>

    {/* Order Card */}
    <div className="mt-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">

      <div className="flex justify-between py-2">
        <span className="text-gray-500">Order ID</span>
        <span className="font-semibold">{order_id}</span>
      </div>

      <div className="flex justify-between py-2 border-t border-green-100">
        <span className="text-gray-500">Payment</span>
        <span className="font-semibold text-green-600">
          Successful
        </span>
      </div>

      <div className="flex justify-between py-2 border-t border-green-100">
        <span className="text-gray-500">Estimated Delivery</span>
        <span className="font-semibold">
          3 - 5 Days
        </span>
      </div>

    </div>

    {/* Message */}
    <p className="mt-5 text-sm text-gray-500 leading-6">
      We've received your order and are preparing it for shipment.
      You'll receive tracking details shortly.
    </p>

    {/* Buttons */}
    <div className="mt-6 flex flex-col sm:flex-row gap-3">

      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105">
        Track Order
      </button>

    <Link href={'/products'}>
    <button className="flex-1 px-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105">
        Continue Shopping
      </button>

    </Link>  
    </div>

  </div>
</div>
  );
}