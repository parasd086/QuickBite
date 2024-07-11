import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  //isAuthenticated returns boolean T/F
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return null; //do nothing untile useAuth0 stuff is finished
  }

  //Outlet= is childrens of a Route
  if (isAuthenticated) {
    return <Outlet />;
  }

  //last case- if user is not authenticated
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
