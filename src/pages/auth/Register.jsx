import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import OTPForm from "../../components/auth/OTPForm";
import RegisterFrom from "../../components/auth/RegisterForm";
const Register = () => {
  const [step, setStep] = useState("EMAIL");
  // User state
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    OTP: "",
  });

  return (
    <div className="auth_container d-flex align-items-center justify-content-center">
      <section id="register">
        <Container className="inner_register">
          <div className="register_container my-4 w-lg-100">
            <h1 className="title text-right pb-3">
              {step === "EMAIL" ? "Create your account" : "OTP verification"}
            </h1>
            {step === "EMAIL" && (
              <>
                <RegisterFrom setStep={setStep} user={user} setUser={setUser} />

                <p className="sub_title my-2">
                  Already have an account?
                  <Link to="/login"> Log In</Link>
                </p>
              </>
            )}
            {step === "OTP" && <OTPForm user={user} setUser={setUser} />}
          </div>
          <div className="register_right">
            <h2>Jobs are waiting for you here...</h2>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Register;
