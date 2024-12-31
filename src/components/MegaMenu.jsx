import React, { useState, useEffect, useRef } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaFileMedical, FaUserMd, FaHistory } from "react-icons/fa"; // Ikon untuk Mega Menu

const MegaMenu = () => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300); // Menambah delay 300ms sebelum menu menghilang
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tombol Layanan */}
      <button className="flex items-center font-semibold text-gray-800 hover:text-primer p-2 rounded-lg focus:outline-none transition-colors duration-200">
        Layanan
        {isHovered ? (
          <HiChevronUp className="ml-1 transform rotate-180 transition-transform duration-200" />
        ) : (
          <HiChevronDown className="ml-1 transition-transform duration-200" />
        )}
      </button>

      {/* Mega Menu Content */}
      <div
        className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 ${
          isHovered ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out`} // Transisi lebih lambat
        onMouseEnter={handleMouseEnter} // Tetap terbuka saat kursor di atas Mega Menu
        onMouseLeave={handleMouseLeave} // Tutup saat kursor meninggalkan Mega Menu
      >
        <div className="py-2">
          {/* Item 1 */}
          <a
            href="#"
            className="group flex items-center px-4 py-2 text-sm transition-colors duration-200 hover:bg-primer"
          >
            <FaFileMedical className="mr-3 text-lg text-gray-800 group-hover:text-white" />
            <div>
              <span className="block font-semibold text-gray-800 group-hover:text-white">
                Surat Sakit Digital
              </span>
              <span className="block text-xs text-gray-500 group-hover:text-white">
                Buat surat sakit digital dengan mudah dan cepat.
              </span>
            </div>
          </a>

          {/* Item 2 */}
          <a
            href="#"
            className="group flex items-center px-4 py-2 text-sm transition-colors duration-200 hover:bg-primer"
          >
            <FaUserMd className="mr-3 text-lg text-gray-800 group-hover:text-white" />
            <div>
              <span className="block font-semibold text-gray-800 group-hover:text-white">
                Konsultasi Dokter
              </span>
              <span className="block text-xs text-gray-500 group-hover:text-white">
                Konsultasi dengan dokter secara online.
              </span>
            </div>
          </a>

          {/* Item 3 */}
          <a
            href="#"
            className="group flex items-center px-4 py-2 text-sm transition-colors duration-200 hover:bg-primer"
          >
            <FaHistory className="mr-3 text-lg text-gray-800 group-hover:text-white" />
            <div>
              <span className="block font-semibold text-gray-800 group-hover:text-white">
                Riwayat Surat
              </span>
              <span className="block text-xs text-gray-500 group-hover:text-white">
                Lihat dan kelola riwayat surat sakit Anda.
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;