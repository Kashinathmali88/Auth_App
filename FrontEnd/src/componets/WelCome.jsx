import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function WelCome() {
  const { userData, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {}, [isLoggedIn, userData]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full mx-auto mt-10 text-center animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back,{" "}
          <span className="text-indigo-600">
            {userData ? userData.name : "Developer"}!
          </span>
          !
        </h1>
        <p className="text-gray-600 text-md mb-6">
          We're glad to see you again. Access your dashboard, manage your
          profile, or explore new features added just for you.
        </p>
        {isLoggedIn ? (
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition duration-200">
            Go to Dashboard
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition duration-200">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default WelCome;
