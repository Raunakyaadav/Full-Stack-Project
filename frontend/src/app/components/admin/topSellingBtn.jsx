'use client'
import { AxiosAPI,notify } from '@/app/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TopSellingBtn({ topSelling, path }) {
  const router = useRouter();

  function topSellingHandler() {
    AxiosAPI.patch(path).then(
      (res) => {
        router.refresh();
        notify(res.data.msg, res.data.success);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }
  return (
    <span onClick={topSellingHandler}
      className={`px-4 py-1 cursor-pointer ml-2 rounded-lg text-sm font-medium ${
        topSelling === true
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {topSelling ? "Top Selling" : "Not Top Selling"}
    </span>
  );
}

 


