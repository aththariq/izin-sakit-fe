import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Tambahkan useNavigate dan useLocation di sini
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { Alert } from "antd";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { getApiUrl } from "@/utils/api";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email wajib diisi")
    .matches(
      /^[^\s@]+@[^\s@]+\.(com|org|net|ac\.id|co\.uk)$/,
      "Email tidak valid"
    ),
  password: Yup.string()
    .required("Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: "", message: "" });
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useContext(AuthContext);

  // Di dalam komponen Login
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      login(token);
      // Redirect ke halaman yang diminta atau ke Dashboard
      navigate(location.state?.from || "/Dashboard", { replace: true });
    }
  }, [login, navigate, location.state?.from]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(getApiUrl("/login"), {
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token); // Pastikan key-nya benar
      localStorage.setItem("email", data.email);

      setAlertInfo({
        type: "success",
        message: "Login berhasil! Selamat datang!",
      });
      console.log("Login berhasil, mengarahkan ke /Dashboard");
      login(response.data.token); // Pastikan ini dipanggil
      navigate("/Dashboard"); // Pastikan ini dipanggil
    } catch (error) {
      if (error.response?.status === 400) {
        setAlertInfo({
          type: "error",
          message: "Akun ini sudah terdaftar. Gunakan email yang lain",
        });
      } else {
        setAlertInfo({
          type: "error",
          message:
            error.response?.data?.message || "Terjadi kesalahan saat login",
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = getApiUrl("/auth/google");
  };

  return (
    <div>
      <div className="bg-white">
        <div className="flex justify-center h-screen">
          <div
            className="hidden lg:block lg:w-3/5 bg-cover bg-black bg-opacity-50 bg-blend-darken"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg')`,
            }}
          >
            <div className="flex items-center h-full px-20 text-white">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Izin Sakit</h2>
                <p className="max-w-xl mt-3">
                  Solusi digital yang praktis, cepat, dan aman untuk mendapatkan
                  surat izin sakit resmi. Ajukan permintaan Anda dan dapatkan
                  surat keterangan medis tanpa perlu ke klinik atau rumah sakit!
                  🏥
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-left mx-auto h-11 mb-10">
                  <img className="w-auto h-16 sm:h-16" src="/icon.svg" alt="" />
                </div>

                <h1 className="text-left text-black text-2xl font-bold">
                  Selamat datang di Izin Sakit!
                </h1>
                <p className="mt-1 text-gray-500 text-left">
                  Masuk untuk mengajukan surat izin sakit digital.
                </p>
              </div>

              <div className="mt-7">
                {showAlert && state?.alertInfo?.type && (
                  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-1/3 p-2">
                    <Alert
                      message={
                        state.alertInfo.type === "success" ? "Success" : "Error"
                      }
                      description={state.alertInfo.message}
                      type={state.alertInfo.type}
                      showIcon
                    />
                  </div>
                )}

                {/* Tombol Login dengan Google */}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                >
                  <FcGoogle className="h-5 w-5" />
                  <span>Masuk dengan Google</span>
                </Button>

                {/* Separator */}
                <div className="flex items-center my-6">
                  <Separator className="flex-1" />
                  <span className="mx-4 text-sm text-gray-400">atau</span>
                  <Separator className="flex-1" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Alamat Email <strong className="text-red-500">*</strong>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      {...register("email")}
                      className={`"block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      onBlur={() => trigger("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mt-6 relative">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 "
                      >
                        Kata Sandi <strong className="text-red-500">*</strong>
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-primer hover:text-primer hover:underline"
                      >
                        Lupa Password?
                      </a>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      {...register("password")}
                      className={`"block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      onBlur={() => trigger("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-12 text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-primer rounded-lg hover:bg-sekunder focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Masuk
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="text-primer focus:outline-none focus:underline hover:underline font-bold"
                  >
                    Registrasi
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
