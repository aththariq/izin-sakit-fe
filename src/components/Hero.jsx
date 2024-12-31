import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaGoogle, FaApple } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 my-10">
      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">
            Dapatkan Surat Sakit dalam{" "}
            <span className="text-primer">Sekejap</span>
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
            Layanan berbasis AI untuk surat keterangan medis yang cepat,
            terpercaya, dan praktis.
          </p>

          {/* Buttons */}
          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <Link
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primer text-white hover:bg-sekunder focus:outline-none focus:bg-primer disabled:opacity-50 disabled:pointer-events-none"
              to="/Login"
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
            </Link>
            <Link
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-black text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none  "
              to="#"
            >
              Info Selengkapnya
            </Link>
          </div>
          {/* End Buttons */}

          {/* Review */}
          <div className="mt-6 lg:mt-10 grid grid-cols-2 max-w-md">
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
          </div>
          {/* End Review */}
        </div>
        {/* End Col */}

        <div className="relative ms-4">
          <img
            className="w-full h-[600px] rounded-md object-cover drop-shadow-xl"
            src="https://images.pexels.com/photos/19471016/pexels-photo-19471016.jpeg"
            alt="Hero Image"
          />
          {/* End SVG*/}
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default Hero;
