import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useContexts from "../../hooks/useContexts";
import axiosClient from "../../utils/axios";

const ActivationNotice = () => {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContexts();
  const [transition, setTransition] = useState({
    account: "",
    amount: "",
    trans: "",
  });
  function accountActivation(e) {
    e.preventDefault();
    axiosClient
      .post("/account-activation", transition)
      .then(({ data }) => {
        setUserInfo(data);
        navigate("/dashboard");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (userInfo.status !== "Pending") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container my-2">
      <h1>Congrats! You have successfully register</h1>
      <h3>Be a member of marketx87</h3>
      <p>Please pay the membership fee to join us</p>
      <p>
        You can send us 100 taka to the following bKash/Nagad/rocket account
        01978177837, and submit the Phone number and Transition Id, We will
        check your payment and let you know via your registered email
      </p>
      <form
        onSubmit={accountActivation}
        className="d-flex flex-column row-gap-1"
      >
        <div className="d-flex flex-column">
          <label htmlFor="account">
            <b>Account No.</b>
          </label>
          <input
            type="number"
            placeholder="Enter account no."
            name="account"
            required
            value={transition.account}
            onChange={(e) =>
              setTransition({ ...transition, account: e.target.value })
            }
            className="p-1"
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="amount">
            <b>Amount</b>
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            name="amount"
            required
            value={transition.amount}
            onChange={(e) =>
              setTransition({ ...transition, amount: e.target.value })
            }
            className="p-1"
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="trans">
            <b>Transition ID</b>
          </label>
          <input
            type="text"
            placeholder="Enter transition Id"
            name="trans"
            required
            className="p-1"
            value={transition.trans}
            onChange={(e) =>
              setTransition({ ...transition, trans: e.target.value })
            }
          />
        </div>
        <div className="d-flex flex-column">
          <input
            type="submit"
            className="bg-success border-0 text-white py-1"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ActivationNotice;
