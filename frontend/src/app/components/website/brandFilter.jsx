"use client";
import React, { useEffect, useState } from "react";
import { getBrand } from "@/app/library/api-call";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BrandFilter() {
  const [brand, setBrand] = useState([]);
  const [selBrand,setSelBrand] = useState("")
  const router = useRouter();

useEffect(
    
    ()=>{
        if(selBrand){
 const query = new URLSearchParams({brand:selBrand})
    router.push(`?${query.toString()}`)
        }
       
    },[selBrand,router]
)


  async function getData() {
    const brands = await getBrand();
    setBrand(brands);
  }
  useEffect(
    ()=>{
        getData()
    },[]
  )

  return (
    <div className="p-5 rounded-lg bg-[#EEEFF6] mb-3">
      <h1 className="font-bold text-lg pl-5">Brands</h1>

      <Link href={"/products"}>
        <button
          className="bg-white text-sm font-bold p-2
                         mt-3 ml-4 rounded-lg"
        >
          All Brands
        </button>
      </Link>
      <ul className="ml-4 mt-4 flex flex-wrap gap-3">
        {brand.map((brnd, i) => {
          return (
            <li key={i} className="my-1 cursor-pointer rounded-md w-20 h-18">
              <img onClick={()=>setSelBrand(brnd.slug)}
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  `/images/brand/${brnd.image}`
                }
                alt={brnd.name}
                className="w-full h-full object-contain rounded-xl"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
