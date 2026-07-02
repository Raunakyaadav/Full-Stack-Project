import React from 'react';
import Link from 'next/link';
import CartBtn from './CartBtn';



const ProductCard = ({product}) => {
  
  return (
    
   <div className="group w-45 sm:w-58 mx-auto bg-white border border-gray-100 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 p-4">
  
  {/* Image Container with Hover Zoom */}
  <div >
   <Link href={`/product/${product._id}`} className="w-full h-32 sm:h-36  rounded-xl overflow-hidden flex items-center justify-center mb-3">
    <img
      src={process.env.NEXT_PUBLIC_BASE_URL+`/images/product/${product.thumbnail}`}
      alt={product.name}
      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-102"
    />
   </Link>
  </div>

  {/* Product Info */}
  <div className="space-y-1">
    <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-200">
      {product.name}
    </h3>

    {/* Pricing Section */}
    <div className="flex flex-wrap items-baseline gap-1.5 pt-1">
      <span className="text-base font-bold text-gray-900">₹{product.finalPrice}</span>
      <span className="text-xs line-through text-gray-400">₹{product.originalPrice}</span>
      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
        {product.discountPercentage}% OFF
      </span>
    </div>
  </div>

  {/* Button */}
<CartBtn product={product}  className="w-full py-2 mt-1.5 rounded-xl"/>
</div>
  );
};

export default ProductCard;

