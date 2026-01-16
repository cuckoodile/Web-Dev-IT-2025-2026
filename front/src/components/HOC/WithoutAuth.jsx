import { useAuth } from './AuthContext';

export function WithoutAuth(Component) {
  return function PublicComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <div className="auth-loading">Loading...</div>;
    }

    if (isAuthenticated) {
      window.location.href = '/admin';
      return null;
    }

    return <Component {...props} />;
  };
}