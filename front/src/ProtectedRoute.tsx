import { Navigate } from "react-router";

export type ProtectedRouteProps = {
  isAuthentication: boolean;
  outlet: JSX.Element;
  redirectPath?: string;
};

export default function ProtectedRoute({
  isAuthentication,
  outlet,
  redirectPath = "/login",
}: ProtectedRouteProps) {
  if (isAuthentication) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: redirectPath }} />;
  }
}
