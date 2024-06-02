import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatePassword from "../../components/auth/CreatePassword";
import ForgotFrom from "../../components/auth/ForgotForm";
import ForgotOTPFrom from "../../components/auth/ForgotOTPForm";

const Forgot = () => {
  // Steps
  const [step, setStep] = useState("EMAIL");

  // User
  const [user, setUser] = useState({
    email: "",
    OTP: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="auth_container d-flex align-items-center justify-content-center">
      <section id="forgot">
        <Container className="">
          <div className="forgot_container my-5">
            <h1 className="title mt-4">
              {step === "EMAIL" && "Forgot Password"}
              {step === "OTP" && "Verify OTP"}
              {step === "PASSWORD" && "Create Password"}
            </h1>

            {step === "EMAIL" && (
              <ForgotFrom setStep={setStep} user={user} setUser={setUser} />
            )}

            {step === "OTP" && (
              <ForgotOTPFrom setStep={setStep} user={user} setUser={setUser} />
            )}

            {step === "PASSWORD" && (
              <CreatePassword setStep={setStep} user={user} setUser={setUser} />
            )}

            {step === "EMAIL" && (
              <p className="sub_title my-2 mb-4">
                Don&apos;t have an account?
                <Link to="/register"> Create Account</Link>
              </p>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Forgot;
