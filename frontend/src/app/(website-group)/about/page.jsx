
import {
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUsers,
  FaAward,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      desc: "Lightning-fast shipping to your doorstep with real-time order tracking.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      desc: "100% secure checkout powered by trusted payment gateways.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Our support team is always available whenever you need help.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco Friendly",
      desc: "Sustainable packaging to reduce our environmental impact.",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Happy Customers",
    },
    {
      number: "15K+",
      label: "Products",
    },
    {
      number: "120+",
      label: "Brands",
    },
    {
      number: "99%",
      label: "Positive Reviews",
    },
  ];

  return (
    <>
 <div className='flex pl-4 flex-row items-center
             py-6 shadow-lg rounded-md font-bold text-sm text-gray-400'>Home /
                <span className='text-gray-800 ml-1'> About Us</span> </div>    
    <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-300 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>

              <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
                About Our Store
              </span>

              <h1 className="text-5xl font-extrabold mt-6 text-gray-900 leading-tight">
                Shopping made
                <span className="text-teal-600"> Simple</span>,
                Fast &
                Reliable
              </h1>

              <p className="text-gray-600 mt-6 text-lg leading-8">
                We believe online shopping should be effortless, enjoyable,
                and trustworthy. Our mission is to bring premium quality
                products, unbeatable prices, and exceptional customer service
                together in one seamless shopping experience.
              </p>

              <button className="mt-8 bg-teal-600 hover:bg-teal-700 text-white px-7 py-4 rounded-xl flex items-center gap-3 transition">
                Explore Store
                <FaArrowRight />
              </button>

            </div>

            {/* Right */}
            <div className="relative">

              <div className="bg-white rounded-3xl shadow-2xl p-10 border border-teal-100">

                <div className="flex justify-center">
                  <div className="bg-teal-100 w-36 h-36 rounded-full flex items-center justify-center">
                    <FaShoppingBag className="text-7xl text-teal-600" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-center mt-8">
                  Trusted by Thousands
                </h3>

                <p className="text-center text-gray-500 mt-3">
                  Delivering quality products with exceptional service since day one.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-teal-100 p-8 text-center hover:-translate-y-2 transition duration-300"
            >
              <h2 className="text-4xl font-bold text-teal-600">
                {item.number}
              </h2>

              <p className="text-gray-600 mt-2">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* STORY */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="bg-teal-600 rounded-3xl p-12 text-white">

            <FaUsers className="text-6xl mb-6" />

            <h2 className="text-4xl font-bold mb-6">
              Our Story
            </h2>

            <p className="leading-8 text-teal-50">
              What started as a small online shop has grown into a trusted
              destination for thousands of shoppers. We continuously improve
              our services, expand our product range, and focus on providing
              customers with a premium shopping experience.
            </p>

          </div>

          <div>

            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Why Customers Choose Us
            </h2>

            <div className="space-y-5">

              {features.map((feature, index) => (

                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-teal-500 hover:shadow-xl transition"
                >

                  <div className="flex gap-5">

                    <div className="bg-teal-100 w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-teal-600">
                      {feature.icon}
                    </div>

                    <div>

                      <h3 className="font-bold text-xl">
                        {feature.title}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {feature.desc}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* VALUES */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <FaAward className="text-6xl text-teal-600 mx-auto" />

            <h2 className="text-4xl font-bold mt-6">
              Our Commitment
            </h2>

            <p className="max-w-3xl mx-auto text-gray-600 mt-6 leading-8">
              Every product we offer is carefully selected to meet our quality
              standards. We are committed to transparency, customer
              satisfaction, and delivering value with every purchase.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl text-white text-center py-16 px-8 shadow-2xl">

            <h2 className="text-4xl font-bold">
              Ready to Start Shopping?
            </h2>

            <p className="mt-5 text-lg text-teal-100">
              Discover thousands of quality products at unbeatable prices.
            </p>

            <button className="mt-8 bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl hover:scale-105 transition">
              Shop Now
            </button>

          </div>

        </div>

      </section>

    </div>
    </>
   
  );
}