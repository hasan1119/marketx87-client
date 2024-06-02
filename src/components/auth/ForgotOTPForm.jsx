import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axiosClient from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ForgotOTPFrom({ user, setUser, setStep }) {
  // loading state
  const [loading, setLoading] = useState(false);

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

  function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .post("/verify-otp", user)
      .then(({ data }) => {
        if (data._id) {
          setStep("PASSWORD");
        }
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
    <Form onSubmit={submitHandler} className="my-3">
      <Form.Group className="my-4">
        <Form.Label>OTP</Form.Label>
        <Form.Control
          type="text"
          value={user.OTP}
          onChange={(e) => {
            if (e.target.value.length <= 4) {
              setError({ ...error, OTP: "" });
              setUser({ ...user, OTP: e.target.value });
            }
          }}
          placeholder="Enter 4 digit OTP"
        />
        {error.OTP && (
          <Form.Text className="text-danger">{error.OTP}</Form.Text>
        )}
      </Form.Group>

      <Button
        disabled={!isEnabled}
        variant="primary"
        className="w-100"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "Verify"}
      </Button>
    </Form>
  );
}
