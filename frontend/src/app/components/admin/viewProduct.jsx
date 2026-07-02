"use client";
import React from "react";
import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useState } from "react";
import {
  getCategoryById,
  getbrandById,
  getColoryById,
} from "@/app/library/api-call"; 
import { useEffect } from "react";

const ViewProduct = ({ product, isOpen, onClose }) => {
  console.log("product", product);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [colors, setColors] = useState([]);
  
  useEffect(() => {
    const fetchdata = async () => {
      if (product?.categoryId) {
        const categoryData = await getCategoryById(product.categoryId);
        setCategory(categoryData.data);

        const brandData = await getbrandById(product.brandId);
        setBrand(brandData.data);

        const colorsData = await Promise.all(
          product.colors.map((colorId) => getColoryById(colorId)),
        );
       
        const colors = colorsData.map((res) => res.color);
        setColors(colors);
      }
    };

    fetchdata();
  }, [product?.categoryId, product?.brandId]);

  if (!isOpen || !product) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        {/* Modal */}
        <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">
              Product Details
            </h2>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 max-h-[85vh] overflow-y-auto">
            {/* Left Side Images */}
            <div>
              <img
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  `/images/product/${product.thumbnail}`
                }
                alt={product.name}
                className="w-full h-95 object-contain rounded-xl border"
              />

              {/* Extra Images */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images?.map((img, index) => (
                 
                  <img
                  
                    key={index}
                    src={ 
                      process.env.NEXT_PUBLIC_BASE_URL +
                      `/images/product/${img}`
                    }
                    alt="product"
                    className="w-full h-28 object-fill rounded-lg border"
                  />
                ))}
              </div>
            </div>

            {/* Right Side Details */}
            <div className="space-y-5">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Slug: {product.slug}
                </p>
              </div>

              {/* Prices */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-blue-600">
                  ₹{product.finalPrice}
                </span>

                <span className="text-lg line-through text-gray-400">
                  ₹{product.originalPrice}
                </span>

                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discountPercentage}% OFF
                </span>
              </div>

              {/* Descriptions */}
              <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">
                  Short Description
                </h3>

                <p className="text-gray-600">{product.shortDescription}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">
                  Long Description
                </h3>

                <p
                  className="text-gray-600 leading-7"
                  dangerouslySetInnerHTML={{ __html: product.longDescription }}
                ></p>
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Category</p>
                  <h4 className="font-semibold text-gray-800 mt-1">
                    {category?.name || "N/A"}
                  </h4>
                </div>

                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Brand</p>
                  <h4 className="font-semibold text-gray-800 mt-1">
                    {brand?.name || "N/A"}
                  </h4>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-3">
                  Available Colors
                </h3>

                <div className="flex flex-wrap gap-3">
                  {colors?.map((color, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium"
                    >
                      {color?.name || color}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-2">Status</p>

                  {product.status ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                      <FaCheckCircle />
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-red-500 font-semibold">
                      <FaTimesCircle />
                      Inactive
                    </div>
                  )}
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-2">Stock</p>

                  {product.stock ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                      <FaCheckCircle />
                      In Stock
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-red-500 font-semibold">
                      <FaTimesCircle />
                      Out Stock
                    </div>
                  )}
                </div>

                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm mb-2">Top Selling</p>

                  {product.topSelling ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                      <FaCheckCircle />
                      Yes
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-red-500 font-semibold">
                      <FaTimesCircle />
                      No
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
