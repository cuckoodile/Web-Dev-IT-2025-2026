import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from './HOC/AuthContext';

import UserIcon from "../assets/user-icon.jpg";

export default function Sidebar() {
  const nav = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    nav("/login"); // Navigate to login after logout
  };

  return (
    <aside className={`relative flex `}>
      {/* Sidebar Contents */}
      <div
        className={`border-r flex-1 flex flex-col min-w-[8vw] max-w-[12vw] ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        {/* Header */}
        <header className="text-center">Frieren Store</header>

        {/* Body */}
        <section className="flex-1 flex flex-col py-2 gap-2 border-y">
          <button
            onClick={() => nav("")}
            className="cursor-pointer hover:bg-green-300"
          >
            Home
          </button>
          <button
            onClick={() => nav("all-products")}
            className="cursor-pointer hover:bg-green-300"
          >
            All Products
          </button>

          {/* Admin navigation items - only show when authenticated */}
          {isAuthenticated && (
            <>
              <button
                onClick={() => nav("admin")}
                className="cursor-pointer hover:bg-green-300"
              >
                Admin Dashboard
              </button>
              <button
                onClick={() => nav("admin/products")}
                className="cursor-pointer hover:bg-green-300"
              >
                Manage Products
              </button>
              <button
                onClick={() => nav("admin/shops")}
                className="cursor-pointer hover:bg-green-300"
              >
                Manage Shops
              </button>
            </>
          )}
        </section>

        {/* Footer */}
        <footer className="flex justify-around items-center gap-1">
          {isAuthenticated ? (
            <>
              <img src={UserIcon} alt="User Avatar" className="rounded-full size-10" />
              <div className="flex flex-col">
                <p>{user?.username || user?.email || 'Admin User'}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <p className="mb-2">Guest User</p>
              <button
                onClick={() => nav("/login")}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          )}
        </footer>
      </div>

      {/* Sidebar Trigger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`
          absolute top-[50%] ${
            sidebarOpen ? "-right-1" : "-right-4"
          } size-fit border z-10 bg-emerald-200 hover:bg-emerald-400 cursor-pointer`}
      >
        {/* Conditional Rendering */}
        {/* ${sidebarOpen ? "-right-1" : "-right-4"} is also part of conditional rendering */}
        {sidebarOpen ? "<" : ">"}
      </button>
    </aside>
  );
}
