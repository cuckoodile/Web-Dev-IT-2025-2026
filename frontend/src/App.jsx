import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const [userToken, setUserToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/auth");
  };

  return (
    <div className="bg-blue-300 h-screen w-screen flex flex-col items-center gap-9 p-6 overflow-x-hidden">
      <div className="bg-green-200 w-full flex flex-col">
        <p className="text-red-500 mb-3 border-b border-gray-700">TEST</p>
        <Link to={"/auth/"} className="hover:bg-green-300 duration-300">
          Login/ Register
        </Link>
        <Link to={"/"} className="hover:bg-green-300 duration-300">
          Index
        </Link>
        <Link to={"/allproducts/"} className="hover:bg-green-300 duration-300">
          All Products
        </Link>
        <Link to={"/product/1/"} className="hover:bg-green-300 duration-300">
          Product 1
        </Link>
        <Link to={"/user/1/"} className="hover:bg-green-300 duration-300">
          Profile
        </Link>
        <Link
          to={"/user/1/mycart/"}
          className="hover:bg-green-300 duration-300"
        >
          MyCart
        </Link>
        <Link
          to={"/user/1/mypurchase/"}
          className="hover:bg-green-300 duration-300"
        >
          MyPurchase
        </Link>
        <span
          onClick={() => handleLogout()}
          className="hover:bg-green-300 duration-300 cursor-pointer"
          hidden={userToken ? false : true}
        >
          Logout
        </span>
      </div>

      <div className="size-full">
        <Outlet />
      </div>
    </div>
  );
}
