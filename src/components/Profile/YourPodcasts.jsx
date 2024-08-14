import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PodcastCard from "../PodcastCard/PodcastCard";
import Pagination from "../Pagination/Pagination";
import { motion } from "framer-motion";

const YourPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of podcasts per page

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await axios.get(
          `https://super-pod-backend.vercel.app/api/v1/get-user-podcasts?page=${currentPage}&limit=${itemsPerPage}`,
          { withCredentials: true }
        );
        setPodcasts(res.data.data);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Error fetching user podcasts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPodcasts();
  }, [currentPage]); // Fetch data when currentPage changes

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Your Podcasts</h1>
          <Link
            to="/add-podcast"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
          >
            Add Podcast
          </Link>
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={total}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      
      {loading ? (
        // Loading Indicator
        <div className="flex items-center justify-center h-full py-8">
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          >
            <div className="w-12 h-12 border-4 border-t-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {podcasts.length > 0 ? (
            podcasts.map((items, i) => (
              <div key={i} className="flex justify-center">
                <PodcastCard items={items} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No podcasts available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default YourPodcasts;
