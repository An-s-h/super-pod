import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className=" dark:bg-gradient-to-r from-green-300 to-green-500   flex items-center min-h-screen">
      <div className="container px-6 py-24 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-4xl">
            Oops! Page not found
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist. Here are some helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link
              to="/"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Go Back
            </Link>

            <Link
              to="/"
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-600 rounded-lg shrink-0 sm:w-auto hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            >
              Take Me Home
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="https://i.pinimg.com/originals/66/e6/ab/66e6abd3327a7e5ba5374fe8377bdae8.png"
            alt="Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
