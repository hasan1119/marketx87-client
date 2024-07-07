import { Navigate } from "react-router-dom";
import useContexts from "../../hooks/useContexts";

const WaitForVerification = () => {
  const { userInfo } = useContexts();
  if (userInfo.status !== "Reviewing") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div
      style={{ maxWidth: "800px" }}
      className="mx-auto mt-5 row waitForActivation"
    >
      {" "}
      <div className="vector-container">
        <img
          src="/images/activation_vector.svg"
          alt="Verification Image"
          className="vector-image"
        />
      </div>
      <div className="message-container">
        <h1 className="">We have received your request</h1>
        <p>Please wait while we verify your info.</p>
      </div>{" "}
    </div>
  );
};

export default WaitForVerification;
