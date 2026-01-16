import { useAuth } from "./AuthContext";

export function WithAuth(Component) {
  return function ProtectedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div className="auth-loading">Checking authentication...</div>;
    }

    if (!isAuthenticated) {
      window.location.href = "/login"; // Change to route the user will be redirected to upon accessing protected routes
      return null;
    }

    // Another check for authenticated user role
    // ....

    return <Component {...props} />; // Admin page
  };
}
