

import {Outlet,Navigate} from 'react-router-dom'


// kiểm tra nếu token trong localStorage bằng null thì cho về login
function ProtectedRoute ()  {
   
    if (!localStorage.getItem('accessToken')) {
        return <Navigate to='/login' />;
    }

    return (
        <Outlet/>
    );
}

export default ProtectedRoute;