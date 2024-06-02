import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

export default function RegisterFrom({ user, setUser, setStep }) {
  const [loading, setLoading] = useState(false);

  const { firstName, lastName, email, password, confirmPassword, terms } = user;
  //errors
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isEnabled, setEnabled] = useState(false);

  useEffect(() => {
    if (firstName && email && password && confirmPassword && terms) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [firstName, email, password, confirmPassword, terms]);

  // handle input change
  const handleChange = (e) => {
    const newUser = { ...user };
    if (e.target.name === "terms") {
      newUser[e.target.name] = e.target.checked;
    } else {
      error[e.target.name] = "";
      newUser[e.target.name] = e.target.value;
    }
    setUser(newUser);
  };
  // registerHandler
  function registerHandler(e) {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .post("/register", user)
      .then(({ data }) => {
        if (data._id) {
          setStep("OTP");
        }
      })
      .catch(({ response }) => {
        const { data } = response;
        setError(data);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Form onSubmit={registerHandler} className="my-3">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-0">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={firstName}
              name="firstName"
              type="text"
              placeholder="Enter first name"
            />
            {error.firstName && (
              <Form.Text className="text-danger">{error.firstName}</Form.Text>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-0">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={lastName}
              name="lastName"
              type="text"
              placeholder="Enter last name"
            />
            {error.lastName && (
              <Form.Text className="text-danger">{error.lastName}</Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="my-4">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="text"
          value={email}
          name="email"
          placeholder="Enter email address"
        />
        {error.email && (
          <Form.Text className="text-danger">{error.email}</Form.Text>
        )}
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={password}
              name="password"
              type="text"
              placeholder="Enter password"
            />
            {error.password && (
              <Form.Text className="text-danger">{error.password}</Form.Text>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="confirmPassword"
              value={confirmPassword}
              type="text"
              placeholder="Confirm password"
            />
            {error.confirmPassword && (
              <Form.Text className="text-danger">
                {error.confirmPassword}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          name="terms"
          checked={terms}
          onChange={handleChange}
          label={
            <p>
              I&apos;ve read and agree with{" "}
              <Link to="/terms">Terms of Service</Link>
            </p>
          }
        />
      </Form.Group>
      <Button
        variant="primary"
        disabled={!isEnabled}
        className="w-100"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "Register"}
      </Button>
    </Form>
  );
}
