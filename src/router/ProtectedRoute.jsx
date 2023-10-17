

import {Outlet} from 'react-router-dom'

function ProtectedRoute ()  {
    // const navigate = useNavigate();
    // if (!localStorage.getItem('accessToken')) {
    //     return <Navigate to='/login' />;
    //   }

    return (
        <Outlet/>
    );
}

export default ProtectedRoute;