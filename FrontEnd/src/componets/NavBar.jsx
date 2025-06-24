import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaReact } from "react-icons/fa";

function NavBar() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    navigate,
    backendUrl,
  } = useContext(AuthContext);

  const logOut = async () => {
    await axios
      .get(`${backendUrl}/logOut`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setIsLoggedIn(false);
        setUserData("");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-indigo-50 shadow-md">
      <span className="text-gray-700 font-medium">
        <Link to={"/"}>{userData ? userData.name : "Gust"}</Link>
      </span>
      <FaReact className="text-indigo-600 w-10 h-10" />
      {isLoggedIn ? (
        <button
          onClick={logOut}
          className="bg-indigo-600  text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          LogOut
        </button>
      ) : (
        <Link to="/login">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            Login
          </button>
        </Link>
      )}
    </header>
  );
}

export default NavBar;
