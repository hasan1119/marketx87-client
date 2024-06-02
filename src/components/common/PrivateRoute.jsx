import { Navigate } from "react-router-dom";
import useContexts from "../../hooks/useContexts";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useContexts();

  return userInfo !== null ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
