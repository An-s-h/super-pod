import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 mx-auto bg-transparent h-17 font-inter z-50 text-black">
      <div className="flex justify-between items-center h-full w-full py-4 px-4 md:px-10 backdrop-blur-md">
        {/* Logo Section */}
        <div className="flex items-center justify-start space-x-3">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/9043/9043096.png"
              alt="Logo"
              className="w-12 h-12 md:w-14 md:h-14 object-cover"
            />
            <span className="pl-1 text-3xl font-extrabold tracking-wide">SUPER-POD</span>
          </Link>
        </div>

        {/* Links Section (Desktop) */}
        <div className="hidden md:flex justify-center items-center space-x-8">
          <Link
            to="/"
            className="text-black hover:text-gray-500 transition duration-200 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-black hover:text-gray-500 transition duration-200 ease-in-out"
          >
            Categories
          </Link>
          <Link
            to="/all-podcasts"
            className="text-black hover:text-gray-500 transition duration-200 ease-in-out"
          >
            All Podcasts
          </Link>
        </div>

        {/* Authentication Section (Desktop) */}
        <div className="hidden md:flex justify-center items-center space-x-4">
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="px-6 py-2 bg-white text-black border border-black rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                Sign Up
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link
              to="/profile"
              className="px-6 py-2 bg-white text-black border border-black rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              My Profile
            </Link>
          )}
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-lg z-40 flex flex-col justify-center items-center space-y-8 p-6">
          {/* Close Icon */}
          <div className="absolute top-6 right-6">
            <FiX className="text-3xl text-white cursor-pointer" onClick={toggleMenu} />
          </div>
          {/* Menu Links */}
          <Link
            to="/"
            className="text-white text-2xl hover:text-gray-300 transition duration-200 ease-in-out font-semibold"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-white text-2xl hover:text-gray-300 transition duration-200 ease-in-out font-semibold"
            onClick={toggleMenu}
          >
            Categories
          </Link>
          <Link
            to="/all-podcasts"
            className="text-white text-2xl hover:text-gray-300 transition duration-200 ease-in-out font-semibold"
            onClick={toggleMenu}
          >
            All Podcasts
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-black text-xl rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 text-white text-xl bg-black rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </>
          )}

          {isLoggedIn && (
            <Link
              to="/profile"
              className="px-6 py-3 bg-gray-600 text-white text-xl rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
              onClick={toggleMenu}
            >
              My Profile
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
