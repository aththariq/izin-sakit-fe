import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Logo dan Deskripsi */}
          <div className="lg:col-span-4">
            <div className="flex justify-center sm:justify-start">
              <img src="/logo.png" alt="Izin Sakit Logo" className="h-12" />
            </div>
            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              Solusi cepat dan terpercaya untuk mendapatkan surat sakit digital
              yang valid dan resmi.
            </p>
            <div className="mt-8 flex justify-center gap-6 sm:justify-start">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-primer transition hover:text-primer/75"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-primer transition hover:text-primer/75"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-primer transition hover:text-primer/75"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-primer transition hover:text-primer/75"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Spacing di tengah */}
          <div className="hidden lg:col-span-2 lg:block"></div>

          {/* Section Informasi */}
          <div className="text-center sm:text-left lg:col-span-2">
            <p className="text-lg font-medium text-primer">Informasi</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <span className="text-gray-700">Tentang Kami</span>
              </li>
              <li>
                <span className="text-gray-700">Kebijakan Privasi</span>
              </li>
              <li>
                <span className="text-gray-700">Syarat dan Ketentuan</span>
              </li>
              <li>
                <span className="text-gray-700">Panduan Pengguna</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left lg:col-span-2">
            <p className="text-lg font-medium text-primer">Services</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <span className="text-gray-700">Pengajuan Surat Sakit</span>
              </li>
              <li>
                <span className="text-gray-700">Verifikasi Digital</span>
              </li>
              <li>
                <span className="text-gray-700">Integrasi Ke HR System</span>
              </li>
              <li>
                <span className="text-gray-700">Konsultasi Kesehatan</span>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="text-center sm:text-left lg:col-span-2">
            <p className="text-lg font-medium text-primer">Kontak</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <span className="text-gray-700">Email: info@izinsakit.com</span>
              </li>
              <li>
                <span className="text-gray-700">Telepon: +62 123-456-7890</span>
              </li>
              <li>
                <address className="not-italic text-gray-700">
                  Alamat: Jl. Sehat Digital No. 123, Jakarta, Indonesia
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bawah */}
        <div className="mt-12 border-t border-gray-100 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Izin Sakit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
