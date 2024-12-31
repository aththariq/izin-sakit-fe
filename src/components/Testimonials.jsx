import React from "react";

const Testimonials = () => {
    // Data testimonial untuk platform "Izin Sakit"
    const testimonials = [
      {
        name: "Andi Wijaya",
        comment:
          "Sangat membantu! Saya bisa mendapatkan surat sakit digital dengan cepat tanpa harus antri di rumah sakit. Prosesnya sangat mudah dan efisien.",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
      },
      {
        name: "Siti Nurhaliza",
        comment:
          "Prosesnya mudah dan cepat. Surat sakit langsung terkirim ke email saya.",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4.5,
      },
      {
        name: "Budi Santoso",
        comment:
          "Platform ini sangat berguna. Saya sedang tidak fit dan tidak bisa keluar rumah. Prosesnya mudah dan cepat.",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 4,
      },
      {
        name: "Dewi Lestari",
        comment:
          "Saya sangat puas dengan layanan ini. Surat sakit valid dan bisa digunakan untuk keperluan kantor. Prosesnya cepat tanpa hambatan.",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 5,
      },
      {
        name: "Eko Prasetyo",
        comment:
          "Cepat, praktis, dan efisien. Tidak perlu lagi repot ke dokter hanya untuk surat sakit.",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 4.5,
      },
      {
        name: "Rina Amelia",
        comment:
          "Layanan ini sangat membantu saya. Saya tidak perlu keluar rumah hanya untuk surat sakit. Prosesnya simpel dan cepat. Sangat direkomendasikan!",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        rating: 4,
      },
      {
        name: "Fajar Nugraha",
        comment:
          "Saya sangat terkesan! Surat sakit bisa didapatkan dalam hitungan menit. Proses ini sangat cocok untuk orang-orang dengan jadwal yang padat seperti saya. Tidak hanya mudah, layanan ini juga memberikan solusi cepat tanpa harus mengorbankan waktu untuk pergi ke dokter hanya demi mendapatkan surat sakit. Sangat direkomendasikan untuk semua yang membutuhkan solusi praktis.",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        rating: 5,
      },
      {
        name: "Lina Marlina",
        comment:
          "Prosesnya mudah dan surat sakit langsung dikirim ke email. Sangat membantu untuk kebutuhan kantor.",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        rating: 4.5,
      },
      {
        name: "Agus Supriyadi",
        comment:
          "Tidak perlu lagi antri lama di rumah sakit. Proses cepat dan efisien. Sangat direkomendasikan! Saya awalnya ragu dengan layanan ini, tetapi setelah mencobanya, saya sangat puas. Surat sakitnya langsung diterima dan bisa saya gunakan untuk keperluan administrasi di kantor. Layanan ini sangat praktis dan benar-benar mempermudah hidup saya. Rasanya seperti memiliki asisten kesehatan digital yang selalu siap membantu kapan saja dan di mana saja.",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        rating: 5,
      },
      {
        name: "Nurul Aini",
        comment:
          "Luar biasa! Saya tidak menyangka layanan ini akan semudah dan secepat ini. Dalam beberapa menit saja, saya sudah mendapatkan surat sakit yang langsung terkirim ke email. Ini benar-benar solusi modern yang sangat membantu, terutama bagi saya yang harus sering bepergian dan tidak punya waktu untuk antri di klinik atau rumah sakit. Sangat direkomendasikan untuk siapa pun yang membutuhkan proses yang cepat dan terpercaya.",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        rating: 5,
      },
    ];


  // Fungsi untuk menampilkan bintang berdasarkan rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Bintang penuh
    const hasHalfStar = rating % 1 !== 0; // Apakah ada setengah bintang
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Bintang kosong

    return (
      <div className="flex justify-center gap-0.5 text-yellow-500">
        {/* Bintang penuh */}
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {/* Setengah bintang */}
        {hasHalfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill="url(#half-gradient)"
            />
            <defs>
              <linearGradient id="half-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Bintang kosong */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-3xl font-bold tracking-tight text-primer sm:text-4xl">
          Apa Kata Pengguna Izin Sakit?
        </h2>
        <p className="mt-2 text-center text-gray-400 pb-5">Dengarkan pengalaman mereka yang telah merasakan kemudahan layanan kami.</p>
        <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="mb-8 sm:break-inside-avoid">
              <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt={testimonial.name}
                    src={testimonial.avatar}
                    className="size-14 rounded-full object-cover"
                  />

                  <div>
                    {renderStars(testimonial.rating)}
                    <p className="mt-0.5 text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">{testimonial.comment}</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;