'use client'
import React from 'react'
import { useState, useEffect } from "react";
import { getCategory } from "@/app/library/api-call";
  import { FiSearch } from "react-icons/fi";

const placeholders = [
  "Mobiles",
  "Laptops",
  "Headphones",
  "Smart Watches",
  "Tablets",
];
 

 const SearchBar=  ()=> {
const [Category, setCategory] = useState([]);
 const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);


   async function fetchCategories() {
 
    const data = await getCategory();
    setCategory(data);

}
useEffect(() => {
  fetchCategories();
}, []);

  useEffect(() => {
    const currentWord = placeholders[wordIndex];

    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setPlaceholder(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);

      return () => clearTimeout(timeout);
    }

    const pause = setTimeout(() => {
      setCharIndex(0);
      setPlaceholder("");
      setWordIndex((prev) => (prev + 1) % placeholders.length);
    }, 1500);

    return () => clearTimeout(pause);
  }, [charIndex, wordIndex]);

  return (
   <div className="w-full bg-[#01A49E] py-3">
  <div className="max-full mx-auto  px-6 flex flex-col xl:flex-row justify-between items-center">
    
    {/* Search Section */}
 

<div className="bg-amber-50 h-11 px-3 rounded-3xl flex items-center w-full sm:w-[90%] xl:w-160">
  
  <select className="text-gray-700 outline-none bg-transparent min-w-24">
    {Category?.map((cat, i) => (
      <option key={i} value="">
        {cat.name}
      </option>
    ))}
  </select>

  <input
    className="h-full flex-1 px-3 outline-none bg-transparent min-w-0"
    type="text"
     placeholder={placeholder}
  />

  {/* Search Icon */}
  <button className="text-gray-600 text-xl font-semibold mr-2 cursor-pointer hover:text-[#01A49E] transition">
    <FiSearch />
  </button>

</div>

    {/* Info Section */}
    <div className="hidden sm:flex flex-wrap justify-center items-center pr-10 mt-3 xl:mt-0 gap-x-20 gap-y-2 text-xs sm:text-sm text-white uppercase">
      <h3>Free shipping over $199</h3>
      <h3>30 days money back</h3>
      <h3>100% secure payment</h3>
    </div>

  </div>
</div>
  );
}

export default SearchBar ;