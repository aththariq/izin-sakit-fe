import React, { useState, useEffect } from "react";
import { TbSend } from "react-icons/tb"; // Icon untuk kirim email
import { HiDownload } from "react-icons/hi"; // Icon untuk download
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Input } from "@/components/ui/input"; // Shadcn Input
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ShadCN Dropdown Menu
import { Image, Spin } from "antd"; // Ant Design Image and Spin
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { getApiUrl } from "@/utils/api";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { formId } = location.state; // Ambil formId dari state

  const handleBookingClick = () => {
    navigate(`/booking/${formId}`);
  };

  useEffect(() => {
    // Check if we have the required state
    if (!location.state?.formId) {
      console.error("No formId provided");
      navigate("/dashboard");
      return;
    }

    const loadPdfAndImage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        // Pastikan token sudah mengandung "Bearer"
        const authToken = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;

        // Ambil URL PDF dan gambar
        const response = await fetch(
          getApiUrl(`/api/generate-pdf-and-image/${formId}`),
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: authToken, // Sertakan token di header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to generate PDF and image");
        }

        const data = await response.json();
        console.log("Data from server:", data);

        // Pastikan data.imageUrl ada dan valid
        if (!data.imageUrl) {
          throw new Error("URL gambar tidak ditemukan dalam respons server.");
        }

        // Muat gambar dengan token
        const imageUrl = await loadImageWithAuth(getApiUrl(data.imageUrl));
        setPreviewImageUrl(imageUrl);
      } catch (error) {
        console.error("Error loading preview:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Gagal memuat preview surat",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    };

    loadPdfAndImage();
  }, [formId, navigate]);

  // Add a generic download handler
  const handleDownload = async (type) => {
    setLoadingDownload(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      // Pastikan token sudah mengandung "Bearer"
      const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const url = getApiUrl(`/api/download/${type}/${formId}`);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: type === "pdf" ? "application/pdf" : "image/png",
          Authorization: authToken, // Gunakan authToken yang sudah dipastikan mengandung "Bearer"
        },
      });

      if (!response.ok)
        throw new Error(`Gagal mengunduh ${type === "pdf" ? "PDF" : "gambar"}`);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download =
        type === "pdf" ? "Surat_Izin_Sakit.pdf" : "Surat_Izin_Sakit.png";
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
      alert(
        `Terjadi kesalahan saat mengunduh ${type === "pdf" ? "PDF" : "gambar"}`
      );
    } finally {
      setLoadingDownload(false);
    }
  };

  // Update existing download handlers to use the generic handler
  const handleDownloadPDF = () => handleDownload("pdf");
  const handleDownloadImage = () => handleDownload("image");

  // Add the handleSendEmail function
  const handleSendEmail = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter an email address.",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoadingEmail(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      // Pastikan token sudah mengandung "Bearer"
      const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const response = await fetch(getApiUrl(`/api/send-pdf/${formId}`), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authToken, // Gunakan authToken yang sudah dipastikan mengandung "Bearer"
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email.");
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message || "Email sent successfully!",
        showDenyButton: true,
        confirmButtonText: "Kembali ke Dashboard",
        denyButtonText: "Tetap di Halaman",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to send email.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoadingEmail(false);
    }
  };

  const loadImageWithAuth = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }

    // Pastikan token sudah mengandung "Bearer"
    const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    // Ambil gambar sebagai blob
    const response = await fetch(url, {
      headers: {
        Authorization: authToken, // Sertakan token di header
      },
    });

    if (!response.ok) {
      throw new Error("Gagal memuat gambar");
    }

    // Konversi blob ke URL
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Hasil Analisis</CardTitle>
          <CardDescription>
            Berikut adalah hasil analisis dan surat izin sakit Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Preview */}
          <div className="mb-6 flex justify-center">
            <Spin spinning={loading}>
              <Image
                src={previewImageUrl}
                alt="Preview Surat Izin Sakit"
                width={400}
                preview
                style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }}
              />
            </Spin>
          </div>

          {/* Dropdown Menu for Download */}
          <div className="mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full bg-primer hover:bg-rose-700">
                  Unduh Surat <HiDownload className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDownloadPDF}>
                  Unduh sebagai PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadImage}>
                  Unduh sebagai Gambar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Email Input and Send Button */}
          <div className="mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={handleSendEmail}
                className="bg-primer hover:bg-rose-700"
                disabled={loadingEmail}
              >
                {loadingEmail ? (
                  <>Mengirim...</>
                ) : (
                  <>
                    Kirim Email <TbSend className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="mb-2">
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gray-950 hover:bg-slate-400"
            >
              Kembali ke Dashboard
            </Button>
            <Button
              onClick={handleBookingClick}
              className="mt-4 mb-4 w-full bg-gray-500"
            >
              Booking Ruang Isolasi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPage;
