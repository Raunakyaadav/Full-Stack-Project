import React from 'react'
import { getCategory } from "@/app/library/api-call";
import Link from "next/link";

export default async function CategoryFilter() {
    const category = await getCategory();

  return (
    <div className='p-5 rounded-lg bg-[#EEEFF6] mb-3'>
                        <h1 className='font-bold text-lg pl-5'>CATEGORIES</h1>
                      <Link href={"/products"}><button className='bg-white text-sm font-bold p-2 mt-3 ml-4
                         rounded-lg'>All Categories</button></Link>  
                        <ul className='ml-5 mt-4'>
                           {
  category && category.map((cat, i) => {
    return (
      <Link key={i} href={`/products/${cat.slug}`}>
        <li 
          className="px-1 py-1 font-semibold text-gray-700 flex justify-between items-center 
          cursor-pointer rounded-md transition-all duration-300 
          hover:bg-blue-100 hover:text-blue-600 hover:shadow-sm"
        >
          <span>{cat.name}</span>
          <span 
            className="ml-2 text-sm bg-[#01A49E] text-white px-3 py-1 rounded-full 
            font-medium shadow-sm transition-transform duration-300 group-hover:scale-110"
          >
            {cat.productCount}
          </span>
        </li>
      </Link>
    )
  })
}

                        </ul>
                    </div>
  )
}
