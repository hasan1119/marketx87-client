/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useContexts from "../../hooks/useContexts";
import axiosClient from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

export default function LoginFrom() {
  const { setUserInfo } = useContexts();

  // User
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // loading state
  const [loading, setLoading] = useState(false);
  const { email, password } = user;

  //errors
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    error[e.target.name] = "";
    setUser(newUser);
  };

  // handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosClient.post("/login", user);
      const { user: userData } = data;
      setUserInfo(userData);
      setLoading(false);
    } catch ({ response }) {
      const { data } = response;
      setError(data);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogin} className="my-3">
      <Form.Group className="my-4">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={handleChange}
          required
          name="email"
          placeholder="Enter email address"
        />
        {error.email && (
          <Form.Text className="text-danger">{error.email}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          value={password}
          name="password"
          required
          onChange={handleChange}
          placeholder="Enter password"
        />
        {error.password && (
          <Form.Text className="text-danger">{error.password}</Form.Text>
        )}
      </Form.Group>

      <div className="mb-2 text-end">
        <Link to="/forgot">Forgot password?</Link>
      </div>

      <Button
        disabled={!email || !password}
        variant="primary"
        className="w-100"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "Login"}
      </Button>
    </Form>
  );
}
