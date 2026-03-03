import { assets } from "./../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import SettingsModal from "./SettingsModal";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    userRole,
    userType,
    userId,
    backendUrl
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    // toast.success("Logout successful");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <span className="text-3xl font-bold tracking-wide uppercase bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">fash-shop</span>
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-brand-blue-50">
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-red-500 transition-colors">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-red-500 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 hover:text-red-500 transition-colors">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-red-500 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 hover:text-red-500 transition-colors">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-red-500 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-red-500 transition-colors">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-red-500 hidden" />
        </NavLink>

        {userType === 'host' && (
          <NavLink to="/host-panel" className="flex flex-col items-center gap-1 ">
            <span className="border border-red-600 px-5 text-sm py-1 rounded-full -mt-1 hover:bg-red-900 transition-colors">
              Host Panel
            </span>
            <hr className="w-2/4 border-none h-[1.5px] bg-red-600 hidden" />
          </NavLink>
        )}
      </ul>

      <div className="flex items-center gap-6">
        {location.pathname.includes('collection') && <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer icon-red hover:opacity-80 transition-opacity"
          alt="searchIcon"
        />}

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer icon-red hover:opacity-80 transition-opacity"
            alt="profileIcon"
          />

          {/* dropdown menu for profile icon */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 rounded border border-red-900 text-brand-blue-300 bg-black bg-gradient-to-br from-primary/20 to-secondary/20">
                <p
                  onClick={() => navigate("/fash-shop/profile")}
                  className="cursor-pointer hover:text-red-500"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-red-500"
                >
                  Orders
                </p>
                <p
                  onClick={() => setShowSettings(true)}
                  className="cursor-pointer hover:text-red-500"
                >
                  Settings
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-red-500">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* card icon start */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5 icon-red hover:opacity-80 transition-opacity" alt="cartIco" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        {/* card icon end */}

        {/* mobile responsive menu icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 cursor-pointer sm:hidden icon-red hover:opacity-80 transition-opacity"
        />
      </div>

      {/* sidebar menu for small screen basically for mobile */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-black bg-gradient-to-b from-primary/30 to-secondary/30 transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-brand-blue-300">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180 icon-red"
              src={assets.dropdown_icon}
              alt="close_icon"
            />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border border-brand-black-950/30 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border border-brand-black-950/30 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border border-brand-black-950/30 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border border-brand-black-950/30 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
            to="/contact"
          >
            Contact
          </NavLink>
          {userType === 'host' && (
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border border-brand-black-950/30 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20"
              to="/host-panel"
            >
              Host Panel
            </NavLink>
          )}
        </div>
      </div>
      
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

export default Navbar;
