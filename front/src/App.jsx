import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div>
      <div className="bg-red-400 min-h-screen flex text-yellow-400">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-2 bg-red-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}