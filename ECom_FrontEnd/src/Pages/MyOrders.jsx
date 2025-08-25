// 
import React from "react";
import { useAppContext } from "../Context/Context";

const MyOrders = () => {
  const { orders, currency } = useAppContext();

  if (!orders || orders.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-400 italic">
        No orders found
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-black">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 rounded-2xl shadow-lg border border-white/30 bg-white/20 backdrop-blur-md transition hover:scale-[1.02] hover:shadow-2xl"
          >
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-grey/90">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Payment:</strong> {order.payment}</p>

              {/* ✅ Show Payment ID only if online */}
              {order.payment === "Online" && order.paymentId && (
                <p>
                  <strong>Payment ID:</strong> {order.paymentId}
                  
                </p>
              )}

              <p>
                <strong>Total:</strong>{" "}
                <span className="text-green-300 font-bold">
                  {currency}{order.total}
                </span>
              </p>
            </div>

            {/* ✅ Address Section */}
            {order.address && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-grey mb-2">Shipping Address:</h3>
                <p className="text-gray-700">
                  {order.address.street}, {order.address.city}, {order.address.state},{" "}
                  {order.address.country}
                </p>
              </div>
            )}

            {/* Items */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-grey mb-2">Items:</h3>
              <ul className="list-disc ml-6 text-grey/90 space-y-1">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} x {item.quantity} ={" "}
                    <span className="font-semibold">
                      {currency}{item.offerPrice * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
