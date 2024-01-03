import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import LoginPage from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import PostPage from "../pages/Post";
import AuthProvider from "../context/AuthProvider";
import Messages from "../pages/Messages";
import Chat from "../components/chat";
import RegisterPage from "../pages/Register";

// import Host from "../admin/Host/Host";

import DescriptionPage from "../pages/Description";
import RentalPage from "../pages/rental";
import Contact from "../pages/contact";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminPage from "../pages/admin";
import HomePageAdmin from "../pages/admin/home";
import ReportAdminPage from "../pages/admin/report";
import ReportPage from "../pages/Report";
import InfomationUser from "../pages/admin/InfomationUser";
import InfomationReport from "../pages/admin/InfomationReport";

// eslint-disable-next-line react-refresh/only-export-components
export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginPage />,
        path: "/login",
      },

      {
        element: <RegisterPage />,
        path: "/register",
      },

      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <DescriptionPage />,
        path: "/description/:homeId",
      },
      {
        element: <AdminProtectedRoute />,
        path: "/",
        children: [
          {
            element: <AdminPage />,
            path: "/admin",
            children : [
              {
                element : <HomePageAdmin/>,
                path: "/admin",
              },
              {
                element : <InfomationUser/>,
                path: "/admin/:id"
              },
              {
                element : <ReportAdminPage/>,
                path: "/admin/report",
              },
              {
                element : <InfomationReport/>,
                path: "/admin/report/:id"
              },
            ]
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        path: "/",
        children: [
          {
            element: <RentalPage />,
            path: "/rental",
          },
          {
            element: <ReportPage />,
            path: "/report",
          },
          {
            element: <Contact />,
            path: "/rental/:rentalId",
          },
          {
            element: <HomePage />,
            path: "/home/login=true",
          },
          {
            element: <ProfilePage />,
            path: "/profile",
          },

          {
            element: <Messages />,
            path: "/message",
            children: [
              {
                element: <Chat />,
                path: "chat/:messId",
              },
            ],
          },
          {
            element: <PostPage />,
            path: "/post",
          },
        ],
      },
    ],
  },
]);
