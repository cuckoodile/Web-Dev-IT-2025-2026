import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/HOC/AuthContext";

import "./index.css";
import App from "./App.jsx";

// Shop pages
import Home from "./pages/shop/Home.jsx";
import ProductDetail from "./pages/shop/ProductDetail.jsx";
import AllProducts from "./pages/shop/AllProducts.jsx";

// Admin pages
import Products from "./pages/admin/Products.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Shops from "./pages/admin/Shops.jsx";
import AdminIndex from "./pages/admin/Index.jsx";

// Other pages
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";

// HOC Components
import { WithAuth } from "./components/HOC/WithAuth";
import { WithoutAuth } from "./components/HOC/WithoutAuth";

const query = new QueryClient();

// Create protected components
const ProtectedLogin = WithoutAuth(Login);
const ProtectedAdminIndex = WithAuth(AdminIndex);
const ProtectedDashboard = WithAuth(Dashboard);
const ProtectedAdminProducts = WithAuth(Products);
const ProtectedShops = WithAuth(Shops);

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <ProtectedLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "/admin",
        element: <ProtectedAdminIndex />,
        children: [
          {
            index: true,
            element: <ProtectedDashboard />,
          },
          {
            path: "dashboard",
            element: <ProtectedDashboard />,
          },
          {
            path: "products",
            element: <ProtectedAdminProducts />,
          },
          {
            path: "shops",
            element: <ProtectedShops />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
