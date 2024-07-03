import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axiosClient from "../../../utils/axios";
import WithdrawImage from "./../../../assets/images//Withdraw.png"; // Black and white version
import bkashLogoBW from "./../../../assets/images/bKash_logo-bw.png"; // Black and white version
import bkashLogo from "./../../../assets/images/bKash_logo.png";
import nagadLogoBW from "./../../../assets/images/Nagad_logo-bw.png"; // Black and white version
import nagadLogo from "./../../../assets/images/Nagad_logo.png";
import rocketLogoBW from "./../../../assets/images/Rocket_logo-bw.png"; // Black and white version
import rocketLogo from "./../../../assets/images/Rocket_logo.png";
const Withdraw = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    withdrawAmount: "",
    accountNumber: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState({});

  const [overview, setOverview] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/getOverview")
      .then(({ data }) => {
        setOverview(data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);
  const { availableBalance } = overview;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.withdrawAmount) {
      newErrors.withdrawAmount = "Withdraw amount is required";
    }
    if (!formData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data:", formData);
      axiosClient
        .post("/makeWithdraw", formData)
        .then(() => {
          navigate("/dashboard/withdraws/withdraws-list");
        })
        .catch(console.log);
    } else {
      setErrors(newErrors);
    }
  };

  if (loading) {
    return (
      <div className="m-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-2 mt-2 p-5 w-100 rounded">
      <style>{`
                .custom-radio {
                    display: inline-block;
                    margin-right: 20px;
                }

                .custom-radio-input {
                    display: none;
                }

                .custom-radio-label {
                    display: inline-block;
                    width: 100px; /* Adjust size as needed */
                    height: 100px; /* Adjust size as needed */
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    cursor: pointer;
                }

                .custom-radio-input:checked + .custom-radio-label.bkash {
                    background-image: url(${bkashLogo});
                }

                .custom-radio-label.bkash {
                    background-image: url(${bkashLogoBW});
                }

                .custom-radio-input:checked + .custom-radio-label.nagad {
                    background-image: url(${nagadLogo});
                }

                .custom-radio-label.nagad {
                    background-image: url(${nagadLogoBW});
                }

                .custom-radio-input:checked + .custom-radio-label.rocket {
                    background-image: url(${rocketLogo});
                }

                .custom-radio-label.rocket {
                    background-image: url(${rocketLogoBW});
                }

                .error {
                    color: red;
                    font-size: 0.875em;
                }
            `}</style>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="row gap-2">
            <h1 className="">Withdraw</h1>
            <h2 className="col-12 col-md-12 p-5 shadow text-center bg-success rounded-4 availableBalanceBG">
              Current Balance: {availableBalance}TK
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="row g-3 mt-3">
            <div className="col-md-6">
              <label
                htmlFor="withdrawAmount"
                className="col-sm-12 col-form-label"
              >
                Withdraw amount
              </label>
              <div className="col-sm-12">
                <div className="d-flex gap-2">
                  {availableBalance >= 200 && (
                    <label htmlFor="200">
                      <input
                        type="radio"
                        checked={formData.withdrawAmount === "200"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            withdrawAmount: e.target.value,
                          })
                        }
                        name="amount"
                        value="200"
                        id="200"
                      />{" "}
                      200
                    </label>
                  )}
                  {availableBalance >= 400 && (
                    <label htmlFor="400">
                      <input
                        type="radio"
                        checked={formData.withdrawAmount === "400"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            withdrawAmount: e.target.value,
                          })
                        }
                        name="amount"
                        value="400"
                        id="400"
                      />{" "}
                      400
                    </label>
                  )}
                  {availableBalance >= 700 && (
                    <label htmlFor="700">
                      <input
                        type="radio"
                        checked={formData.withdrawAmount === "700"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            withdrawAmount: e.target.value,
                          })
                        }
                        name="amount"
                        value="700"
                        id="700"
                      />{" "}
                      700
                    </label>
                  )}
                  {availableBalance >= 1000 && (
                    <label htmlFor="1000">
                      <input
                        type="radio"
                        checked={formData.withdrawAmount === "1000"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            withdrawAmount: e.target.value,
                          })
                        }
                        name="amount"
                        value="1000"
                        id="1000"
                      />{" "}
                      1000
                    </label>
                  )}
                  {availableBalance >= 1200 && (
                    <label htmlFor="1200">
                      <input
                        type="radio"
                        checked={formData.withdrawAmount === "1200"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            withdrawAmount: e.target.value,
                          })
                        }
                        name="amount"
                        value="1200"
                        id="1200"
                      />{" "}
                      1200
                    </label>
                  )}
                  {availableBalance < 200 && (
                    <p className="text-danger">
                      You don&apos;t have enough balance
                    </p>
                  )}
                </div>
                {errors.withdrawAmount && (
                  <div className="error">{errors.withdrawAmount}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <label
                htmlFor="accountNumber"
                className="col-sm-12 col-form-label"
              >
                Account Number
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="accountNumber"
                  placeholder="Account Number"
                  name="accountNumber"
                  onChange={handleChange}
                  value={formData.accountNumber}
                />
                {errors.accountNumber && (
                  <div className="error">{errors.accountNumber}</div>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="" className="col-12">
                Payment Method
              </label>

              <div className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Bkash"
                  id="bkash"
                  className="custom-radio-input"
                  onChange={handleChange}
                />
                <label
                  htmlFor="bkash"
                  className="custom-radio-label bkash"
                ></label>
              </div>

              <div className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Nagad"
                  id="nagad"
                  className="custom-radio-input"
                  onChange={handleChange}
                />
                <label
                  htmlFor="nagad"
                  className="custom-radio-label nagad"
                ></label>
              </div>

              <div className="custom-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Rocket"
                  id="rocket"
                  className="custom-radio-input"
                  onChange={handleChange}
                />
                <label
                  htmlFor="rocket"
                  className="custom-radio-label rocket"
                ></label>
              </div>
              {errors.paymentMethod && (
                <div className="error">{errors.paymentMethod}</div>
              )}
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="col-6 d-sm-none d-md-block">
          <img src={WithdrawImage} className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
