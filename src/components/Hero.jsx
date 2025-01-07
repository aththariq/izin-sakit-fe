import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaGoogle, FaApple } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3, // Controls the stagger delay between children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const button1Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const button2Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.3 },
    },
  };

  const reviewsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 }, // Adjusted delay for smoother appearance
    },
  };

  return (
    <motion.div
      className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 my-10"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <motion.div variants={itemVariants}>
          <motion.h1
            className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight"
            variants={titleVariants}
          >
            Dapatkan Surat Sakit dalam{" "}
            <span className="text-primer">Sekejap</span>
          </motion.h1>
          <motion.p
            className="mt-3 text-lg text-gray-800 dark:text-neutral-400"
            variants={textVariants}
          >
            Layanan berbasis AI untuk surat keterangan medis yang cepat,
            terpercaya, dan praktis.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-7 grid gap-3 w-full sm:inline-flex"
            variants={itemVariants}
          >
            <motion.Link
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primer text-white hover:bg-sekunder focus:outline-none focus:bg-primer disabled:opacity-50 disabled:pointer-events-none transform transition-all duration-300 hover:scale-105"
              to="/login"
              variants={button1Variants}
            >
              Ajukan Surat Sakit
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.Link>
            <motion.Link
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-black text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transform transition-all duration-300 hover:scale-105"
              to="#"
              variants={button2Variants}
            >
              Info Selengkapnya
            </motion.Link>
          </motion.div>
          {/* End Buttons */}

          {/* Review */}
          <motion.div
            className="mt-6 lg:mt-10 grid grid-cols-2 max-w-md"
            variants={reviewsVariants}
          >
            {/* Review 1 */}
            <div className="py-5">
              <div className="flex items-center gap-x-2">
                <FaGoogle className="text-2xl text-blue-600" />{" "}
                {/* Logo Google */}
                <div className="flex gap-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" /> // Bintang
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-800">
                <span className="font-bold">4.6</span> /5 - from 12k reviews
              </p>
            </div>

            {/* Review 2 */}
            <div className="py-5">
              <div className="flex items-center gap-x-2">
                <FaApple className="text-2xl text-gray-800" />{" "}
                {/* Logo Apple */}
                <div className="flex gap-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" /> // Bintang
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-800">
                <span className="font-bold">4.8</span> /5 - from 5k reviews
              </p>
            </div>
          </motion.div>
          {/* End Review */}
        </motion.div>
        {/* End Col */}

        <motion.div variants={itemVariants} className="relative ms-4">
          <img
            className="w-full h-[600px] rounded-md object-cover drop-shadow-xl"
            src="https://images.pexels.com/photos/19471016/pexels-photo-19471016.jpeg"
            alt="Hero Image"
          />
          {/* End SVG*/}
        </motion.div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </motion.div>
  );
};

export default Hero;
