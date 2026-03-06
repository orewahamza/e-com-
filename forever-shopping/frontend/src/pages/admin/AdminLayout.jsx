import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/Sidebar';
import { ShopContext } from '../../context/ShopContext';

const AdminLayout = () => {
  const { token, userType, setToken } = useContext(ShopContext);

  // Guard: Only allow hosts
  if (userType !== 'host') {
    return <Navigate to="/" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-black min-h-screen text-red-500 pt-5">
      <hr className="border-red-900 opacity-30 px-4 sm:px-[5vw]" />
      <div className="flex w-full mt-5">
        <AdminSidebar />
        <div className="flex-1 mx-auto ml-[max(5vw,25px)] mb-8 text-red-500 text-base pr-[5vw]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
