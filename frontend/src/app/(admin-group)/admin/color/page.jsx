import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdToggleOn } from "react-icons/md";
import { getColor } from "@/app/library/api-call";
import StatusBtn from "@/app/components/admin/statusBtn";
import DeleteBtn from "@/app/components/admin/deleteBtn";


const ColorTable = async () => {

const color = await getColor();


  return (
    <div className="w-full overflow-x-auto pt-10 p-6">
        <div className="flex justify-between mb-5">
            <h1 className="text-3xl text-gray-700 font-semibold">Colors</h1>
         <Link href={'/admin/color/add'}>
         <button className="bg-emerald-500 hover:bg-emerald-600 mr-5 text-md text-white p-2 rounded-md">Add color</button>
         </Link>   
        </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full min-w-175">
          <thead className="bg-gray-400  text-white">
            <tr>
              <th className="px-6 py-4 text-left">ColorCode</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Slug</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {color?.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Image */}
                <td className="px-6 py-4">
                <div className="h-3" style={{ backgroundColor: item.hexcode }}>
  {/* content here */}
</div>

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
                <StatusBtn path={`/color/status/${item._id}`} status={item.status}
                id={item._id}/>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    
                    {/* Status Button */}
                   

                    {/* Edit Button */}
                  <Link href={`/admin/color/edit/${item._id}` } key={item._id}>
                  <button key={item._id} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-1 px-2 rounded-lg transition">
                    Edit
                    </button>
                  </Link>  

                    {/* Delete Button */}
                    <DeleteBtn path={`/color/delete/${item._id}`}/>
                   

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

export default ColorTable;
