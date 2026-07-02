'use client'

import {AxiosAPI,notify} from "@/app/library/helper"
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

const AdminLogin = () => {
  const router = useRouter();
  function loginHandler(e){
    e.preventDefault() ;
    const data ={
      email : e.target.email.value ,
      password : e.target.password.value
    }
    AxiosAPI.post("/admin/login" ,data ,{withCredentials :true}).then(
      (res)=>{
        notify("Login successful", "success") ;
        router.push("/admin") ;
        console.log(res)
      }
    ).catch(
      (err)=>{
        notify("Login failed", "error") ;
        console.log(err)
      }
    )
  }
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-100 via-blue-50 to-slate-100 flex items-center justify-center px-4">
      
      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-300/30 blur-3xl rounded-full"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 sm:p-10">
        
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-300">
            <FaShieldAlt />
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-5">
            Admin Login
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={loginHandler} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="text-slate-700 text-sm font-medium mb-2 block">
              Email Address
            </label>

            <div className="flex items-center border border-slate-300 rounded-2xl px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">
              <FaEnvelope className="text-slate-400" />

              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                className="w-full px-3 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-slate-700 text-sm font-medium mb-2 block">
              Password
            </label>

            <div className="flex items-center border border-slate-300 rounded-2xl px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">
              <FaLock className="text-slate-400" />

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-3 py-4 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-br from-blue-600 to-cyan-500 hover:opacity-90 transition-all duration-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
          >
            Login
            <FaArrowRight />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          © 2026 Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;