import { useNavigate } from "react-router-dom";
import verifyToken from "../api/auth/verifyToken";
import { useEffect } from "react";

export const withAuth = (WrappedComponent) => {
  function WithAuthWrapper(props) {
    const navigate = useNavigate();
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      
      if (token) {
        verifyToken(token)
          .then((status) => {
            if (status !== 200) {
              localStorage.clear();
              navigate("/auth");
            }
          })
          .catch(() => {
            localStorage.clear();
            navigate("/auth");
          });
      } else {
        navigate("/auth");
      }
    }, [navigate]);
    return <WrappedComponent {...props} />;
  }
  WithAuthWrapper.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return WithAuthWrapper;
};
