'use client'
import { AxiosAPI,notify } from '@/app/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function StockBtn({stock,path}) {
const router = useRouter();
    function stockHandler(){
        AxiosAPI.patch(path).then(
(res)=>{
      router.refresh()
      notify(res.data.msg,res.data.success)
}
        ).catch(
            (err)=>{
console.log(err)
            }
        )
    }
  return (
    <span onClick={stockHandler}
                    className={`px-4 py-1 cursor-pointer ml-2 rounded-lg text-sm font-medium ${
                      stock === true
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {stock ? "In Stock" : "Out of Stock"}
                  </span>
  )
}
