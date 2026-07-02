
import React from "react";
import {FiTwitter,FiFacebook,FiInstagram,FiYoutube,FiTruck,FiHeart,FiRefreshCw,FiMinus,FiPlus,FiCheckCircle,
} from "react-icons/fi";
import { FaDribbble, FaCcVisa, FaCcMastercard, FaCcDiscover, FaCcAmex, FaCcPaypal, FaPaypal } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { getProductById } from "@/app/library/api-call";
import CartBtn from "@/app/components/website/CartBtn";
import Link from "next/link";



export default async function ProductPage({params}) {
 const {product_id} = await params ;

const productdata  = await getProductById(product_id)
const product = productdata.data

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_360px]">
          {/* ---------- Gallery ---------- */}
          <div className="relative">
            <span className="absolute left-0 top-0 z-10 rounded bg-neutral-900 px-2.5 py-1 text-xs font-semibold tracking-wide text-white">
              NEW
            </span>

        <div className="flex items-center justify-center rounded-xl bg-neutral-50 p-6">
  <img
    id="main-product-image"
    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/product/${product.thumbnail}`}
    alt={product.slug}
    className="h-120 w-full max-w-sm object-contain"
  />
</div>

<div className="mt-4 flex gap-3">
  {[product.thumbnail, ...(product.images || [])].map((img, i) => (
    <button
      key={i}
      type="button"
      className="h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-200 hover:border-emerald-600"
      dangerouslySetInnerHTML={{
        __html: `
          <img
            src="${process.env.NEXT_PUBLIC_BASE_URL}/images/product/${img}"
            class="h-full w-full object-contain"
            onMouseEnter="document.getElementById('main-product-image').src='${process.env.NEXT_PUBLIC_BASE_URL}/images/product/${img}'"
          />
        `,
      }}
    />
  ))}
</div>
          </div>

          {/* ---------- Details ---------- */}
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-neutral-200" />
              <span className="text-sm text-neutral-500">(5)</span>
            </div>

            <h1 className="mt-2 text-2xl font-semibold leading-snug text-neutral-900">
             {product.name}
            </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
  {/* Final Price */}
  <span className="text-3xl font-bold text-emerald-600">
    ₹{product.finalPrice}
  </span>

  {/* Original Price */}
  <span className="text-lg text-gray-400 line-through">
    ₹{product.originalPrice}
  </span>

  {/* Discount Badge */}
  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
    {product.discountPercentage}% OFF
  </span>
</div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                {product.shortDescription}
              </li>
             
            </ul>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                FREE SHIPPING
              </span>
              <span className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                FREE GIFT
              </span>
            </div>

            <hr className="my-5 border-neutral-200" />

            {/* Color */}
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                COLOR: <span className="font-normal text-neutral-600">{product?.colors?.name}</span>
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 sm:max-w-md">
                {product?.colors?.map((c) => (
                  <button
                    key={c.name}
                   
                    className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition
                   
                         "border-emerald-600 ring-1 ring-emerald-600"
                       
                    }`}
                  >
                  
                    <span className="text-xs leading-tight text-neutral-800">{c.name}</span>
                   
                  </button>
                ))}
              </div>
            </div>

            {/* Memory */}
           

            {/* Promo box */}
            <div className="mt-5 flex items-start gap-4 rounded-xl bg-emerald-50/70 p-4">
              <span className="text-3xl">🎁</span>
              <div className="text-sm text-neutral-700">
                <p>
                  . Buy <span className="font-semibold text-emerald-700">02</span> boxes get a{" "}
                  <span className="font-semibold">Snack Tray</span>
                </p>
                <p>
                  . Buy <span className="font-semibold text-emerald-700">04</span> boxes get a free{" "}
                  <span className="font-semibold">Block Toys</span>
                </p>
                <p className="mt-2 text-xs italic text-neutral-500">
                  Promotion will expires in: 9h00pm, 25/5/2024
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-5 space-y-1 text-sm">
              <p>
                <span className="font-semibold text-neutral-900">SKU:</span>{" "}
                <span className="text-neutral-600">ABC025168</span>
              </p>
              <p>
                <span className="font-semibold text-neutral-900">CATEGORY:</span>{" "}
                <span className="text-neutral-600">{product?.categoryId?.name}</span>
              </p>
              <p>
                <span className="font-semibold text-neutral-900">BRAND:</span>{" "}
                <span className="font-medium text-emerald-600">{product?.brandId?.name}</span>
              </p>
            </div>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              {[FiTwitter, FiFacebook, FiInstagram, FiYoutube, FaDribbble].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ---------- Buy box ---------- */}
          <div>
            <div className="rounded-xl bg-neutral-50 p-5">
              <p className="text-xs uppercase tracking-wide text-neutral-500">Total price:</p>
              <p className="mt-1 text-3xl font-bold text-neutral-900">₹{product.finalPrice}</p>

              <div className="mt-2 flex items-center gap-1.5 text-sm">
                <span className="italic font-bold text-indigo-600">affirm</span>
                <span className="font-semibold text-red-500">$49/m</span>
                <span className="text-neutral-500">in 12 months.</span>
                <a href="#" className="text-blue-600 underline">
                  See more
                </a>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <FiCheckCircle /> In stock
              </div>

              {/* Quantity */}
            
            <CartBtn product={product}
             className="w-full py-2.5 mt-1 rounded-lg"/>

             <Link href={`/checkout?product_id=${product._id}`}>
<button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-400 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-amber-500">
                BUY WITH <FaPaypal className="inline text-blue-800" size={18} />
                <span className="font-bold italic">
                  <span className="text-blue-800">Pay</span>
                  <span className="text-sky-400">Pal</span>
                </span>
              </button>
             </Link> 

              <div className="mt-4 flex items-center justify-between text-sm">
                <button className="flex items-center gap-1.5 text-emerald-700">
                  <FiHeart className="fill-emerald-700" /> Wishlist added
                </button>
                <button className="flex items-center gap-1.5 text-neutral-600">
                  <FiRefreshCw /> Compare
                </button>
              </div>

              <hr className="my-4 border-neutral-200" />

              <p className="flex items-center gap-1.5 text-sm text-neutral-600">
                <MdVerifiedUser className="text-neutral-500" /> Guaranteed Safe Checkout
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded bg-orange-100 px-1.5 py-1 text-[10px] font-bold text-orange-600">
                  McAfee
                  <br />
                  SECURE
                </span>
                <FaCcPaypal size={30} className="text-blue-700" />
                <FaCcVisa size={30} className="text-blue-800" />
                <FaCcMastercard size={30} className="text-red-500" />
                <FaCcDiscover size={30} className="text-orange-500" />
                <FaCcAmex size={30} className="text-blue-500" />
              </div>
            </div>

            <button className="mt-4 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white">
              Quick Order 24/7
            </button>
            <p className="mt-2 text-center text-lg font-semibold text-neutral-900">
              (025) 3886 25 16
            </p>

            <p className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
              <FiTruck className="shrink-0" />
              Ships from <span className="font-semibold text-neutral-900">United States</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
