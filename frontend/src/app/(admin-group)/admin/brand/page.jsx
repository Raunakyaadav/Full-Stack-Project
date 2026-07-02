import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdToggleOn } from "react-icons/md";
import { getBrand } from "@/app/library/api-call";
import StatusBtn from "@/app/components/admin/statusBtn";
import DeleteBtn from "@/app/components/admin/deleteBtn";


const BrandTable = async () => {

const brand = await getBrand();


  return (
    <div className="w-full overflow-x-auto pt-10 p-6">
        <div className="flex justify-between mb-5">
            <h1 className="text-3xl text-gray-700 font-semibold">Brands</h1>
         <Link href={'/admin/brand/add'}>
         <button className="bg-emerald-500 hover:bg-emerald-600 mr-5 text-md text-white p-2 rounded-md">Add Brand</button>
         </Link>   
        </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full min-w-175">
          <thead className="bg-gray-400  text-white">
            <tr>
              <th className="px-6 py-4 text-left">Logo</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Slug</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brand.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  <img
                   src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        `/images/brand/${item.image}`
                      }
                    alt={item.name}
                    className="w-25 h-12 object-cover rounded-lg"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4 font-semibold text-gray-700">
                  {item.name}
                </td>

                {/* Slug */}
                <td className="px-6 py-4 text-gray-500">
                  {item.slug}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                <StatusBtn path={`/brand/status/${item._id}`} status={item.status}
                id={item._id}/>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    
                    {/* Status Button */}
                   

                    {/* Edit Button */}
                  <Link href={`/admin/brand/edit/${item._id}` } key={item._id}>
                  <button key={item._id} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-1 px-2 rounded-lg transition">
                    Edit
                    </button>
                  </Link>  

                    {/* Delete Button */}
                    <DeleteBtn path={`/brand/delete/${item._id}`}/>
                   

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandTable;