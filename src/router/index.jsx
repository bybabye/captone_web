
import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import LoginPage from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/Home";
import ProfilePage from "../pages/Profile";
import PostPage from "../pages/Post";

// eslint-disable-next-line react-refresh/only-export-components
export function AuthLayout  ()  {
    return ( 
        <Outlet/>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
    {
        element : <AuthLayout/>,
        errorElement : <ErrorPage/>,
        children: [
            {
                element : <LoginPage/>,
                path: "/login"
            },
            {
                element : <HomePage/>,
                path: "/home"
            },
            {
                element : <ProtectedRoute/>,
                path: "/",
                children : [
                    {
                        element : <ProfilePage/>,
                        path: "/profile"
                    },
                    {
                        element : <PostPage/>,
                        path: "/post"
                    },
                ]
            }
        ]
    }
])