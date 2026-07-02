"use client";
import React, { useEffect, useState } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { FaMapMarkerAlt, FaEdit, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AxiosAPI } from "@/app/library/helper";
import { useRouter } from "next/navigation";
import { emptyCart, removeCart } from "@/app/redux/features/cartSlice";


export default function CheckoutPage() {
  const { error, isLoading, Razorpay } = useRazorpay();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMode, setPaymenMode] = useState(0);
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatcher = useDispatch()



  function orderHandler() {
    AxiosAPI.post("/order/place-order", {
      user_id: user?._id,
      order_total: cart.final_total,
      payment_mode: paymentMode,
      shipping_details: user.shipping_address[selectedAddress],
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
        
          localStorage.removeItem("cart")
          if (paymentMode == 0) {
            router.push(`/checkout/thank-you/${res.data.order_id}`);
              dispatcher(emptyCart())
             router.refresh()
          } else {
            const options = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // ensure env variable is exposed
              currency: "INR",
              name: "Test Company",
              description: "Test Transaction",
              order_id: res.data.razorpay_order_id, 
              handler: (response) => {
                console.log(response);
                alert("Payment Successful!");
                  dispatcher(emptyCart())
                    router.refresh()
              },
              prefill: {
                name: user.name,
                email: user.email,
                contact: "9999999999",
              },
              theme: {
                color: "#F37254",
              },
            };

            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-3 py-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">
          CHECKOUT
        </h1>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Billing & Additional Info Forms */}
          {user?.shipping_address?.length > 0 ? (
            <div className="lg:col-span-7 space-y-4">
              {user.shipping_address.map((address, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                    selectedAddress === index
                      ? "border-teal-600 ring-2 ring-teal-100"
                      : "border-gray-200"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 bg-teal-50 border-b border-teal-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-teal-600 text-white p-2 rounded-full">
                        <FaMapMarkerAlt size={16} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Address #{index + 1}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Delivery Address
                        </p>
                      </div>
                    </div>

                    {selectedAddress === index && (
                      <span className="flex items-center gap-1 bg-teal-100 text-teal-700 text-xs font-medium px-3 py-1 rounded-full">
                        <FaCheckCircle />
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h4 className="font-semibold text-gray-800">
                      {user?.name}
                    </h4>

                    <p className="text-gray-600 mt-2 leading-relaxed">
                      {address.street}, {address.city}, {address.state} -{" "}
                      {address.postalCode}, {address.country}
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      📞 {user?.contact || "xxx-xxx-xx24"}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      <button
                        onClick={() => setSelectedAddress(index)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                          selectedAddress === index
                            ? "bg-teal-500 text-white"
                            : "bg-teal-600 text-white hover:bg-teal-700"
                        }`}
                      >
                        <FaCheckCircle />
                        {selectedAddress === index ? "Selected" : "Select"}
                      </button>

                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-teal-600 hover:text-teal-600 transition">
                        <FaEdit />
                        Edit
                      </button>

                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition">
                        <MdDelete />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <section className="lg:col-span-7 space-y-8">
              {/* Billing Form */}
            </section>
          )}

          {/* RIGHT: Your Order Summary Section */}

          <section className="lg:col-span-5 lg:sticky lg:top-6">
            <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-3xl">
              {/* Header */}
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-slate-900">
                  Order Summary
                </h2>
              </div>

              {/* Price Details */}
              <div className="px-5 py-3">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Original Price</span>

                    <span className="font-medium text-gray-400 line-through">
                      ₹{cart.original_total}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>

                    <span className="font-semibold text-green-600">
                      - ₹{cart.original_total - cart.final_total}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>

                    <span className="font-semibold text-green-600">FREE</span>
                  </div>

                  <div className="border-t border-dashed border-gray-200"></div>

                  {/* Total */}
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Grand Total</p>

                        <h3 className="text-3xl font-black text-teal-600">
                          ₹{cart.final_total}
                        </h3>
                      </div>

                      <div className="px-3 py-1 text-xs font-bold text-teal-700 bg-white rounded-full border border-teal-200">
                        Best Price
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-5 border-t border-gray-100">
                <h3 className="mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase">
                  Payment Method
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 transition-all border-2 border-teal-500 cursor-pointer bg-teal-50 rounded-2xl hover:shadow-sm">
                    <input
                      onClick={() => setPaymenMode(1)}
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="w-4 h-4 accent-teal-600"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Online Payment
                      </p>
                      <p className="text-xs text-gray-500">
                        UPI • Cards • Wallet • Net Banking
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 transition-all border border-gray-200 cursor-pointer rounded-2xl hover:border-teal-300 hover:bg-gray-50">
                    <input
                      onClick={() => setPaymenMode(0)}
                      type="radio"
                      name="payment"
                      className="w-4 h-4 accent-teal-600"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-gray-500">
                        Pay after delivery
                      </p>
                    </div>
                  </label>
                </div>

                {/* CTA */}
                <button
                  onClick={orderHandler}
                  type="submit"
                  className="w-full mt-5 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  PLACE ORDER • ₹{cart.final_total}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
