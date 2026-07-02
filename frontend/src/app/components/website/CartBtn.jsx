"use client";

import { AxiosAPI } from "@/app/library/helper";
import { addtoCart } from "@/app/redux/features/cartSlice";
import React from "react";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function CartBtn({ product,className ="" }) {
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.cart); // cart array
  const dispatcher = useDispatch();

  // Check if product already exists in cart
  const isAdded = cart?.some(
    (item) => item.productId === product._id
  );

  async function AddToCart() {
    // Don't add again
    if (isAdded) return;

    if (user) {
      const response = await AxiosAPI.post("/cart/add-cart", {
        userId: user._id,
        productId: product._id,
      });

      console.log(response);
    }

    dispatcher(
      addtoCart({
        productId: product._id,
        original_price: product.originalPrice,
        final_price: product.finalPrice,
      })
    );
  }

  return (
    <button
  onClick={AddToCart}
  disabled={isAdded}
  className={`
    flex items-center justify-center font-semibold transition-all
    ${isAdded
      ? "bg-[#00cac3] text-white cursor-not-allowed"
      : "bg-[#01A49E] hover:bg-[#008681] text-white"
    }
    ${className}
  `}
>
      {isAdded ? (
        <>
          <FaCheck className="mr-2 text-sm" />
          Added to Cart
        </>
      ) : (
        <>
          <FaShoppingCart className="mr-2 text-sm" />
          Add to Cart
        </>
      )}
    </button>
  );
}