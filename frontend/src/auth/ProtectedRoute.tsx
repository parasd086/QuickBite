import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  //isAuthenticated returns boolean T/F
  const { isAuthenticated } = useAuth0();

  //Outlet= is childrens of a Route
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
