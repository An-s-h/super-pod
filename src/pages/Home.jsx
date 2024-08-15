import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    // Determine screen size and apply overflow style accordingly
    if (window.innerWidth >= 768) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup overflow-hidden class on component unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className='bg-gradient-to-r from-green-300 to-green-500 px-6 lg:px-12 h-screen flex flex-col items-center justify-center text-white'>
      <motion.div 
        className='w-full flex flex-col lg:flex-row items-center justify-between gap-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className='lg:w-4/6 w-full text-center lg:text-left'>
          <motion.h1 
            className='lg:text-9xl md:text-6xl text-5xl font-extrabold tracking-tight leading-tight'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
          >
            Create & listen to 
            <br />
            <motion.span 
              className='flex items-end justify-center lg:justify-start lg:mt-0 mt-4 text-yellow-300'
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            >
              p<span className='inline-block'>
                <motion.img 
                  src="https://cdn-icons-png.flaticon.com/128/2113/2113324.png" 
                  alt="podcast icon" 
                  className='lg:h-24 mx-2 md:h-14 h-12'
                  animate={{ 
                    y: [0, -30, 0, 0, 0], 
                    rotate: [0, 15, -15, 15, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                  // Adjust bounce based on screen size
                  style={{
                    y: window.innerWidth < 768 ? [0, -30, 0, 0, 0] : [0, -50, 0, 0, 0],
                  }}
                />
              </span>dcast
            </motion.span>
          </motion.h1>
        </div>
        
        <div className='lg:block hidden w-[14%]'>
          <motion.div 
            className='py-4 border border-white font-semibold rounded-full text-center rotate-90'
            animate={{ rotate: [0, 0, -90, -90] }}
            transition={{ duration: 2, loop: Infinity, ease: 'easeInOut' }}
          >
            SUPER-POD
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className='mt-12 w-full flex flex-col lg:flex-row items-center justify-between'
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
      >
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <p className='text-2xl font-semibold'>
            Listen to the most popular podcasts on one platform - <b>SuperPodcast</b>
          </p>
          {!isLoggedIn && (
            <motion.button 
              className='px-6 py-4 bg-green-900 hover:bg-green-800 text-white font-semibold rounded-full lg:mt-8 mt-6 shadow-lg'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLoginRedirect} // Add onClick handler
            >
              Login to Listen
            </motion.button>
          )}
        </div>
        <div className='lg:mt-0 mt-8'>
          <p className='text-lg text-zinc-100 font-bold lg:text-right text-center pt-5'>
            Our app contains 100+ podcasts for you
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
