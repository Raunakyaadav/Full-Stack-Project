"use client";

import { AxiosAPI } from "@/app/library/helper";
import { useState } from "react";
import {FaUser, FaShoppingBag, FaMapMarkerAlt, FaLock, FaArrowRight, FaHome, FaPlus, FaEdit,  FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";


export default function ProfilePage() {
    const [showAddressForm, setShowAddressForm] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
   const user = useSelector((state)=>state.user.data)
   const address = user?.shipping_address;

const [popup, setPopup] = useState({
  show: false,
  message: "",
  type: "",
});

const handleSaveAddress = async (e) => {
  e.preventDefault();

  const data = { street:e.target.street.value,
    city:e.target.city.value,
    state:e.target.state.value, 
    postalCode:e.target.postalCode.value,
    country:e.target.country.value }

  // Validation
  if (
    !data.street.trim() ||
    !data.city.trim() ||
    !data.state.trim() ||
    !data.postalCode.trim() ||
    !data.country.trim()
  ) {
    setPopup({
      show: true,
      message: "All fields are required ❌",
      type: "error",
    });

    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 2000);

    return;
  }

  // API Call
const res = await AxiosAPI.put(`/user/address/${user._id}`, data);
console.log(res)

  setPopup({
    show: true,
    message: "Address Added Successfully ✅",
    type: "success",
  });

  setShowAddressForm(false);

  setTimeout(() => {
    setPopup({ show: false, message: "", type: "" });
  }, 2000);
};
 



  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-8 p-6">

          {/* SIDEBAR */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-2xl p-5">

              {/* User */}
              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/300"
                  alt=""
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow"
                />

                <h2 className="text-xl font-bold mt-4">
                  {user?.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  {user?.email}
                </p>
              </div>

              {/* Menu */}
              <div className="mt-8 space-y-3">

                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition ${
                    activeTab === "account"
                      ? "bg-teal-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaUser />
                    <span>Account Info</span>
                  </div>
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition ${
                    activeTab === "orders"
                      ? "bg-teal-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaShoppingBag />
                    <span>My Orders</span>
                  </div>
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => setActiveTab("address")}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition ${
                    activeTab === "address"
                      ? "bg-teal-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt />
                    <span>My Address</span>
                  </div>
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition ${
                    activeTab === "password"
                      ? "bg-teal-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaLock />
                    <span>Change Password</span>
                  </div>
                  <FaArrowRight />
                </button>

              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-9">

            {/* ACCOUNT INFO */}
            {activeTab === "account" && (
              <div>
                <h1 className="text-3xl font-bold mb-6">
                  Account Information
                </h1>

                <div className="bg-white border rounded-2xl p-6">
                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                  </div>

                  <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700">
                    Update Profile
                  </button>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <div>
                <h1 className="text-3xl font-bold mb-6">
                  My Orders
                </h1>

                <div className="bg-white border rounded-2xl p-6">
                  <p className="text-gray-500">
                    No Orders Found
                  </p>
                </div>
              </div>
            )}

            {/* ADDRESS */}
           {activeTab === "address" && (
  <div>
    {!showAddressForm ? (
      <>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            My Address
          </h1>

          <button
            onClick={() => setShowAddressForm(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl"
          >
            <FaPlus />
            Add Address
          </button>
        </div>

        {/* Address Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {address.map((address) => (
            <div
              key={address.id}
              className="border rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-3">
                {address.type}
              </h3>

              <p>{address.street}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.postalCode}</p>
              <p>{address.country}</p>
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        {/* Address Form */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Create Address
          </h1>

          <button
            onClick={() => setShowAddressForm(false)}
            className="border px-4 py-2 rounded-lg"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSaveAddress} className="bg-white border rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Street
              </label>
              <input
                type="text"
                name="street"
                className="w-full border rounded-xl p-3"
                placeholder="Enter Street"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                City
              </label>
              <input
                type="text"
                name="city"
                className="w-full border rounded-xl p-3"
                placeholder="Enter City"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                State
              </label>
              <input
                type="text"
                name="state"
                className="w-full border rounded-xl p-3"
                placeholder="Enter State"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                className="w-full border rounded-xl p-3"
                placeholder="Enter Postal Code"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="w-full border rounded-xl p-3"
                placeholder="Enter Country"
              />
            </div>

          </div>

          <button  type="submit" className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-xl">
            Save Address
          </button>
        </form>
      </>
    )}
  {popup.show && (
  <div className="fixed top-5 right-5 z-50">
    <div
      className={`px-6 py-4 rounded-xl shadow-xl text-white font-medium ${
        popup.type === "success"
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      {popup.message}
    </div>
  </div>
)}
  </div>
)}

            {/* PASSWORD */}
            {activeTab === "password" && (
              <div>
                <h1 className="text-3xl font-bold mb-6">
                  Change Password
                </h1>

                <div className="border rounded-2xl p-6">
                  <div className="space-y-4">

                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full border rounded-xl p-3"
                    />

                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full border rounded-xl p-3"
                    />

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full border rounded-xl p-3"
                    />

                    <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700">
                      Update Password
                    </button>

                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}