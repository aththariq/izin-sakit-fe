import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { motion, useInView } from "framer-motion";

const Feature = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
      }
    },
  };

  return (
    <div className="bg-rose-50" ref={ref}>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <motion.div 
          className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <motion.div 
              className="grid grid-cols-12 gap-4 sm:gap-6 items-center lg:translate-x-0"
              variants={containerVariants}
            >
              <motion.div className="col-span-4" variants={imageVariants}>
                <img
                  className="rounded-xl w-full h-full object-cover"
                  src="https://images.pexels.com/photos/7580244/pexels-photo-7580244.jpeg"
                  alt="Feature Image 1"
                />
              </motion.div>
              <motion.div className="col-span-4" variants={imageVariants}>
                <img
                  className="rounded-xl w-full h-[250px] object-cover"
                  src="https://images.pexels.com/photos/19471013/pexels-photo-19471013.jpeg"
                  alt="Feature Image 2"
                />
              </motion.div>
              <motion.div className="col-span-4" variants={imageVariants}>
                <img
                  className="rounded-xl w-full h-full object-cover"
                  src="https://images.pexels.com/photos/7659690/pexels-photo-7659690.jpeg"
                  alt="Feature Image 3"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5" variants={itemVariants}>
            <motion.div className="space-y-6 sm:space-y-8" variants={containerVariants}>
              <motion.div className="space-y-2 md:space-y-4" variants={itemVariants}>
                <h2 className="font-bold text-4xl lg:text-5xl text-primer">
                  Layanan Cepat untuk Kebutuhan Surat Sakit Anda
                </h2>
                <p className="text-gray-500">
                  Nikmati kemudahan proses pengajuan surat sakit dengan
                  teknologi AI. Praktis, cepat, dan terpercaya untuk kebutuhan
                  Anda kapan saja.
                </p>
              </motion.div>

              <motion.ul className="space-y-6 sm:space-y-4" variants={containerVariants}>
                {[
                  { Icon: HiOutlineCheckCircle, text: "Proses mudah – tanpa ribet" },
                  { Icon: HiOutlineClock, text: "Waktu pengajuan kurang dari 5 menit" },
                  { Icon: HiOutlineShieldCheck, text: "Hasil surat terjamin keakuratannya" },
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex gap-x-3 items-center" 
                    variants={itemVariants}
                  >
                    <item.Icon className="w-8 h-8 text-primer" />
                    <div className="grow">
                      <span className="text-sm sm:text-base text-gray-500">
                        <span className="font-bold text-primer">{item.text.split('–')[0]}</span>
                        {item.text.includes('–') ? '–' + item.text.split('–')[1] : ''}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feature;
