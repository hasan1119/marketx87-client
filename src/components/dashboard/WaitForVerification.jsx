import { Navigate } from "react-router-dom";
import useContexts from "../../hooks/useContexts";

const WaitForVerification = () => {
  const { userInfo } = useContexts();
  if (userInfo.status !== "Awaiting") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container">
      <h2>
        We have received your request, please wait while we verify your info.
      </h2>
    </div>
  );
};

export default WaitForVerification;
