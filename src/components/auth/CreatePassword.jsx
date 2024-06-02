/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useContexts from "../../hooks/useContexts";
import axiosClient from "../../utils/axios";
import LoadingSpinner from "../common/LoadingSpinner";

export default function CreatePassword({ user, setUser }) {
  // loading state
  const [loading, setLoading] = useState(false);
  const timerRef = useRef();

  //errors
  const [error, setError] = useState({
    password: "",
  });

  const [isEnabled, setEnabled] = useState(false);
  const { password, confirmPassword } = user;
  const { setUserInfo } = useContexts();
  const navigator = useNavigate();

  useEffect(() => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (strongRegex.test(password) && password === confirmPassword) {
      setEnabled(true);
      setError({ ...error, password: "" });
    } else if (password || confirmPassword) {
      clearTimeout(timerRef.current);
      setError({
        ...error,
        password: "",
      });

      timerRef.current = setTimeout(() => {
        setError({
          ...error,
          password: "Password not strong enough or matched",
        });
      }, 800);
      setEnabled(false);
    }
  }, [password, confirmPassword]);

  function changeHandler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleChangePassword(e) {
    e.preventDefault();

    setLoading(true);
    axiosClient
      .post("/create-password-and-login", user)
      .then(({ data }) => {
        setUserInfo(data);
        navigator("/dashboard");
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
    <Form onSubmit={handleChangePassword} className="my-3">
      <Form.Group className="my-4">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          name="password"
          value={user.password}
          onChange={changeHandler}
          placeholder="Enter password"
        />

        <Form.Label className="mt-3">Confirm Password</Form.Label>
        <Form.Control
          type="text"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={changeHandler}
          placeholder="Enter confirm password"
        />

        {error.password && (
          <Form.Text className="text-danger">{error.password}</Form.Text>
        )}
      </Form.Group>

      <Button
        disabled={!isEnabled}
        variant="primary"
        className="w-100"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "RESET & LOGIN"}
      </Button>
    </Form>
  );
}
