import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
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

  const handleBooking = async () => {
    if (!selectedSeat || !selectedDate || !sickLeaveId) {
      Swal.fire({
        icon: 'error',
        title: 'Data Tidak Lengkap',
        text: 'Mohon lengkapi semua data booking',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl("/api/coworking/reservations"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          seat_number: selectedSeat,
          reservation_date: format(selectedDate, "yyyy-MM-dd"),
          sickLeaveId: sickLeaveId
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      await Swal.fire({
        icon: 'success',
        title: 'Booking Berhasil!',
        text: 'Ruang isolasi berhasil dibooking',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Error booking:", error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Gagal',
        text: error.message || "Gagal melakukan booking",
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
              disabled={(date) => date < new Date()}
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
                {Array(20).fill().map((_, i) => (
                  <SelectItem key={`A${i+1}`} value={`A${i+1}`}>
                    Ruang A{i+1}
                  </SelectItem>
                ))}
                <SelectItem value="section-b" disabled className="font-bold">
                  Ruangan B (Isolasi Medis)
                </SelectItem>
                {Array(20).fill().map((_, i) => (
                  <SelectItem key={`B${i+1}`} value={`B${i+1}`}>
                    Ruang B{i+1}
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
