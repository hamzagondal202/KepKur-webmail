import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('token') ? true : false; // Check if user is authenticated
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />; // Redirect to login page if not authenticated
  }

  return <Outlet />; // Allow access to protected routes if authenticated
};

export default PrivateRoute;
