import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import Product from "./pages/Product.jsx";
import UserIndex from "./pages/user/Index.jsx";
import MyProfile from "./pages/user/MyProfile.jsx";
import MyCart from "./pages/user/MyCart.jsx";
import MyPurchase from "./pages/user/MyPurchase.jsx";

const router = createBrowserRouter([
  {
    element: <Auth />,
    path: "/auth/",
  },
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Index />,
        path: "/",
      },
      {
        element: <AllProducts />,
        path: "/allproducts/",
      },
      {
        element: <Product />,
        path: "/product/:id/",
      },
      {
        element: <UserIndex />,
        path: "/user/:id/",
        children: [
          {
            element: <MyProfile />,
            path: "/user/:id/",
          },
          {
            element: <MyCart />,
            path: "/user/:id/mycart",
          },
          {
            element: <MyPurchase />,
            path: "/user/:id/mypurchase",
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
