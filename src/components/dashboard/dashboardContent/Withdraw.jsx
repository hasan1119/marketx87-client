import { useState } from 'react';

import bkashLogo from "./../../../assets/images/bKash_logo.png";
import nagadLogo from "./../../../assets/images/Nagad_logo.png";
import rocketLogo from "./../../../assets/images/Rocket_logo.png";
import bkashLogoBW from "./../../../assets/images/bKash_logo-bw.png"; // Black and white version
import nagadLogoBW from "./../../../assets/images/Nagad_logo-bw.png"; // Black and white version
import rocketLogoBW from "./../../../assets/images/Rocket_logo-bw.png"; // Black and white version
import WithdrawImage from "./../../../assets/images//Withdraw.png"; // Black and white version
const Withdraw = () => {
    const [formData, setFormData] = useState({
        withdrawAmount: '',
        accountNumber: '',
        paymentMethod: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.withdrawAmount) {
            newErrors.withdrawAmount = 'Withdraw amount is required';
        }
        if (!formData.accountNumber) {
            newErrors.accountNumber = 'Account number is required';
        }
        if (!formData.paymentMethod) {
            newErrors.paymentMethod = 'Payment method is required';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            console.log('Form Data:', formData);
            // Add your form submission logic here
        } else {
            setErrors(newErrors);
        }
    };

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
                            Current Balance: 5000 TK
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="row g-3 mt-3">
                        <div className="col-md-6">
                            <label htmlFor="withdrawAmount" className="col-sm-12 col-form-label">
                                Withdraw amount
                            </label>
                            <div className="col-sm-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="withdrawAmount"
                                    placeholder="Withdraw amount"
                                    name="withdrawAmount"
                                    onChange={handleChange}
                                    value={formData.withdrawAmount}
                                />
                                {errors.withdrawAmount && <div className="error">{errors.withdrawAmount}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="accountNumber" className="col-sm-12 col-form-label">
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
                                {errors.accountNumber && <div className="error">{errors.accountNumber}</div>}
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
                                    value="bkash"
                                    id="bkash"
                                    className="custom-radio-input"
                                    onChange={handleChange}
                                />
                                <label htmlFor="bkash" className="custom-radio-label bkash"></label>
                            </div>

                            <div className="custom-radio">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="nagad"
                                    id="nagad"
                                    className="custom-radio-input"
                                    onChange={handleChange}
                                />
                                <label htmlFor="nagad" className="custom-radio-label nagad"></label>
                            </div>

                            <div className="custom-radio">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="rocket"
                                    id="rocket"
                                    className="custom-radio-input"
                                    onChange={handleChange}
                                />
                                <label htmlFor="rocket" className="custom-radio-label rocket"></label>
                            </div>
                            {errors.paymentMethod && <div className="error">{errors.paymentMethod}</div>}
                        </div>
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>

                <div className="col-6 d-sm-none d-md-block">
                    <img src={WithdrawImage} className='img-fluid' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Withdraw;