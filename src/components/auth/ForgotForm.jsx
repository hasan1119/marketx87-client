import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axiosClient from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ForgotFrom({ user, setUser, setStep }) {
  // loading state
  const [loading, setLoading] = useState(false);

  const { email } = user;

  //errors
  const [error, setError] = useState({
    email: "",
    OTP: "",
  });

  const [isEnabled, setEnabled] = useState(false);

  function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  useEffect(() => {
    if (isValidEmail(email)) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
    setError({ ...error, email: "" });
  }, [email]);

  function resetPasswordHandler(e) {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .post("/reset-password", user)
      .then(({ data }) => {
        console.log(data);
        setStep("OTP");
      })
      .catch(({ response }) => {
        const { data } = response;
        setError(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form onSubmit={resetPasswordHandler} className="my-3">
      <Form.Group className="my-4">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email address"
        />
        {error.email && (
          <Form.Text className="text-danger">{error.email}</Form.Text>
        )}
      </Form.Group>

      <Button
        disabled={!isEnabled}
        variant="primary"
        className="w-100"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "RESET"}
      </Button>
    </Form>
  );
}
