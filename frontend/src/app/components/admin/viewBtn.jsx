'use client';
import React from 'react'
import { useState } from 'react';
import ViewProduct from "@/app/components/admin/viewProduct";


export default function ViewBtn({product}) {
const [open, setOpen] = useState(false);

  return (
    <>
     <button  onClick={() => setOpen(true)} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-1 px-2 rounded-lg transition">
                        view »
                      </button>
     <ViewProduct
       
        product={product}
        isOpen={open}
        onClose={() => setOpen(false)}
      /></>
  
  )
}
