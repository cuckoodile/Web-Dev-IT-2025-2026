import { useState } from "react";
import { useNavigate } from "react-router";

import UserIcon from "../assets/user-icon.jpg";

export default function Sidebar() {
  const nav = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <aside className={`relative flex `}>
      {/* Sidebar Contents */}
      <div
        className={`border-r flex-1 flex flex-col min-w-[12vw] ${
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
            onClick={() => nav("products")}
            className="cursor-pointer hover:bg-green-300"
          >
            All Products
          </button>
          <button
            onClick={() => nav("products/1")}
            className="cursor-pointer hover:bg-green-300"
          >
            Product
          </button>
        </section>

        {/* Footer */}
        <footer className="flex justify-around items-center gap-1">
          <img src={UserIcon} alt="Puriren" className="rounded-full size-10" />
          <p>Ian Sube</p>
        </footer>
      </div>

      {/* Sidebar Trigger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`
          absolute top-[50%] ${sidebarOpen ? "-right-1" : "-right-4"} size-fit border z-10 bg-emerald-200 hover:bg-emerald-400 cursor-pointer`}
      >
        {/* Conditional Rendering */}
        {/* ${sidebarOpen ? "-right-1" : "-right-4"} is also part of conditional rendering */}
        {sidebarOpen ? "<" : ">"}
      </button>
    </aside>
  );
}
