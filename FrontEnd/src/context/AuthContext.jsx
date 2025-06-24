import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    await axios
      .get("http://localhost:3000/me", { withCredentials: true })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setUserData(null);
      });
  };

  const checkAuth = async () => {
    await axios
      .get("http://localhost:3000/isAuth", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkAuth();
    getUserData();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    navigate,
    userData,
    setUserData,
    getUserData,
  };
  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};
