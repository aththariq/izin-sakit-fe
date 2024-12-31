import React, { useState } from "react";

const FaQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Tutup jika sudah aktif
    } else {
      setActiveIndex(index); // Buka jika belum aktif
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="max-w-xs">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primer">
                Pertanyaan yang
                <br />
                sering diajukan
              </h2>
              <p className="mt-1 hidden md:block text-gray-500">
                Jawaban atas pertanyaan yang paling sering diajukan pengguna kami.
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="md:col-span-3">
            {/* Accordion */}
            <div className="divide-y divide-gray-200">
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
                <div
                  key={index}
                  className={`py-3 w-full ${
                    activeIndex === index ? "shadow-primer" : ""
                  }`}
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
                  <div
                    className={`overflow-hidden transition-[height] duration-300 ${
                      activeIndex === index ? "h-auto" : "h-0"
                    }`}
                  >
                    <p className="text-gray-600 mt-2">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* End Accordion */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default FaQ;
