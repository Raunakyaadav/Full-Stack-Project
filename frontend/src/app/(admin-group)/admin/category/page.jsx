import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdToggleOn } from "react-icons/md";
import { getCategory } from "@/app/library/api-call";
import StatusBtn from "@/app/components/admin/statusBtn";
import DeleteBtn from "@/app/components/admin/deleteBtn";


const CategoryTable = async () => {

const category = await getCategory();
console.log(category)

  return (
    <div className="w-full overflow-x-auto pt-10 p-6">
      {category && category.length > 0 ? (
        <div>
         <div className="flex justify-between mb-5">
            <h1 className="text-3xl text-gray-700 font-semibold">Categories</h1>
         <Link href={'/admin/category/add'}>
         <button className="bg-emerald-500 hover:bg-emerald-600 mr-5 text-md text-white p-2 rounded-md">Add category</button>
         </Link>   
        </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full min-w-175">
          <thead className="bg-gray-400  text-white">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Slug</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {category.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  <img
                    src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        `/images/category/${item.image}`
                      }
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-lg"
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
                <StatusBtn path={`/category/status/${item._id}`} status={item.status}
                id={item._id}/>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    
                    {/* Status Button */}
                   

                    {/* Edit Button */}
                  <Link href={`/admin/category/edit/${item._id}` } key={item._id}>
                  <button key={item._id} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-1 px-2 rounded-lg transition">
                    Edit
                    </button>
                  </Link>  

                    {/* Delete Button */}
                    <DeleteBtn path={`/category/delete/${item._id}`}/>
                   

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>)
        :(
           <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 max-w-xl mx-auto my-4">
  {/* Modern Box/Package Icon */}
  <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-400 mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  </div>
  
  <h2 className="text-xl font-semibold text-gray-900 mb-1">No category found</h2>
  <p className="text-md text-gray-500 mb-5">Your inventory is currently empty. Get started by adding your first category.</p>
  
  <Link href={'/admin/category/add'}>
  <button className="inline-flex items-center justify-center px-4 py-2 text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Add Category
  </button>
  </Link>
</div>
        )}
      
       
    </div>
  );
};

export default CategoryTable;