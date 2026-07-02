"use client"
import Link from "next/link";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaChevronDown } from "react-icons/fa";

export default function Contact() {
  const [open,setOpen]=useState(null);
  const faqs=[
    ["How long does delivery take?","Most orders arrive in 3-7 business days."],
    ["Can I return a product?","Yes, within 7 days if eligible."],
    ["How can I track my order?","Track it from your account orders page."],
    ["Do you offer support?","Yes, our team is available 24/7."]
  ];
  return (
    <>
      <div className='flex pl-4 flex-row items-center
             py-6 shadow-lg rounded-md font-bold text-sm text-gray-400'>Home /
                <span className='text-gray-800 ml-1'> Contact Us</span> </div>
     <div className="bg-gradient-to-br pt-10 from-teal-50 via-white to-teal-100 min-h-screen">
    
      {/* <section className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-teal-100 max-w-2xl mx-auto">Have questions? We'd love to hear from you.</p>
        </div>
      </section> */}

     

      <div className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input className="border rounded-md p-3 focus:ring-4 focus:ring-teal-100 outline-none" placeholder="First Name"/>
              <input className="border rounded-md p-3 focus:ring-4 focus:ring-teal-100 outline-none" placeholder="Last Name"/>
            </div>
            <input className="w-full border rounded-md p-3 focus:ring-4 focus:ring-teal-100 outline-none" placeholder="Email"/>
            <input className="w-full border rounded-md p-3 focus:ring-4 focus:ring-teal-100 outline-none" placeholder="Phone"/>
            <input className="w-full border rounded-md p-3 focus:ring-4 focus:ring-teal-100 outline-none" placeholder="Subject"/>
            <textarea rows="6" className="w-full border rounded-md p-3 focus:ring-4 focus:ring-teal-100 outline-none" placeholder="Message"></textarea>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-l font-semibold">Send Message</button>
          </form>
        </div>

        <div className="space-y-6">
           <img src="/laptop-user.png" alt="" />
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-5 text-gray-700">
              <p className="flex gap-3"><FaMapMarkerAlt className="text-teal-600 mt-1"/>123 Market Street, New Delhi</p>
              <p className="flex gap-3"><FaPhoneAlt className="text-teal-600 mt-1"/>+91 9876543210</p>
              <p className="flex gap-3"><FaEnvelope className="text-teal-600 mt-1"/>support@example.com</p>
              <p className="flex gap-3"><FaClock className="text-teal-600 mt-1"/>Mon - Sat : 9 AM - 8 PM</p>
            </div>
            <div className="flex gap-3 mt-8">
              {[FaFacebookF,FaInstagram,FaTwitter,FaLinkedin].map((I,i)=><div key={i} className="w-11 h-11 rounded-full bg-teal-50 hover:bg-teal-600 hover:text-white transition flex items-center justify-center"><I/></div>)}
            </div>
          </div>
        
        </div>
       
      </div>

    

      <div className="max-w-7xl mx-auto px-6 py-10">
        <iframe title="map" className="w-full h-[400px] rounded-lg shadow-xl border"
          src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"/>
      </div>
        <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f,i)=>(
            <div key={i} className="bg-white rounded-2xl shadow">
              <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between p-5 font-semibold">
                {f[0]} <FaChevronDown className={open===i?"rotate-180 transition":"transition"}/>
              </button>
              {open===i && <div className="px-5 pb-5 text-gray-600">{f[1]}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
   
  );
}
