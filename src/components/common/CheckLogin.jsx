import { Navigate } from "react-router-dom";
import useContexts from "../../hooks/useContexts";

const CheckLogin = ({ children }) => {
  const { userInfo } = useContexts();
  return userInfo === null ? children : <Navigate to="/dashboard" />;
};

export default CheckLogin;
