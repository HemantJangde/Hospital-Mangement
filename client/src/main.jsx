import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./Component/AuthPage.jsx";
import Layout from "./Component/Layout.jsx";
import Home from "./Component/Home.jsx";
import About from "./Component/About.jsx";
import Contact from "./Component/Contact.jsx";
import Page1 from "./Component/Page1.jsx";
import AppointScheduling from "./Component/appointments.jsx";
import ManageAppointment from "./Component/ManageAppoinment.jsx";
import Register from "./Component/Register.jsx";
import DashboardLayout from "./Component/Dashboard.jsx";

// ✅ Small wrapper for protecting routes
const ProtectedRoute = ({ element, role }) => {
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user from localStorage

  if (!user) {
    return <AuthPage />; // redirect if not logged in
  }

  if (role && user.role !== role) {
    return <h2 className="text-danger text-center mt-5">⛔ Access Denied</h2>;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      // ✅ Public Pages
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "page1", element: <Page1 /> },

      // ✅ Authenticated Pages (both admin + user)
      {
        path: "dashboard",
        element: <ProtectedRoute element={<DashboardLayout />} />,
      },
      {
        path: "appointments",
        element: <ProtectedRoute element={<AppointScheduling />} />,
      },
      {
        path: "register",
        element: <ProtectedRoute element={<Register />} />,
      },

      // ✅ Admin Only Page
      {
        path: "manage-appointments",
        element: <ProtectedRoute element={<ManageAppointment />} role="admin" />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
