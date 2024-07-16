import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../constant/Constants";

function PrivateRoute({ element }) {
  let location = useLocation();

  if (!localStorage.getItem(ACCESS_TOKEN_NAME)) {
      // No token found, redirect to login
      return <Navigate to="/login" state={{ from: location }} />;
    }
  

  return (element);
}

export default PrivateRoute;
