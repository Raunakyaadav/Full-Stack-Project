"use client";
import { AxiosAPI, createSlug, notify } from "@/app/library/helper";
import React, { useEffect, useRef, useState } from "react";
import { getProductById } from "@/app/library/api-call";
import { useParams } from "next/navigation";
import Image from "next/image";

const Images = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  
  const id = params.product_id;


  const getProduct = async () => {
    const productJson = await getProductById(id);
    setProduct(productJson.data);
    setImage(productJson.data.images)
  };

  useEffect(() => {
    getProduct();
   
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const files = e.target.images.files;
    for(let image of files){
        formData.append("images", image);
    }

    AxiosAPI.patch("/product/images/" + id, formData)
      .then((res) => {
        console.log(res);
        notify(res.data.msg, res.data.success);
      })
      .catch((error) => {
        notify("All field required", false);
        console.log(error);
      });
  };

  return (
    <div className="h-190 flex justify-center py-25  bg-gray-100 p-4">
      <div className="w-full h-auto max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Add Images
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image */}
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((image, index) => {
              return (
                <img
                  key={index}
                  width={100}
                  height={100}
              src={process.env.NEXT_PUBLIC_API_URL+`/images/product/${image}`}
              alt=""
            />
            )
           
            
            })
             
          
            }
            
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Product Images
            </label>
            <input
            multiple
              type="file"
              name="images"
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

export default Images;
