import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const NowPlayingPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const img = useSelector((state) => state.player.img);
  const tittle = useSelector((state) => state.player.tittle);

  useEffect(() => {
    if (tittle) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Show popup for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [tittle]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-24 right-5 p-3 bg-white text-black rounded-lg shadow-lg flex items-center gap-3 md:gap-4"
          style={{
            maxWidth: "80%",
            width: "auto",
            zIndex: 50,
          }}
        >
          <img
            src={img}
            alt="Track Art"
            className="w-10 h-10 rounded-full object-cover md:w-12 md:h-12"
          />
          <div>
            <div className="font-semibold text-sm md:text-base">{tittle}</div>
            <div className="text-xs md:text-sm opacity-75">Now Playing</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NowPlayingPopup;
