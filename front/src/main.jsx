import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/shop/Home.jsx";
import ProductDetail from "./pages/shop/ProductDetail.jsx";
import AllProducts from "./pages/shop/AllProducts.jsx";

const query = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        path: "",
        element: <Home />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
    ],
  },
  // {
  //   path: "login",
  //   element: <Login />,
  // },
  // {
  //   path: "register",
  //   element: <Register />,
  // }
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={query}>
    <RouterProvider router={routes} />
  </QueryClientProvider>
);
