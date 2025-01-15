import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { useParams, useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns"; // Import addDays
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/utils/api";
import Swal from "sweetalert2";

const CoworkingBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sickLeaveId } = useParams();
  const navigate = useNavigate();

  // Set default selectedDate ke besok saat komponen pertama kali di-render
  useEffect(() => {
    const today = new Date();
    const tomorrow = addDays(today, 1); // Tambahkan 1 hari ke tanggal hari ini
    setSelectedDate(tomorrow); // Set selectedDate ke besok
  }, []);

  // Fungsi untuk menonaktifkan tanggal hari ini dan sebelumnya
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set waktu ke 00:00:00

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Set waktu ke 00:00:00

    // Nonaktifkan tanggal hari ini dan sebelumnya
    return selectedDate <= today;
  };

  const handleBooking = async () => {
    if (!selectedSeat || !selectedDate || !sickLeaveId) {
      Swal.fire({
        icon: "error",
        title: "Data Tidak Lengkap",
        text: "Mohon lengkapi semua data booking",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl("/api/coworking/reservations"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          seat_number: selectedSeat,
          reservation_date: format(selectedDate, "yyyy-MM-dd"),
          sickLeaveId: sickLeaveId,
        }),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      // Alert saat booking berhasil
      await Swal.fire({
        icon: "success",
        title: "Booking Berhasil!",
        text: "Ruang isolasi berhasil dibooking",
        showDenyButton: true, // Tombol "Kembali ke Dashboard"
        showCancelButton: true, // Tombol "Tetap di Halaman"
        confirmButtonText: "Kembali ke Dashboard",
        denyButtonText: "Tetap di Halaman",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard"); // Kembali ke dashboard
        } else if (result.isDenied) {
          // Tetap di halaman ini
        }
      });
    } catch (error) {
      console.error("Error booking:", error);
      // Alert saat booking gagal
      Swal.fire({
        icon: "error",
        title: "Booking Gagal",
        text: error.message || "Gagal melakukan booking",
        showDenyButton: true, // Tombol "Kembali ke Dashboard"
        denyButtonText: "Kembali ke Dashboard",
        confirmButtonText: "Coba Lagi",
      }).then((result) => {
        if (result.isDenied) {
          navigate("/dashboard"); // Kembali ke dashboard
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Booking Ruang Isolasi</CardTitle>
          <CardDescription>
            Pilih tanggal dan ruangan untuk isolasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tanggal Booking</label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => isPastDate(date)} // Nonaktifkan tanggal hari ini dan sebelumnya
              className="rounded-md border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Pilih Ruangan</label>
            <Select value={selectedSeat} onValueChange={setSelectedSeat}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih ruangan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="section-a" disabled className="font-bold">
                  Ruangan A (Isolasi Mandiri)
                </SelectItem>
                {Array(20)
                  .fill()
                  .map((_, i) => (
                    <SelectItem key={`A${i + 1}`} value={`A${i + 1}`}>
                      Ruang A{i + 1}
                    </SelectItem>
                  ))}
                <SelectItem value="section-b" disabled className="font-bold">
                  Ruangan B (Isolasi Medis)
                </SelectItem>
                {Array(20)
                  .fill()
                  .map((_, i) => (
                    <SelectItem key={`B${i + 1}`} value={`B${i + 1}`}>
                      Ruang B{i + 1}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-primer"
            onClick={handleBooking}
            disabled={isLoading || !selectedSeat}
          >
            {isLoading ? "Memproses..." : "Booking Sekarang"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoworkingBooking;