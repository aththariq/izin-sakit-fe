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
import { Image, Spin } from "antd"; // Ant Design Image dan Spin
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const formId = location.state?.formId;

  useEffect(() => {
    if (!formId) {
      console.error("No formId in state");
      navigate("/");
      return;
    }

    const loadPdfPreview = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/generate-pdf/${formId}?format=preview`,
          {
            method: "GET"
          }
        );
        if (!response.ok) throw new Error("Failed to generate preview");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImagePreviewUrl(url);
      } catch (error) {
        console.error("Error loading preview:", error);
        alert("Gagal memuat preview surat");
      } finally {
        setLoading(false);
      }
    };

    loadPdfPreview();
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [formId, navigate]);

  const handleDownloadPDF = async () => {
    setLoadingDownload(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/generate-pdf/${formId}`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error("Gagal mengunduh PDF");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Surat_Izin_Sakit.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Terjadi kesalahan saat mengunduh PDF");
    } finally {
      setLoadingDownload(false);
    }
  };

  const handleDownloadImage = async () => {
    setLoadingDownload(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/generate-pdf/${formId}?format=preview`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error("Gagal mengunduh gambar");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Surat_Izin_Sakit.png";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Terjadi kesalahan saat mengunduh gambar");
    } finally {
      setLoadingDownload(false);
    }
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
              <div className="relative group cursor-pointer">
                <div className="w-full max-w-[400px] aspect-[1/1.414] border border-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreviewUrl}
                    alt="Preview Surat"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
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
                onClick={() => {}}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPage;
