import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./layout/Root";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import AuthProvider from "./contexts/AuthProvider";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import MyBid from "./pages/MyBid/MyBid";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("http://localhost:5000/latest-products"),
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "product/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
        Component: ProductDetails,
      },
      {
        path: "/myBid",
        Component: MyBid,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
