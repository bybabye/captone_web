import {Outlet,Navigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';


// kiểm tra nếu token trong localStorage bằng null thì cho về login
function AdminProtectedRoute ()  {
    const { user } = useContext(AuthContext);
    if (!localStorage.getItem('accessToken')) {
        return <Navigate to='/login' />;
    }
    if(user.roles !== "admin") {
        return <Navigate to='/login' />;
    }

    return (
        <Outlet/>
    );
}


export  default AdminProtectedRoute;