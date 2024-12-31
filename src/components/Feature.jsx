import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from "react-icons/hi";

const Feature = () => {
  return (
    <div className="bg-rose-50">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
        {/* Grid */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-7">
            {/* Grid */}
            <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
              <div className="col-span-4">
                <img
                  className="rounded-xl"
                  src="https://images.pexels.com/photos/7580244/pexels-photo-7580244.jpeg"
                  alt="Feature Image"
                />
              </div>
              {/* End Col */}

              <div className="col-span-3">
                <img
                  className="rounded-xl"
                  src="https://images.pexels.com/photos/19471013/pexels-photo-19471013.jpeg"
                  alt="Feature Image"
                />
              </div>
              {/* End Col */}

              <div className="col-span-5">
                <img
                  className="rounded-xl object-cover"
                  src="https://images.pexels.com/photos/7659690/pexels-photo-7659690.jpeg"
                  alt="Feature Image"
                />
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Col */}

          <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
            <div className="space-y-6 sm:space-y-8">
              {/* Title */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-4xl lg:text-5xl text-primer ">
                  Layanan Cepat untuk Kebutuhan Surat Sakit Anda
                </h2>
                <p className="text-gray-500 ">
                  Nikmati kemudahan proses pengajuan surat sakit dengan
                  teknologi AI. Praktis, cepat, dan terpercaya untuk kebutuhan
                  Anda kapan saja.
                </p>
              </div>
              {/* End Title */}

              {/* List */}
              <ul className="space-y-6 sm:space-y-4">
                <li className="flex gap-x-3 items-center">
                  <HiOutlineCheckCircle className="w-8 h-8 text-primer" />
                  <div className="grow">
                    <span className="text-sm sm:text-base text-gray-500 ">
                      <span className="font-bold text-primer">
                        Proses mudah
                      </span>{" "}
                      – tanpa ribet
                    </span>
                  </div>
                </li>

                <li className="flex gap-x-3 items-center">
                  <HiOutlineClock className="w-8 h-8 text-primer" />
                  <div className="grow">
                    <span className="text-sm sm:text-base text-gray-500">
                      Waktu pengajuan{" "}
                      <span className="font-bold text-primer">
                        kurang dari 5 menit
                      </span>
                    </span>
                  </div>
                </li>

                <li className="flex gap-x-3 items-center">
                  <HiOutlineShieldCheck className="w-8 h-8 text-primer" />
                  <div className="grow">
                    <span className="text-sm sm:text-base text-gray-500">
                      Hasil surat{" "}
                      <span className="font-bold text-primer">
                        terjamin keakuratannya
                      </span>
                    </span>
                  </div>
                </li>
              </ul>
              {/* End List */}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default Feature;
