'use client'
import React, { useEffect,useState } from 'react'
import { getColor } from "@/app/library/api-call";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


export default function ColorFilter() {
    const router = useRouter()
    const [colors, setColors] = useState([]);
    const [selColor,setSelColor] = useState("")
    const [price,setPrice] = useState([])

function priceHandler(data){
   setPrice(data)
   const query = new URLSearchParams();
   query.set("min",data[0])
   query.set("max",data[1])
   router.push(`?${query.toString()}`)
}

useEffect(
    ()=>{
        if(selColor){
   const query = new URLSearchParams({color:selColor})
        router.push(`?${query.toString()}`)
        }
      
    },[selColor,router]
)

    async function colordata(){
     const res = await getColor();
     setColors(res)
    }

    useEffect(
        ()=>{
            colordata()
        },[]
    )
   
  return (
    <div>
     <div className='p-5 rounded-lg bg-[#EEEFF6] mb-3'>
                        <h1 className='font-bold text-lg pl-5'>Colors</h1>

                        <Link href={"/products"} ><button className='bg-white text-sm font-bold p-2
                         mt-3 ml-4 rounded-lg'>All Colors</button></Link>
                        <ul className='ml-4 mt-4 flex flex-wrap gap-3'>
                            {
                                colors.map((col, i) => {
                                    return (
                                        <li onClick={()=>setSelColor(col.slug)}  key={i} style={{ background: col.hexcode }} className='my-1 cursor-pointer rounded-md w-9 h-9'></li>

                                    )
                                })
                            }
                        </ul>


                       
                    </div>

                     <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
    <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
            Price Range
        </h2>

        <div className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
            ₹{price[0]} - ₹{price[1]}
        </div>
    </div>

    <div className="px-2">
        <RangeSlider
            min={100}
            max={80000}
            onInput={priceHandler}
            defaultValue={[100, 1000]}
            value={price}
        />
    </div>

    <div className="flex justify-between items-center mt-6">
        <div className="bg-gray-100 px-4 py-2 rounded-xl text-center min-w-23">
            <p className="text-xs text-gray-500">Min</p>
            <p className="font-semibold text-gray-800">
                ₹{price[0]}
            </p>
        </div>

        <div className="h-0.5 flex-1 mx-4 bg-gray-200"></div>

        <div className="bg-gray-100 px-4 py-2 rounded-xl text-center min-w-23">
            <p className="text-xs text-gray-500">Max</p>
            <p className="font-semibold text-gray-800">
                ₹{price[1]}
            </p>
        </div>
    </div>
</div>
</div>
  )
}
