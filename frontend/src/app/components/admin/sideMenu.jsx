'use client'
import Link from "next/link";
import { TbBrandAppleFilled } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { TbCategoryFilled } from "react-icons/tb";
import { MdOutlineFormatColorFill } from "react-icons/md";
import {FaClock,FaShoppingCart,FaPhoneAlt,FaFolder,FaSuitcase,FaDollarSign,FaComments,
    FaEnvelope,FaCalendarAlt,FaColumns,FaChartBar,FaShareAlt,} from "react-icons/fa";
import { usePathname ,useRouter  } from "next/navigation";
import { AxiosAPI, notify } from "../../library/helper";
import Swal from 'sweetalert2'

const menuItems = [
  {
    icon: <FaClock />,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: <TbCategoryFilled size={23} />,
    label: "Category",
    path: "/admin/category",
  },
  {
    icon: <FaShoppingCart />,
    label: "Products",
    path: "/admin/product",
  },
  {
    icon: <TbBrandAppleFilled size={24} />,
    label: "Brands",
    path: "/admin/brand",
  },
  
  {
    icon: <MdOutlineFormatColorFill size={23} />,
    label: "Color",
    path: "/admin/color",
  },
  {
    icon: <FaDollarSign />,
    label: "Stock",
    path: "/admin/stock",
    badge: "NEW",
  },
  {
    icon: <FaComments />,
    label: "Chat",
    path: "/admin/chat",
  },


  
];

export default function SideMenu() {
const router = useRouter();
  const pathname = usePathname();

  function logout(){
  Swal.fire({
  title: "Are you sure?",
  text: "You have to login again!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Logout!"
}).then((result) => {
  if (result.isConfirmed) Swal.fire(
    AxiosAPI.get("/admin/logout",{withCredentials: true}).then((res)=>{
   
      if(res.data.success){
        notify(res.data.message,true);
        window.location.href = "/admin-login";
      } else {
        notify(res.data.message,false);
      }
  }
  ).catch((err)=>{
    console.log(err)
    notify("Logout failed",false);
  }),{
    
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
});

 
}
  return (
    <div className="w-70 sticky left-0 top-0 z-10 h-screen border-r  bg-gray-100 px-6 py-8 shadow-md">
      
      {/* Logo */}
      <h1 className="text-3xl font-bold text-orange-600 mb-10">
        Admin
      </h1>

      {/* Heading */}
      <p className="text-gray-500 font-semibold uppercase tracking-wide mb-6">
        Apps
      </p>

      {/* Menu */}
       <div className="flex flex-col gap-3">
      {menuItems && menuItems.map((item,index) => (
        <Link href={item.path} key={index}>
          <button 
            className={`flex items-center justify-between w-full px-3 py-3 rounded-xl transition-all duration-300 group
              ${pathname === item.path ? "bg-white shadow-sm" : "hover:bg-white hover:shadow-sm"}
            `}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <span
                className={`text-lg transition ${
                  pathname === item.path ? "text-orange-500" : "text-gray-600 group-hover:text-orange-500"
                }`}
              >
                {item.icon}
              </span>

              {/* Text */}
              <span
                className={`text-lg font-medium transition ${
                  pathname === item.path ? "text-black" : "text-gray-700 group-hover:text-black"
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* Badge */}
            {item.badge && (
              <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md">
                {item.badge}
              </span>
            )}
          </button>
        </Link>
        
      ))}
       <button onClick={logout}
            className={`flex items-center justify-between w-full px-3 py-3 rounded-xl transition-all duration-300 group
             
            `}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <span
                className="text-lg transition"
              >
               <TbLogout2 size={24} />
              </span>

              {/* Text */}
              <span
                className="text-lg font-medium transition"
              >
               Logout
              </span>
            </div>

            
          
          </button>
    </div>
    </div>
  );
}