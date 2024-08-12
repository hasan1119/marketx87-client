/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaCheck, FaRegImages } from "react-icons/fa";
import { toast } from "react-toastify";
import useContexts from "../../../hooks/useContexts";
import axiosClient from "../../../utils/axios";
import LoadingSpinner from "../../common/LoadingSpinner";
import PasswordVector from "/src/assets/images/password.svg";

const Profile = () => {
  //   const { firstName, lastName, email, avatar } = user;
  const imgRef = useRef();
  const { userInfo, setUserInfo } = useContexts();
  const { _id, firstName, lastName, email, avatar, gender, phone } = userInfo;
  const timerRef = useRef();
  const [loading, setLoading] = useState(false);

  const [isChanged, setChanged] = useState(true);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    avatar: null,
  });

  useEffect(() => {
    setData({
      ...data,
      firstName,
      lastName,
      email,
      gender,
      phone,
    });
  }, [firstName, lastName, email, gender, phone]);
  console.log(data);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  //errors
  const [error, setError] = useState({
    password: "",
  });

  const [isEnabled, setEnabled] = useState(false);

  const { password, confirmPassword } = passwords;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPassword]);

  function passwordChanger(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  function passwordUpdateHandler(e) {
    e.preventDefault();
    setLoading(true);
    axiosClient
      .put(`/update-password`, { password })
      .then(({ data }) => {
        toast("Password updated successfully");
        setPasswords({ password: "", confirmPassword: "" });
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          return setUserInfo(null);
        }
        const { data } = response;
        setError({ ...error, ...data });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const changeHandler = (e) => {
    if (e.target.type === "file") {
      const files = e.target.files;
      console.log(files);
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = function (ev) {
          imgRef.current.src = ev.target.result;
        };
        reader.readAsDataURL(files[0]);
        setData({ ...data, avatar: files[0] });
      } else {
        console.log("opps!");
      }
      return;
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      data.firstName !== userInfo.firstName ||
      data.lastName !== userInfo.lastName ||
      data.lastName !== userInfo.lastName ||
      data.phone !== userInfo.phone ||
      data.gender !== userInfo.gender ||
      data.avatar !== null
    ) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [data, userInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("avatar", data.avatar);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("prevAvatar", userInfo.avatar);

    axiosClient
      .put("/update-info", formData)
      .then(({ data }) => {
        setUserInfo(data);
        const notify = () => toast("Successfully Updated!");
        notify();
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          setUserInfo(null);
        }
        // console.log(err);
      });
  }

  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile p-md-5  p-2 m-2 mt-md-4 mx-md-auto">
      <div className="d-flex justify-content-between py-3 mb-3">
        <h3>Profile</h3>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={toggleEdit}
        >
          <AiFillEdit />
          <span className="mx-2">Edit</span>
        </button>
      </div>

      {!isEditing ? (
        <div className="row">
          <div className="col-12">
            <div className="personal_detail">
              <div className="form_box row d-flex align-items-center">
                <div className="col-lg-6 ">
                  <img
                    src={
                      avatar
                        ? `https://api.marketx87.com/files/profile/${avatar}`
                        : `/images/profile-img.svg`
                    }
                    alt="Logo"
                    ref={imgRef}
                    className="img-fluid profile_avatar profile_avatar_one "
                  />
                </div>
                <div className="row col-lg-6">
                  <div className="col-12 mb-2">
                    <label htmlFor="" className="mb-2 ">
                      <strong>Name:</strong>
                    </label>
                    <span className="py-2 px-2">{userInfo.firstName}</span>
                    <span className="py-2 ">{userInfo.lastName}</span>
                  </div>

                  <div className="col-md-12 mb-2">
                    <label htmlFor="" className="form-label">
                      <strong>Gender:</strong>
                    </label>
                    <span className="py-2 px-2 ">
                      {userInfo.gender || "N/A"}
                    </span>
                  </div>

                  <div className="col-md-12 mb-2">
                    <label htmlFor="" className="form-label">
                      <strong>Phone Number:</strong>
                    </label>
                    <span className="py-2 px-2 ">
                      {userInfo.phone || "N/A"}
                    </span>
                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="" className="form-label">
                      <strong>Username:</strong>
                    </label>
                    <span className="py-2 px-2 ">
                      {userInfo.username || "N/A"}
                    </span>
                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="" className="form-label">
                      <strong>Email:</strong>
                    </label>
                    <a
                      className="py-2 px-2"
                      style={{ wordWrap: "break-word" }}
                      href={`mailto:${userInfo.email}`}
                    >
                      {userInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-xl-6">
            <div className="personal_detail">
              <div className="title">Personal Details</div>
              <div className="form_box">
                <img
                  // src={
                  //   avatar
                  //     ? `https://api.marketx87.com/files/thumb/profile/${avatar}`
                  //     : '/logo/profile-img.svg'
                  // }
                  src={
                    avatar
                      ? `https://api.marketx87.com/files/profile/${avatar}`
                      : `/images/profile-img.svg`
                  }
                  alt="Logo"
                  ref={imgRef}
                  className="img-fluid profile_avatar"
                />
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-12 text-center">
                    <div className="upload-btn-wrapper">
                      <div className="image_btn">
                        <label
                          htmlFor="avatar_file"
                          style={{ cursor: "pointer" }}
                        >
                          <button
                            type="button"
                            style={{ pointerEvents: "none" }}
                            className="btn btn-primary"
                          >
                            Upload Avatar <FaRegImages />
                            <input
                              id="avatar_file"
                              name="avatar"
                              onChange={changeHandler}
                              type="file"
                              hidden
                            />
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="fastName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control"
                      id="fastName"
                      name="firstName"
                      value={data.firstName}
                      onChange={changeHandler}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={data.lastName}
                      onChange={changeHandler}
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="" className="col-12 ">
                      Gender
                    </label>

                    <input
                      type="radio"
                      name="gender"
                      checked={data.gender === "Male"}
                      onChange={changeHandler}
                      value="Male"
                      id="male"
                      className="me-1"
                    />
                    <label htmlFor="male" className="form-label me-3">
                      Male
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      checked={data.gender === "Female"}
                      onChange={changeHandler}
                      id="female"
                      value="Female"
                      className="me-1"
                    />
                    <label htmlFor="female" className="form-label me-3">
                      Female
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      checked={data.gender === "Other"}
                      onChange={changeHandler}
                      value="Other"
                      id="other"
                      className="me-1"
                    />
                    <label htmlFor="other" className="form-label me-3">
                      Other
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      onChange={changeHandler}
                      value={data.phone}
                    />
                  </div>
                  <div className="col-md-12">
                    <div>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        disabled
                        style={{ cursor: "not-allowed" }}
                        placeholder="Enter your email address"
                        value={data.email}
                      />
                    </div>
                  </div>
                  <div className="col-12 text-end mt-4">
                    <button
                      disabled={isChanged}
                      type="submit"
                      className="btn btn-primary dashboard_btn"
                    >
                      Update Personal Info <FaCheck className="ms-3" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="password_change">
              <div className="title">Change Password</div>
              <div className="form_box">
                <img
                  style={{ width: "265px", margin: "", border: "0" }}
                  src={PasswordVector}
                  alt="Img"
                />
                <form onSubmit={passwordUpdateHandler} className="row g-3">
                  <div className="col-md-12">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-12 col-form-label"
                    >
                      New Password
                    </label>

                    <div className="col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPassword3"
                        placeholder="Set new password"
                        name="password"
                        onChange={passwordChanger}
                        value={passwords.password}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <label
                        htmlFor="inputPassword4"
                        className="col-sm-12 col-form-label"
                      >
                        Confirm Password
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="Re-Enter Password"
                          name="confirmPassword"
                          onChange={passwordChanger}
                          value={passwords.confirmPassword}
                        />
                      </div>
                      {error.password && (
                        <p className="text-danger">{error.password}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={!isEnabled}
                      className="btn btn-primary dashboard_btn d-block w-100"
                    >
                      Update Password{" "}
                      {loading ? (
                        <LoadingSpinner />
                      ) : (
                        <FaCheck className="ms-3" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
