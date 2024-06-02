import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useContexts from "../../hooks/useContexts";
import axiosClient from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

export default function OTPForm({ user, setUser }) {
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContexts();

  const { OTP } = user;
  //errors
  const [error, setError] = useState({
    OTP: "",
  });

  const [isEnabled, setEnabled] = useState(false);

  useEffect(() => {
    if (OTP.length === 4) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [OTP]);

  // handle input change
  const handleChange = (e) => {
    const newUser = { ...user };
    if (e.target.value.length <= 4) {
      newUser[e.target.name] = e.target.value;
      error[e.target.name] = "";
    }
    setUser(newUser);
  };
  // registerHandler
  function registerHandler(e) {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .post("/verify-email", user)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch(({ response }) => {
        const { data } = response;
        setError(data);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Form onSubmit={registerHandler} className="my-3">
      <Form.Group className="my-4">
        <Form.Label>Email Verify Code</Form.Label>
        <Form.Control
          onChange={handleChange}
          type="number"
          value={OTP}
          name="OTP"
          placeholder="Enter 4 digit OTP"
        />
        {error.OTP && (
          <Form.Text className="text-danger">{error.OTP}</Form.Text>
        )}
      </Form.Group>

      <Button
        variant="primary"
        disabled={!isEnabled}
        className="w-100"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "Verify & Login"}
      </Button>
    </Form>
  );
}
