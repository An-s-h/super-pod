import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PodcastCard from "../components/PodcastCard/PodcastCard";
import Pagination from "../components/Pagination/Pagination"; // Import the Pagination component
import axios from "axios";
import { motion } from "framer-motion"; // Import framer-motion for animations

const CategoriesPage = () => {
  const { cat } = useParams();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of podcasts per page

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://super-pod-backend.vercel.app/api/v1/category/${cat}`,
          { withCredentials: true }
        );
        setPodcasts(res.data.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [cat]);

  // Get the current podcasts
  const indexOfLastPodcast = currentPage * itemsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - itemsPerPage;
  const currentPodcasts = podcasts.slice(indexOfFirstPodcast, indexOfLastPodcast);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className="text-4xl lg:text-5xl font-extrabold text-center text-green-600 mb-8 capitalize">
        {cat} Podcasts
      </h1>
      <div className="flex justify-center mt-8">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={podcasts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <div className="min-h-screen px-4 py-6 lg:px-12">
        {loading ? (
          // Loading Indicator
          <div className="flex items-center justify-center h-full">
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
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentPodcasts.length > 0 ? (
                currentPodcasts.map((item, i) => (
                  <div key={i}>
                    <PodcastCard items={item} />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center h-64">
                  <h2 className="text-2xl lg:text-3xl font-bold text-green-600 mb-4">
                    No Podcasts Available
                  </h2>
                  <p className="text-lg lg:text-xl text-green-600">
                    Please check back later or explore other categories.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
