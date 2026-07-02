"use client";
import { AxiosAPI } from "@/app/library/helper";
import { setUser } from "@/app/redux/features/userSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Defaulting to false to show the Register state from your image first
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatcher = useDispatch();
  const cartdata = useSelector((state)=>state.cart)
  const router = useRouter();
 console.log(cartdata)

  const userLogin = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (!isLogin) {
      AxiosAPI.post("/user/register", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      AxiosAPI.post("/user/login", data)
        .then(async (res) => {
          console.log(res)
        if(res.data.success==true){
                router.back()
               }
          dispatcher(
            setUser({
              user: res.data.user,
              token: res.data.token, 
            }),
          ) 
            

        const updateData =  await  AxiosAPI.post("/cart/dbtocart",{
              cart : cartdata.cart ,
              userId : res.data.user._id
             })
             console.log(updateData)
                let  original_total = 0
                let final_total = 0
                const cart = updateData.map((item)=>{
                  original_total += item.product_id.originalPrice *item.qty ;
                  final_total += item.product_id.finalPrice * item.qty

                  return{
                    productId : item.productId._id,
                    qty : item.qty
                  }
                })
               localStorage.setItem("cart", JSON.stringify({cart,original_total,final_total}))
             
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex min-h-screen w-full  justify-center bg-slate-50 font-sans p-6 ">
      <div className="mx-auto  flex w-full max-w-6xl justify-between gap-12 ">
        {/* Left Side: Premium Illustration & Decorative Elements */}
        <div className="relative mt-13 hidden md:flex flex-1  justify-center max-w-md lg:max-w-none">
          {/* Subtle backdrops to elevate the look */}
          <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="relative z-10 w-full transform transition-all duration-500 hover:scale-[1.01]">
            {/* Embedded Responsive SVG Illustration (matches your image concept) */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-auto drop-shadow-xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Device Structure */}
              <rect
                x="220"
                y="80"
                width="280"
                height="460"
                rx="40"
                fill="#0f172a"
              />
              <rect
                x="235"
                y="95"
                width="250"
                height="430"
                rx="30"
                fill="#ffffff"
              />
              <path
                d="M320 95H400V110C400 118.284 393.284 125 385 125H335C326.716 125 320 118.284 320 110V95Z"
                fill="#0f172a"
              />
              <rect
                x="240"
                y="140"
                width="240"
                height="375"
                rx="16"
                fill="#f8fafc"
              />

              {/* Floating Shield */}
              <path
                d="M410 240V280C410 315 460 340 460 340C460 340 510 315 510 280V240H410Z"
                fill="#02b0a4"
                opacity="0.1"
              />
              <path
                d="M410 240V280C410 315 460 340 460 340C460 340 510 315 510 280V240H410Z"
                stroke="#02b0a4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M440 285L453 298L482 265"
                stroke="#02b0a4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Floating Security Padlock Icon */}
              <rect
                x="200"
                y="160"
                width="70"
                height="60"
                rx="16"
                fill="#4f46e5"
              />
              <path
                d="M220 160V140C220 131.716 226.716 125 235 125C243.284 125 250 131.716 250 140V160"
                stroke="#ffffff"
                strokeWidth="4"
              />
              <circle cx="235" cy="185" r="5" fill="#ffffff" />

              {/* Credit Card Graphic */}
              <rect
                x="90"
                y="340"
                width="170"
                height="110"
                rx="12"
                fill="#02b0a4"
              />
              <rect
                x="105"
                y="360"
                width="30"
                height="22"
                rx="4"
                fill="#ffffff"
                opacity="0.8"
              />
              <rect
                x="105"
                y="420"
                width="140"
                height="10"
                rx="2"
                fill="#ffffff"
                opacity="0.4"
              />

              {/* Decorative Tech Gears */}
              <circle
                cx="310"
                cy="150"
                r="12"
                stroke="#4f46e5"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
              <circle
                cx="340"
                cy="165"
                r="8"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeDasharray="3 1"
              />

              {/* Left Character (Sitting on Credit Card) */}
              <circle cx="170" cy="275" r="14" fill="#ffb885" />
              <path
                d="M168 273C165 265 175 260 175 260"
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M150 320C150 295 162 288 172 288C182 288 190 295 190 320V360H150V320Z"
                fill="#eab308"
              />
              <path
                d="M160 360V425L185 435"
                stroke="#0f172a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M180 360V425L205 435"
                stroke="#0f172a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M175 310L195 325"
                stroke="#ffb885"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Right Character */}
              <circle cx="530" cy="295" r="14" fill="#ffb885" />
              <path
                d="M515 340C515 315 525 308 535 308C545 308 555 315 555 340V410H515V340Z"
                fill="#38bdf8"
              />
              <path
                d="M525 410V490"
                stroke="#475569"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M545 410V490"
                stroke="#475569"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M535 330L515 350"
                stroke="#ffb885"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Plant Pots & Foliage */}
              <path d="M415 490H455L450 520H420L415 490Z" fill="#475569" />
              <path
                d="M435 490Q420 440 440 420Q460 450 435 490Z"
                fill="#22c55e"
              />
              <path
                d="M435 490Q455 450 465 440Q460 475 435 490Z"
                fill="#15803d"
              />

              <path d="M375 498H405L401 520H379L375 498Z" fill="#475569" />
              <path
                d="M390 498Q380 460 395 450Q410 470 390 498Z"
                fill="#22c55e"
              />

              {/* Floating Chat Bubble */}
              <rect
                x="135"
                y="200"
                width="40"
                height="40"
                rx="10"
                fill="#22c55e"
              />
              <path d="M150 240L155 248V240H150Z" fill="#22c55e" />
              <text
                x="148"
                y="226"
                fill="#ffffff"
                fontWeight="bold"
                fontSize="18"
              >
                $
              </text>

              <rect
                x="520"
                y="220"
                width="55"
                height="35"
                rx="10"
                fill="#eab308"
              />
              <path d="M540 255L543 260V255H540Z" fill="#eab308" />
              <circle cx="535" cy="237" r="2.5" fill="#ffffff" />
              <circle cx="547.5" cy="237" r="2.5" fill="#ffffff" />
              <circle cx="560" cy="237" r="2.5" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Right Side: Authentication Panel */}
        <div
          className={`${isLogin ? "mt-13" : "mt-1"} flex-1 max-w-xl transition-all duration-300`}
        >
          <div className=" p-8 rounded-3xl ">
            {/* Header Titles */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#02b0a4]">
                {isLogin ? "Welcome Back" : "Register"}
              </h2>
              <p className="mt-1.5 ml-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {isLogin ? "Login to continue" : "Join To Us"}
              </p>
            </div>

            {/* Dynamic Form Structure */}
            <form onSubmit={userLogin} className="space-y-5">
              {/* Name Field - Conditional Rendering based on state */}
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jhon Deo"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all focus:border-[#02b0a4] focus:ring-4 focus:ring-[#02b0a4]/10"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Example@gmail.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all focus:border-[#02b0a4] focus:ring-4 focus:ring-[#02b0a4]/10"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••"
                    name="password"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-4 pr-11 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all focus:border-[#02b0a4] focus:ring-4 focus:ring-[#02b0a4]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field - Only visible in Register state */}
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-4 pr-11 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all focus:border-[#02b0a4] focus:ring-4 focus:ring-[#02b0a4]/10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#02b0a4] py-3.5 text-sm font-semibold text-white shadow-md shadow-[#02b0a4]/20 transition-all hover:bg-[#02968c] hover:shadow-lg hover:shadow-[#02b0a4]/30 active:scale-[0.99] uppercase tracking-wide"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            {/* Alternating Toggle Trigger Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {isLogin ? "New to the platform? " : "Already user ? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-emerald-500 hover:text-emerald-600 underline-offset-2 transition-colors hover:underline"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
