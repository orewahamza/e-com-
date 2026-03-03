import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const hostId = localStorage.getItem('hostId');
      const response = await axios.get(backendUrl + "/api/product/user-list", { 
        headers: { 
          token,
          userId: hostId // Pass hostId if available
        } 
      });

      if (response.data.success) {
        setList(response.data.products);
        setFilteredList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (search === "") {
      setFilteredList(list);
    } else {
      const lower = search.toLowerCase();
      setFilteredList(list.filter(item => item.name.toLowerCase().includes(lower)));
    }
  }, [search, list]);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setActiveMenu(null);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      // If undefined, treat as true (Published)
      const isPublished = currentStatus !== false;
      const formData = new FormData();
      formData.append('isPublished', !isPublished);

      const response = await axios.put(`${backendUrl}/api/product/${id}`, formData, { headers: { token } });
      if (response.data.success) {
        toast.success("Product status updated");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setActiveMenu(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium text-lg text-red-500">All Products List</p>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-red-900 bg-gray-900 text-red-500 rounded-lg focus:outline-none focus:border-red-600 placeholder-red-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* ------ List Table Title--------- */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-4 border border-red-900 bg-black text-sm font-medium rounded-t-lg text-red-500">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Status</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product List--------- */}

        {filteredList.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 border border-t-0 border-red-900 text-sm hover:bg-red-900/20 transition-colors relative"
            key={index}
          >
            <img className="w-12 h-12 object-cover rounded-md border border-red-900" src={item.image[0]} alt="product_image" />
            <p className="font-medium truncate pr-4 text-red-500">{item.name}</p>
            <p className="hidden md:block text-red-400">{item.category}</p>
            <p className="font-medium text-red-500">
              {currency}
              {item.price}
            </p>

            {/* Status Column */}
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isPublished !== false ? 'bg-green-900 text-green-300' : 'bg-brand-black-900 text-brand-blue-300'}`}>
                {item.isPublished !== false ? 'Published' : 'Draft'}
              </span>
            </div>

            {/* Action Column with Dropdown */}
            <div className="text-right md:text-center relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === item._id ? null : item._id);
                }}
                className="p-2 hover:bg-red-900/30 rounded-full transition-colors"
              >
                {/* Three dots icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>

              {activeMenu === item._id && (
                <div className="absolute right-0 top-10 w-48 bg-black rounded-md shadow-lg z-10 border border-red-900 overflow-hidden text-left">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/edit/${item._id}`); }}
                    className="block w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 text-left"
                  >
                    Edit Item
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleStatus(item._id, item.isPublished); }}
                    className="block w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 text-left"
                  >
                    {item.isPublished !== false ? 'Set to Draft' : 'Set to Publish'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeProduct(item._id); }}
                    className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-900/30 text-left"
                  >
                    Delete Item
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
