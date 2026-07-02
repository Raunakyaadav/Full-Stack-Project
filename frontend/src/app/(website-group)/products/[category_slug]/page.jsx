import React from 'react'
import ProductCard from '@/app/components/website/productCard';
import { getProduct } from "@/app/library/api-call";



export default async function Products({params,searchParams}) {
   const { category_slug } = await params;
   const {color,brand,min,max} =await searchParams;
 
 

    const products = await getProduct(category_slug,color,brand,min,max);
    return (
      <>  <div className='ml-5'>
                        <span>Show items</span>
                        <select className='px-4 py-0.5 outline-0 ml-2 bg-gray-100 shadow-lg' name="" id="">
                            <option value="0">All</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>

                        </select>
                    </div>
                    {/* Product Cards */}
                    <div className='mx-auto p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    gap-x-25 md:gap-x-5  gap-y-3 sm:gap-3 justify-items-center'>
                        
                        {
                            products.map((prod, i) => {
                                return (
                                    <ProductCard product={prod} key={i} />

                                )
                            })
                        }
                    </div></>
    )
}


