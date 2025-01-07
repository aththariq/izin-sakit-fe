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
import { Image, Spin, Button as AntButton } from "antd"; // Ant Design Image, Spin, and Button
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
  const { formId, otherReason } = location.state; // Include otherReason from state

  // Add a base URL state
  const [baseUrl, setBaseUrl] = useState(getApiUrl(`/api/generate-pdf/${formId}`));

  useEffect(() => {
    // Check if we have the required state
    if (!location.state?.formId) {
      console.error("No formId provided");
      navigate("/dashboard");
      return;
    }

    if (!formId) {
      console.error("No formId in state");
      navigate("/");
      return;
    }

    const loadPdfAndImage = async () => {
      try {
        // Ensure PDF is generated
        await fetch(`${getApiUrl(`/api/generate-pdf/${formId}`)}?otherReason=${encodeURIComponent(otherReason)}`, { method: "GET" });
        
        // Fetch the preview image
        const response = await fetch(getApiUrl(`/api/convert-pdf-to-image/${formId}`), {
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

    loadPdfAndImage();
    return () => {
      if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    };
  }, [formId, navigate, baseUrl, otherReason, location.state]);

  // Add a generic download handler
  const handleDownload = async (type) => {
    setLoadingDownload(true);
    try {
      const url = type === 'pdf' ? getApiUrl(`/api/generate-pdf/${formId}`) : getApiUrl(`/api/convert-pdf-to-image/${formId}`);
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
      const response = await fetch(
        getApiUrl(`/api/generate-pdf/${formId}?email=${encodeURIComponent(email)}`),
        { method: "GET" }
      );
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
                onClick={handleSendEmail} // Update onClick to handleSendEmail
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
              className="w-full bg-slate-400 hover:bg-slate-950"
            >
              Kembali ke Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPage;
