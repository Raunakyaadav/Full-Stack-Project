
import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-4 bg-white text-gray-700 px-6 lg:px-20 py-10 border-t">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Company Info */}
        <div className="md:col-span-1">
          <h2 className="font-bold text-lg">SWOO - 1ST NYC TECH ONLINE MARKET</h2>
          <p className="mt-4 text-sm">HOTLINE 24/7</p>
          <p className="text-xl lg:text-2xl font-bold text-green-500">(025) 3686 25 16</p>
          <p className="mt-2 text-sm">
            257 Thatcher Road St, Brooklyn, Manhattan, NY 10092
          </p>
          <p className="text-sm">contact@Swootechmart.com</p>
<div className="flex space-x-3 mt-4">
  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-400">
    <FaTwitter className="text-gray-600 hover:text-white text-xl " />
  </div>
  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-600">
    <FaFacebookF className="text-gray-600 hover:text-white text-xl " />
  </div>
  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-pink-500">
    <FaInstagram className="text-gray-600 hover:text-white text-xl " />
  </div>
  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-red-600">
    <FaYoutube className="text-gray-600 hover:text-white text-xl " />
  </div>
  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-red-500">
    <FaPinterestP className="text-gray-600 hover:text-white text-xl " />
  </div>
</div>



        </div>

        {/* Top Categories */}
        <div>
          <h3 className="font-bold mb-3">TOP CATEGORIES</h3>
          {['Laptops', 'PC & Computers', 'Cell Phones', 'Tablets', 'Gaming & VR', 'Networks', 'Cameras', 'Sounds', 'Office'].map((item) => (
            <p key={item} className="text-sm mb-1">{item}</p>
          ))}
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold mb-3">COMPANY</h3>
          {['About Swoo', 'Contact', 'Career', 'Blog', 'Sitemap', 'Store Locations'].map((item) => (
            <p key={item} className="text-sm mb-1">{item}</p>
          ))}
        </div>

        {/* Help Center */}
        <div>
          <h3 className="font-bold mb-3">HELP CENTER</h3>
          {['Customer Service', 'Policy', 'Terms & Conditions', 'Track Order', 'FAQs', 'My Account', 'Product Support'].map((item) => (
            <p key={item} className="text-sm mb-1">{item}</p>
          ))}
        </div>

        {/* Partner */}
        <div>
          <h3 className="font-bold mb-3">PARTNER</h3>
          {['Become Seller', 'Affiliate', 'Advertise', 'Partnership'].map((item) => (
            <p key={item} className="text-sm mb-1">{item}</p>
          ))}
        </div>
      </div>

      {/* Subscribe */}
      <div className="mt-10 border-t pt-8">
        <div className="text-center text-sm font-medium">
          SUBSCRIBE & GET <span className="text-red-500 font-bold">10% OFF</span> FOR YOUR FIRST ORDER
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="border px-4 py-2 rounded-md w-full sm:w-96 text-sm"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600">
            SUBSCRIBE
          </button>
        </div>
        <p className="text-center text-xs mt-2">By subscribing, you’re accepted the our <span className="underline cursor-pointer">Policy</span></p>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 border-t pt-4">
        <p>© {new Date().getFullYear()} <span className="font-bold text-black">ShawoTech ® Raunak</span>. All Rights Reserved</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <img src="https://img.icons8.com/color/48/paypal.png" alt="paypal" className="w-8" />
          <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="mastercard" className="w-8" />
          <img src="https://img.icons8.com/color/48/visa.png" alt="visa" className="w-8" />
          <img src="https://img.icons8.com/ios-filled/50/stripe.png" alt="stripe" className="w-8" />
          <img src="https://images.seeklogo.com/logo-png/37/1/google-pay-tez-logo-png_seeklogo-370704.png" alt="klarna" className="w-8" />
        </div>
        <a href="#" className="text-blue-500 mt-2 md:mt-0">Mobile Site</a>
      </div>
    </footer>
  );
}
