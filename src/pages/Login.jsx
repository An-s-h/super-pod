import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authActions } from "../store/auth";
import ErrorPage from "./ErrorPage";

const SignUp = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    try {
      const res = await axios.post(
        "https://super-pod-backend.vercel.app/api/v1/sign-in",
        values,
        { withCredentials: true }
      );
      toast.success("Account Logged In successfully");
      dispatch(authActions.login());
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <section className="h-screen bg-gradient-to-r from-green-300 to-green-500 flex items-center justify-center">
          <ToastContainer />
          <div className="flex items-center justify-center w-full max-w-lg">
            <div className="block rounded-lg bg-white opacity-90 shadow-lg dark:bg-gray-transparent p-8">
              <div className="flex flex-col items-center">
                {/* Logo */}
                <div className="text-center mb-6">
                  <img
                    className="mx-auto"
                    src="https://cdn-icons-png.flaticon.com/128/3742/3742679.png"
                    alt="logo"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">
                    Login to Podcaster
                  </h4>
                </div>

                <form>
                  {/* Sign-Up form fields */}
                  <p className="mb-4 text-center text-gray-800">
                    Welcome Back!
                  </p>

                  {/* Email input */}
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded"
                    value={values.email} // Corrected value prop
                    onChange={change}
                    required
                  />

                  {/* Password input */}
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded"
                    value={values.password} // Corrected value prop
                    onChange={change}
                    required
                  />

                  {/* Submit button */}
                  <div className="mb-6 text-center">
                    <button
                      className="w-full rounded bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:outline-none"
                      type="button" // Changed to type="button"
                      onClick={handleSubmit}
                    >
                      Log In
                    </button>
                  </div>

                  {/* Login link */}
                  <div className="flex items-center justify-center">
                    <p className="mb-0 mr-2 text-gray-800">
                      Don't have an account?
                    </p>
                    <Link
                      to="/signup"
                      className="inline-block rounded border-2 border-red-500 px-6 py-2 text-xs font-medium uppercase leading-normal text-red-500 transition duration-150 ease-in-out hover:border-red-600 hover:bg-neutral-100 hover:text-red-600 focus:border-red-600 focus:text-red-600"
                    >
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUp;
