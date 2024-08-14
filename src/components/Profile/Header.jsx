import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../ScrollToTop/ScrollToTopButton";

const Header = () => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("https://super-pod-backend.vercel.app/api/v1/user-details", {
          withCredentials: true,
        });
        setUserData(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const LogOutHandler = async () => {
    try {
      const res = await axios.post("https://super-pod-backend.vercel.app/api/v1/logout", {
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log(res.data.message);
        dispatch(authActions.logout());
        navigate("/");
      } else {
        console.error("Failed to log out:", res.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <>
      <ScrollToTopButton />
      {userData && (
        <header className="bg-gradient-to-r from-green-700 to-teal-600 rounded-lg py-4 md:py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 px-4 md:px-6 lg:px-8 shadow-lg shadow-green-500/50">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-gray-200 text-xs md:text-sm uppercase tracking-wide">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
              {userData.username}
            </h1>
            <p className="text-gray-300 mt-1 text-sm md:text-base lg:text-lg">{`Email: ${userData.email}`}</p>
          </div>
          <button
            className="bg-white text-green-700 hover:bg-green-600 hover:text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={LogOutHandler}
          >
            Log Out
          </button>
        </header>
      )}
    </>
  );
};

export default Header;
