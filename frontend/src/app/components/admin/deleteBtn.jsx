'use client'
import Swal from 'sweetalert2'
import { AxiosAPI, notify } from '@/app/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DeleteBtn({path}) {
 const router = useRouter();
    function deleteHandler(){
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) Swal.fire(
     AxiosAPI.delete(path).then(
            (res)=>{
                
                router.refresh()
        notify(res.data.msg,res.data.success)
            }
        ).catch(
            (err)=>{
console.log(err)
            }
        ),{
    
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
});
       
    }
  return (
     <button onClick={deleteHandler} className="bg-red-100 hover:bg-red-200 text-red-600 p-1 px-2 rounded-lg transition">
                     Delete
                    </button>
  )
}
