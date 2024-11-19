import { Location, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";

type ProtectedRouteProps = {
  children: JSX.Element;
};

//This component will check if token exists or not. If not redirect user to home page
const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const {token} = useAppSelector(state=>state.user);
  const location : Location<any>= useLocation();
  if (!token) {
    return <Navigate to="/about" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;