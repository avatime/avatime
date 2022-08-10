import { Navigate } from "react-router";

export type ProtectedRouteProps = {
    isLogin: boolean;
    outlet: JSX.Element;
  };
  
  export default function ProtectedRoute({isLogin, outlet}: ProtectedRouteProps) {
    if(isLogin) {
      return outlet;
    } else {
      return <Navigate to={{ pathname: "/login" }} />;
    }
  };
  