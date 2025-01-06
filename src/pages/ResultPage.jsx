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
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const formId = location.state?.formId;

  // Add a base URL state
  const [baseUrl, setBaseUrl] = useState(`http://localhost:3000/api/generate-pdf/${formId}`);

  useEffect(() => {
    if (!formId) {
      console.error("No formId in state");
      navigate("/");
      return;
    }

    const loadPdfPreview = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/convert-pdf-to-image/${formId}`, {
          headers: { Accept: "image/png" },
        });
        if (!response.ok) throw new Error("Failed to generate image");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPreviewImageUrl(url);
      } catch (error) {
        console.error("Error loading preview:", error);
        alert("Gagal memuat preview surat");
      } finally {
        setLoading(false);
      }
    };

    loadPdfPreview();
    return () => {
      if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    };
  }, [formId, navigate, baseUrl]);

  // Add a generic download handler
  const handleDownload = async (type) => {
    setLoadingDownload(true);
    try {
      const url = type === 'pdf' ? baseUrl : `http://localhost:3000/api/convert-pdf-to-image/${formId}`;
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) throw new Error(`Gagal mengunduh ${type === 'pdf' ? 'PDF' : 'gambar'}`);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = type === 'pdf' ? "Surat_Izin_Sakit.pdf" : "Surat_Izin_Sakit.png";
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
      alert(`Terjadi kesalahan saat mengunduh ${type === 'pdf' ? 'PDF' : 'gambar'}`);
    } finally {
      setLoadingDownload(false);
    }
  };

  // Update existing download handlers to use the generic handler
  const handleDownloadPDF = () => handleDownload('pdf');
  const handleDownloadImage = () => handleDownload('image');

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
