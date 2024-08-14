import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const DescriptionPage = () => {
  const { id } = useParams();
  const [Podcasts, setPodcasts] = useState();
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://super-pod-backend.vercel.app/api/v1/get-podcast/${id}`,
          { withCredentials: true }
        );
        setPodcasts(res.data.data);
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching the podcast data", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };
    fetch();
  }, [id]);

  return (
    <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row gap-12 bg-white rounded-xl shadow-lg">
        {loading ? (
          // Loading Animation using Framer Motion
          <motion.div
            className="flex items-center justify-center w-full h-[50vh] text-2xl font-bold text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
          >
            Loading...
          </motion.div>
        ) : (
          Podcasts && (
            <>
              <div className="w-full md:w-2/5">
                <motion.div
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={`${Podcasts.frontImage}`}
                    alt={`${Podcasts.title} Cover`}
                    className="w-full h-[50vh] object-cover"
                  />
                </motion.div>
              </div>
              <motion.div
                className="w-full md:w-3/5"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-extrabold text-gray-800">
                  {Podcasts.title}
                </h1>
                <div className="mt-4 text-lg text-gray-700 leading-relaxed">
                  {Podcasts.description}
                </div>
                <div className="mt-6 inline-block bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-6 py-2">
                  {Podcasts.category.categoryName}
                </div>
              </motion.div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default DescriptionPage;
