import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function SingUp() {
  const { register, handleSubmit, reset } = useForm();
  const { navigate } = useContext(AuthContext);
  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:3000/signup", data, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        reset();
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:indigo-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <div className="w-full mt-4 text-center text-lg">
          <Link to="/login">
            <p>
              Already have an account?
              <span className="text-indigo-700">Login</span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SingUp;
