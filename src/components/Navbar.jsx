import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineEnvelope } from "react-icons/hi2";
import MegaMenu from "./MegaMenu"; // Import komponen MegaMenu

const Navbar = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/">
              <img src="/logo.png" alt="Logo Izin Sakit" className="w-32" />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <MegaMenu /> {/* Gunakan komponen MegaMenu di sini */}
                </li>
                <li>
                  <Link
                    to="/About"
                    className="text-gray-900 hover:text-primer font-semibold"
                  >
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                to="/Login"
                className="rounded-md bg-primer px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-sekunder"
              >
                <div className="flex items-center gap-2">
                  <span>Buat Surat</span>
                  <HiOutlineEnvelope className="text-white size-5 stroke-[2]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
