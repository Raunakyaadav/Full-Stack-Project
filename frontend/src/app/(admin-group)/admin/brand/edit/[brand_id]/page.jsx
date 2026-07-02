'use client'
import { AxiosAPI, createSlug, notify } from "@/app/library/helper";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {getbrandById} from '@/app/library/api-call'
import { useParams } from "next/navigation";


const EditBrand = () => {
const [brand,setBrand]  = useState({});
const params = useParams();

const id =params.brand_id
const getBrand =async ()=>{
    const brandJson = await getbrandById(id);
    setBrand(brandJson.data)
} 

useEffect(
    ()=>{
getBrand()

    },[id]
)


const nameref = useRef();
const slugref = useRef();


 function slugGenerate(){
  const slug  = createSlug(nameref.current.value);
  slugref.current.value = slug
 }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData() ;
    formData.append("name",nameref.current.value)
    formData.append("slug",slugref.current.value)
    formData.append("image",e.target.image.files[0])

 
  
   AxiosAPI.put("/category/update/"+ id,formData).then(
(res)=>{
  console.log(res)
  notify(res.data.msg,res.data.success);
  nameref.current.value ="" ;
  slugref.current.value =""
}
   ).catch(
    (error)=>{
       notify("All field required",false);
console.log(error)
    }
   )
  };

  return (
    <div className="h-full flex justify-center py-15  bg-gray-100 p-4">
      <div className="w-full h-155 max-w-lg bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Edit Brand
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Name
            </label>
            <input onChange={slugGenerate}
              type="text"
              ref={nameref}
              defaultValue={brand.name}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Slug
            </label>
            <input
              type="text"
              readOnly
              ref={slugref}
              defaultValue={brand.slug}
              placeholder="Enter product slug"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
            <div>
            <img width={100}  src={process.env.NEXT_PUBLIC_API_URL+`/images/brand/${brand.image}`} alt="" />
            </div> 
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Brand Logo
            </label>
            <input
              type="file"
              name ="image"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-lg hover:file:bg-blue-700"
            />
          </div>
       

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;