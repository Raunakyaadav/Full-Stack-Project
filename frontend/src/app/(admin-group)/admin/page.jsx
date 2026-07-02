import React from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
 
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: "12,540",
    icon: <FaUsers />,
    growth: "+12%",
    positive: true,
  },
  {
    title: "Orders",
    value: "8,320",
    icon: <FaShoppingCart />,
    growth: "+8%",
    positive: true,
  },
  {
    title: "Revenue",
    value: "$24,500",
    icon: <FaDollarSign />,
    growth: "+18%",
    positive: true,
  },
  {
    title: "Expenses",
    value: "$8,200",
    icon: <FaChartLine />,
    growth: "-4%",
    positive: false,
  },
];

const orders = [
  {
    id: "#1024",
    customer: "John Doe",
    product: "MacBook Pro",
    status: "Completed",
    amount: "$1200",
  },
  {
    id: "#1025",
    customer: "Emma Watson",
    product: "iPhone 15",
    status: "Pending",
    amount: "$950",
  },
  {
    id: "#1026",
    customer: "Alex Smith",
    product: "AirPods Max",
    status: "Cancelled",
    amount: "$450",
  },
  {
    id: "#1027",
    customer: "Sophia Lee",
    product: "Gaming PC",
    status: "Completed",
    amount: "$2100",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
     

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
     

        {/* Content */}
        <main className="p-6">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back Raunak 👋
            </h2>
            <p className="text-gray-500 mt-1">
              Here’s what’s happening with your store today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{item.title}</p>
                    <h3 className="text-3xl font-bold mt-2 text-gray-800">
                      {item.value}
                    </h3>
                  </div>

                  <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl text-2xl">
                    {item.icon}
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1 mt-5 text-sm font-medium ${
                    item.positive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.positive ? <FaArrowUp /> : <FaArrowDown />}
                  {item.growth} this month
                </div>
              </div>
            ))}
          </div>

          {/* Charts + Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Revenue Overview
                </h3>

                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>
              </div>

              {/* Fake Chart */}
              <div className="flex items-end gap-4 h-72">
                {[40, 70, 55, 90, 65, 85, 75, 100].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t-xl hover:bg-blue-600 transition-all duration-300"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Recent Activity
              </h3>

              <div className="space-y-5">
                {[
                  "New order received",
                  "Payment completed",
                  "New user registered",
                  "Server updated",
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 border-b pb-4 last:border-none"
                  >
                    <div className="w-3 h-3 mt-2 rounded-full bg-blue-500"></div>

                    <div>
                      <p className="font-medium text-gray-700">{activity}</p>
                      <span className="text-sm text-gray-400">
                        {index + 1} hour ago
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Orders
              </h3>
            </div>

            <table className="w-full min-w-175">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 font-medium text-gray-700">
                      {order.id}
                    </td>

                    <td className="py-4 px-6 text-gray-600">
                      {order.customer}
                    </td>

                    <td className="py-4 px-6 text-gray-600">
                      {order.product}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {order.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;