'use client'
import { getProduct } from "@/app/library/api-call";
import { AxiosAPI } from "@/app/library/helper";
import {qtyHandler, removeCart } from "@/app/redux/features/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaArrowRight, FaPlus,FaMinus,FaTrash,FaCheckCircle, } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const router = useRouter();
    const cartItems = useSelector((state)=>state.cart)
    const token = useSelector((state)=>state.user.token)

    const [products,setProducts] = useState([]);
    const dispatcher = useDispatch()
   
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

 async  function getData(){
    const res = await getProduct();
    setProducts(res)
   }

   function deleteHandler(id){
    AxiosAPI.post("/cart/delete/" + id).then(
(res)=>{
  console.log(res)
}
    ).catch(
      (err)=>{
console.log(err)
      }
    )
   }

   useEffect(
    ()=>{
        getData();
        
    },[]
   )
  

const checkoutHandler = () => {
  if (!cartItems?.cart?.length) return;

  const item = cartItems.cart[0];
  const product = products.find(
    (data) => data._id === item.productId
  );

  if (!product) return;

  if (token) {
    router.push(`/checkout?product_id=${product._id}`);
  } else {
    router.push("/user/login");
  }
};
  

  
        
  return (

    <div className="bg-gray-100 min-h-screen py-8 px-4">
 {cartItems.cart?.length > 0 ? (
 <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 ">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-xl sm:text-3xl font-bold mb-6">Shopping Cart</h1>

{


cartItems && cartItems.cart?.map((item,i)=>{
    const product = products.find((data)=> data._id ===item.productId)
   return(
  <div
              key={i}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-5 md:gap-8"
            >
              {/* Image */}
              <div className="w-[30%] md:w-40 sm:h-40 rounded-xl flex flex-col items-center justify-between">
                <img
                 src={process.env.NEXT_PUBLIC_BASE_URL + `/images/product/${product?.thumbnail}`}
                  alt={product?.name}
                  className="h-22 sm:h-28 object-contain"
                />
                  {/* Quantity */}
                  <div className="mt-1 sm:mt-3 text-[10px] md:text-[13px] flex items-center border rounded-lg w-fit overflow-hidden">
                    <button onClick={() => dispatcher(qtyHandler({ productId: item.productId, flag: "minus", original_price: product.originalPrice, final_price: product.finalPrice }))} className="px-3 sm:px-4 py-2 hover:bg-gray-100">
                      <FaMinus />
                    </button>

                    <span className="sm:px-3 font-semibold">
                      {item?.qty}
                    </span>

                    <button onClick={() => dispatcher(qtyHandler({ productId: item.productId, flag: "plus", original_price: product.originalPrice, final_price: product.finalPrice }))} className="px-3 sm:px-4 py-2 hover:bg-gray-100">
                      <FaPlus />
                    </button>
                  </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div>
                  <h2 className="text-md sm:text-lg  text-gray-800">
                    {product?.name}
                  </h2>
{/* price section */}
  <div className="mt-1 sm:mt-3 flex flex-col gap-2">
  <div className="flex items-center gap-3 flex-wrap">
    
    {/* Final Price */}
    <h2 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight">
      ₹{product?.finalPrice}
    </h2>

    {/* Discount Badge */}
    <span className="px-2 sm:px-3 py-1 rounded-full  text-red-500 text-[11px] sm:text-sm shadow-sm font-bold">
      {product?.discountPercentage}
      % OFF
    </span>
  </div>

  <div className="flex items-center gap-3">
    {/* Original Price */}
    <span className="sm:text-lg text-gray-400 line-through">
      ₹{product?.originalPrice}
    </span>

    {/* Savings */}
    <span className="text-sm font-semibold text-green-600">
      Save ₹{product?.originalPrice - product?.finalPrice}
    </span>
  </div>

  {/* Limited Offer Tag */}
  {/* <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-orange-50 border border-orange-200 px-3 py-2">
    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
    <span className="text-xs font-medium text-orange-700">
      Special Offer • Limited Time Deal
    </span>
  </div> */}
</div>

                

                  {/* Shipping */}
                  <div className="mt-2 sm:mt-4 flex items-center gap-3 flex-wrap">
                    <span className=" bg-green-50 text-green-500 text-[10px] sm:text-sm px-3 py-1 rounded-md">
                    FREE SHIPING
                    </span>

                    <span className="flex items-center gap-2 text-sm md:text-md text-gray-600">
                      <FaCheckCircle className="text-green-500" />
                      In Stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div >
                <button onClick={() => {
                  deleteHandler(item.productId);
                  dispatcher(removeCart({ productId: item.productId, original_price: product?.originalPrice, final_price: product?.finalPrice }));
                }} className="w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center">
                  <FaTrash />
                </button>
              </div>
            </div>
   )
})}
                
          
          
        
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl p-6 md:mt-15 shadow-sm border border-green-300 sticky top-5">
            <h2 className="text-2xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">₹{cartItems.original_total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  You Saved 
                </span>
                <span className="font-semibold">₹{cartItems.original_total - cartItems.final_total}</span>
              </div>

             

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{cartItems.final_total}</span>
              </div>


  <button onClick={checkoutHandler}
    className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition"
  >
    Checkout
  </button>

           

             <Link href={"/products"}>
             <button className="w-full border hover:text-white border-gray-300 py-3 rounded-xl font-medium hover:bg-teal-600 transition">
                Continue Shopping
              </button>
             </Link> 
            </div>
          </div>
        </div>

      </div>
 ):
 
 (
   
      <div className="max-w-lg mt-10 mx-auto w-full  rounded-3xl  p-10 text-center border border-gray-100">
        
        {/* Icon */}
        <div className="w-28 h-28 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
          <FaShoppingCart className="text-5xl animate-bounce text-[#03b9b3]" />
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-800 mt-8">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 mt-3 leading-relaxed">
          Looks like you haven't added anything to your cart yet.
          Start shopping to find amazing products.
        </p>

        {/* Button */}
       <Link href="/products">
       <button className="mt-8 animate-pulse bg-[#04bcb6] hover:bg-[#03d7d0] text-white px-8 py-3 rounded-xl font-medium inline-flex items-center gap-2 transition-all duration-300">
          Continue Shopping
          <FaArrowRight size={14} />
        </button>
       </Link> 

        {/* Small Stats */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Discover thousands of products at great prices.
          </p>
        </div>
      </div>
   
 )}

     
    </div>
  )
};

export default CartPage;