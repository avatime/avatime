import { Navigate } from "react-router";

export type ProtectedRouteProps = {
  isAuthentication: boolean;
  outlet: JSX.Element;
  pathname?: string;
};

export default function ProtectedRoute({
  isAuthentication,
  outlet,
  pathname = "/login",
}: ProtectedRouteProps) {
  if (isAuthentication) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: pathname }} />;
  }
}
