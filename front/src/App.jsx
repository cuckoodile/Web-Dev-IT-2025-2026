import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div>
      <div className="bg-emerald-200 min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-2 bg-amber-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
