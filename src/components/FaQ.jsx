import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FaQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Tutup jika sudah aktif
    } else {
      setActiveIndex(index); // Buka jika belum aktif
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
      }}
    >
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="max-w-xs">
              <motion.h2
                className="text-2xl font-bold md:text-4xl md:leading-tight text-primer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={itemVariants}
                transition={{ duration: 0.6 }}
              >
                Pertanyaan yang
                <br />
                sering diajukan
              </motion.h2>
              <p className="mt-1 hidden md:block text-gray-500">
                Jawaban atas pertanyaan yang paling sering diajukan pengguna kami.
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="md:col-span-3">
            {/* Accordion */}
            <motion.div
              className="divide-y divide-gray-200"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  question: "Apakah surat sakit yang diterbitkan valid?",
                  answer:
                    "Ya, surat sakit yang diterbitkan oleh Izin Sakit ditandatangani oleh tenaga medis berlisensi dan valid untuk digunakan sebagai dokumen resmi untuk keperluan izin kerja, sekolah, atau lainnya.",
                },
                {
                  question: "Berapa lama proses pengajuan surat sakit?",
                  answer:
                    "Proses pengajuan surat sakit biasanya selesai dalam waktu kurang dari 10 menit. Namun, waktu ini dapat bervariasi tergantung pada kelengkapan informasi yang Anda berikan.",
                },
                {
                  question: "Bagaimana cara menggunakan surat sakit digital?",
                  answer:
                    "Setelah pengajuan berhasil, surat sakit akan dikirim ke email Anda. Anda dapat mencetaknya atau menunjukkan versi digitalnya kepada pihak yang membutuhkan.",
                },
                {
                  question: "Apakah data pribadi saya aman di Izin Sakit?",
                  answer:
                    "Keamanan data Anda adalah prioritas utama kami. Semua informasi yang Anda berikan dilindungi dengan enkripsi tingkat tinggi dan hanya digunakan untuk keperluan pembuatan surat sakit.",
                },
                {
                  question: "Apakah saya harus membayar untuk layanan ini?",
                  answer:
                    "Ya, layanan Izin Sakit memiliki biaya yang terjangkau untuk setiap surat yang diterbitkan. Detail biaya akan ditampilkan sebelum Anda melanjutkan pengajuan.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`py-3 w-full ${
                    activeIndex === index ? "shadow-primer" : ""
                  }`}
                  variants={itemVariants}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start transition focus:outline-none ${
                      activeIndex === index ? "text-primer" : "text-gray-800"
                    } hover:text-primer`}
                    aria-expanded={activeIndex === index}
                  >
                    {item.question}
                    <svg
                      className={`shrink-0 size-5 transition-transform duration-200 ${
                        activeIndex === index
                          ? "rotate-180 text-primer"
                          : "text-gray-600"
                      }`}
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 mt-2">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
            {/* End Accordion */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
    </motion.div>
  );
};

export default FaQ;
