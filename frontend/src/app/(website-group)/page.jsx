import React from "react";
import ProductCard from "../components/website/productCard";
import Responsive from "../components/website/slider";
import { getCategory, getBrand, getProduct } from "@/app/library/api-call";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CategorySlider from "../components/website/CategorySlider";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import Link from "next/link";
import CartBtn from "../components/website/CartBtn";

async function Home() {
  const categories = await getCategory();
  const brands = await getBrand();
  const products = await getProduct();

  return (
    <div>
      <div className="mt-5">
        <Responsive />
      </div>
      <section className="max-w-full mx-auto px-4 py-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* ================= BRANDS ================= */}

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm pt-6 px-6 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Featured Brands
              </h2>

              <button className="text-gray-500 hover:text-teal-600 font-medium transition">
                View All
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
              {brands.map((brand) => (
                <div
                  key={brand._id}
                  className="group relative flex items-center justify-center h-18 rounded-2xl   overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0   opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  {/* Shine Effect */}
                  <div className="absolute -left-24 top-0 h-full w-16 rotate-12 opacity-0 group-hover:opacity-100 group-hover:left-[110%] transition-all duration-700"></div>

                  {/* Logo */}
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      `/images/brand/${brand.image}`
                    }
                    alt={brand.name}
                    className="relative z-10 max-h-10 object-contain transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= CATEGORIES ================= */}

          <CategorySlider categories={categories} />
        </div>
      </section>

      {/* products card  */}

      <section className="max-w-full mx-auto px-5 py-5">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className=" text-4xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="mt-3 text-gray-500">
            Discover our hand-picked premium collection.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:px-6">
          {products.map((item) => (
            <Link href={`/product/${item._id}`}>
              <div
                key={item._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-3"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      `/images/product/${item.thumbnail}`
                    }
                    alt={item.name}
                    className="h-60 w-full object-contain p-4 transition duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg text-gray-500 hover:bg-teal-500 hover:text-white transition">
                    <FaHeart />
                  </button>

                  {/* Add to Cart */}
                  {/* <CartBtn
                    product={item}
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl whitespace-nowrap"
                  /> */}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-teal-600 transition min-h-[45px]">
                    {item.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-teal-600">
                      ₹{item.finalPrice}
                    </span>

                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-full">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
