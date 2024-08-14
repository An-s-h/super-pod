import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PodcastCard from '../components/PodcastCard/PodcastCard';
import ScrollToTopButton from '../components/ScrollToTop/ScrollToTopButton';
import Pagination from '../components/Pagination/Pagination';
import { motion } from 'framer-motion'; // For the loading animation

const AllPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [loading, setLoading] = useState(false); // Initial loading state set to false

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await axios.get(`https://super-pod-backend.vercel.app/api/v1/get-podcast?page=${currentPage}&limit=${itemsPerPage}`);
        setPodcasts(res.data.data);
        setTotal(res.data.total); // Set the total number of podcasts
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchPodcasts();
  }, [currentPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen p-4">
      <ScrollToTopButton />
      <div className="flex flex-col gap-4">
        {/* Pagination and Category Selection */}
        <div className="flex justify-center items-center mb-6">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={total}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>

        {/* Podcasts Display */}
        <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            // Loading Indicator
            <div className="flex items-center justify-center w-full h-full py-8 col-span-full">
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
          ) : podcasts.length > 0 ? (
            podcasts.map((items, i) => (
              <div key={i}>
                <PodcastCard items={items} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No podcasts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPodcasts;
