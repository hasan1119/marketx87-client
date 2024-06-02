import { createContext, useState } from "react";
import InitialLoadingSpinner from "../components/common/InitialLoadingSpinner";
import useAuth from "../hooks/useAuth";
import axiosClient from "../utils/axios";

export const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  // check user login status
  useAuth(userInfo, setUserInfo, setCheckingUser);

  const logout = async () => {
    setLoading(true);
    axiosClient
      .post("/logout")
      .then(({ status }) => {
        if (status === 200) {
          setUserInfo(null);
        }
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };

  // state provide with contexts
  const data = {
    userInfo,
    setUserInfo,
    logout,
    loading,
  };

  // show initial loading while user login status checking
  if (checkingUser) {
    return <InitialLoadingSpinner />;
  }
  // return context provider if user logged in
  return <ContextApi.Provider value={data}>{children}</ContextApi.Provider>;
};

export default ContextProvider;
