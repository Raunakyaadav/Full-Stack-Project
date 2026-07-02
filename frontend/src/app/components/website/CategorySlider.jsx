"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function CategorySlider({ categories = [] }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm pt-6 px-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Categories
          </h2>

          <Link
            href="/categories"
            className="text-gray-500 hover:text-teal-600 transition font-medium"
          >
            View All
          </Link>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white transition flex items-center justify-center"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-none"
      >
        {categories.map((category) => (
          <Link href={"/"}
          
            key={category._id}
            className="shrink-0 group"
          >
            <div className="  transition duration-300">
              <div className="relative w-full h-24">
                <img
                 src={process.env.NEXT_PUBLIC_BASE_URL +`/images/category/${category.image}`}
                  alt={category.name}
                  fill
                  className="h-18 object-contain group-hover:scale-105 transition duration-300"
                />
              </div>
            </div>

            <h3 className="pb-3 text-center text-xs md:text-sm font-semibold text-gray-800 group-hover:text-teal-600 transition">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}