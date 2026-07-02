"use client";
import { AxiosAPI, notify } from "@/app/library/helper";
import { useRouter } from "next/navigation";
import React from "react";

export default function StatusBtn({ status,path }) {
 const router = useRouter();
    function statusHandler(){
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
    <span onClick={statusHandler}
      className={`px-4 py-1 cursor-pointer rounded-lg text-sm font-medium ${
        status === true
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status ? "Active" : "Inactive"}
    </span>
  );
}
 