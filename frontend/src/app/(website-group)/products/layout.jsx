import CategoryFilter from "@/app/components/website/categoryFilter";
import BrandFilter from "@/app/components/website/brandFilter";
import ColorFilter from "@/app/components/website/colorFilter";
import { getCategory } from "@/app/library/api-call";
import Responsive from "@/app/components/website/slider";
import Link from "next/link";


export default async function RootLayout({ children }) {
  const category = await getCategory();
  return (
    <html
      lang="en"
    >
      <body>
      
         <div className='h-auto pt-3 pb-4 px-1 bg-gray-100'>
            <div className='flex pl-4 flex-row items-center bg-[#ffffff]
             py-6 shadow-md rounded-md font-bold text-sm text-gray-400'>Home / Shop /
                <span className='text-gray-800 ml-1'> Mobiles</span> </div>


  
 {/* category section  */}
 
<div className=" mt-2 pt-4 mx-auto grid xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
  
  <h2 className="font-bold text-xl col-span-full mb-2">
    POPULAR CATEGORIES
  </h2>

  {category.map((cat, i) => {
    return (
      <div
        key={i}
        className="flex justify-around items-center gap-3 cursor-pointer"
      >
          {/* Text */}
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
            {cat.name}
          </span>

          <span className="text-xs sm:text-sm text-gray-400 font-medium">
            {cat.productCount} Items
          </span>
        </div>
        {/* Image */}
      <Link href={`/products/${cat.slug}`}>
      <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1">
          <img
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              `/images/category/${cat.image}`
            }
            alt={cat.name}
            className="w-full h-full object-contain mix-blend-multiply"
            loading="lazy"
          />
        </div>

      </Link>  
      
      </div>
    );
  })}
</div>
 

    



            <div className='grid grid-cols-8 md:gap-4 py-5 mt-2 md:px-7 bg-white'>
                <div className='hidden md:block col-span-2'>
                  
                   <CategoryFilter/>
                    <BrandFilter/>
                    <ColorFilter/>
                </div>

                <div className='col-span-6 py-2 mx-auto rounded-lg'>
                  {children}

                </div>
            </div>
        </div>
        
       
          </body>
      
    </html>
  );
}
