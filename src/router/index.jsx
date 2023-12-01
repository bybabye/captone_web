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

import DescriptionPage from "../pages/Description";

// eslint-disable-next-line react-refresh/only-export-components
export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
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
        element : <RegisterPage/>,
        path: "/register"
      },
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element : <DescriptionPage/>,
        path: "/description"
      }
    ,
      {
        element: <ProtectedRoute />,
        path: "/",
        children: [
          {
            element: <HomePage />,
            path: "/home/login=true",
          },
          {
            element: <ProfilePage />,
            path: "/profile",
          },
          {
            element: <Messages/>,
            path: "/message",
            children : [
              {
                element : <Chat/>,
                path: "chat/:messId"
              }
            ]
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
