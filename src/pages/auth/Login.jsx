/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginFrom from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="auth_container d-flex align-items-center justify-content-center">
      <section id="login">
        <Container className="inner_login">
          <div className="login_container my-4">
            <h1 className="title">Login</h1>

            <LoginFrom />
            <p className="sub_title my-2">
              Don&apos;t have an account?
              <Link to="/register"> Create Account</Link>
            </p>
          </div>

          <div className="login_right">
            <h2>Welcome Back</h2>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Login;
