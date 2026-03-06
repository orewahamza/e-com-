import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin/assets";
import { ShopContext } from "../../context/ShopContext";

const Orders = () => {
  const { token, backendUrl, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders();

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }




  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <p className="mb-4 font-medium text-lg text-red-500">Order Page</p>
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-red-900 p-5 md:p-8 text-sm text-red-400 bg-black rounded-lg shadow-sm hover:shadow-md transition-shadow" key={index}>
            <img className="w-12 h-12 object-contain bg-brand-black-900 rounded p-1" src={assets.parcel_icon} alt="parcel_icon" />
            <div>
              <div className="mb-2">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5 font-medium" key={index}>
                        {item.name} x {item.quantity} <span className="text-red-300 text-xs ml-1 px-2 py-0.5 bg-red-900/20 rounded border border-red-900">{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5 font-medium" key={index}>
                        {item.name} x {item.quantity} <span className="text-red-300 text-xs ml-1 px-2 py-0.5 bg-red-900/20 rounded border border-red-900">{item.size}</span>
                      </p>
                    );
                  }
                })}
              </div>

              <p className="mt-3 mb-1 font-semibold text-red-500">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="text-red-400 text-xs leading-relaxed">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>

              <p className="mt-2 text-xs text-red-400 font-medium">{order.address.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date & Time: {new Date(order.date).toLocaleString()}</p>
              <p></p>
            </div>


            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold bg-brand-black-900 text-red-500 border border-red-900 rounded outline-none focus:border-red-600">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
