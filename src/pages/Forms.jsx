import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { format, startOfToday } from "date-fns"; // Added startOfToday
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getApiUrl } from "@/utils/api"; // Added import

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }), // Renamed from fullName
  position: z.string().min(1, { message: "Position is required" }),
  institution: z.string().min(1, { message: "Institution is required" }),
  startDate: z.date({ required_error: "Start Date is required" }),
  sickReason: z.string().min(1, { message: "Sick Reason is required" }),
  otherReason: z.string().optional(),
  gender: z.string().min(1, { message: "Gender is required" }),
  age: z.number().min(1, { message: "Age is required" }), // Ensure age is a number
  contactEmail: z.string().email({ message: "Invalid email address" }), // Added contactEmail field to schema
  phoneNumber: z.string().min(1, { message: "Phone Number is required" }), // Added phoneNumber field to schema
});

const SickLeaveForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", // Renamed from fullName
      position: "", // Initialize position
      institution: "", // Initialize institution
      startDate: "",
      sickReason: "", // Initialize sickReason
      otherReason: "", // Initialize otherReason
      gender: "", // Initialize gender
      age: "",
      contactEmail: "", // Initialize contactEmail
      phoneNumber: "", // Initialize phoneNumber
    },
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log("Form data before submission:", data);
    try {
      setIsLoading(true); // Show loading state
      
      // Validate data before formatting
      if (!data.fullName?.trim()) {
        throw new Error('Nama lengkap wajib diisi');
      }

      // Format the data with validation
      const formattedData = {
        fullName: data.fullName?.trim(),
        position: data.position?.trim(),
        institution: data.institution?.trim(),
        startDate: data.startDate instanceof Date ? data.startDate.toISOString() : null,
        sickReason: data.sickReason?.trim(),
        otherReason: data.otherReason?.trim() || '',
        gender: data.gender,
        age: Number(data.age) || 0,
        contactEmail: data.contactEmail?.trim(),
        phoneNumber: data.phoneNumber?.trim()
      };

      // Validate formatted data
      console.log("Formatted data for submission:", formattedData);

      // Navigate immediately without making the API call
      navigate("/ai-questions", {
        state: {
          formData: formattedData,
        },
      });

    } catch (error) {
      console.error("Form submission error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Sick Leave Application</CardTitle>
          <CardDescription>
            Please fill in your details and symptoms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* fullName field */}
              <FormField
                name="fullName" // Renamed from fullName
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* position field */}
              <FormField
                name="position"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan/Kelas</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Staff IT / Siswa Kelas 11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* institution field */}
              <FormField
                name="institution"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Institusi/Perusahaan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama perusahaan atau sekolah"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* contactEmail field */}
              <FormField
                name="contactEmail" // Added contactEmail field
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Kontak</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukkan email yang bisa dihubungi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* phoneNumber field */}
              <FormField
                name="phoneNumber" // Added phoneNumber field
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Masukkan nomor telepon yang bisa dihubungi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* gender field */}
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Laki-laki</SelectItem>
                          <SelectItem value="female">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* age field */}
              <FormField
                name="age"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umur</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan umur" // Updated placeholder
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)} // Use valueAsNumber
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* startDate field */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Mulai Izin</FormLabel>
                    <Popover
                      open={isDatePickerOpen}
                      onOpenChange={setIsDatePickerOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setIsDatePickerOpen(false);
                          }}
                          disabled={(date) => date < startOfToday()} // Updated condition
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* sickReason field */}
              <FormField
                name="sickReason"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alasan Sakit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih alasan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Demam">Demam</SelectItem>
                        <SelectItem value="flu">Flu/Pilek</SelectItem>
                        <SelectItem value="Sakit Perut">Sakit Perut</SelectItem>
                        <SelectItem value="Sakit Kepala">
                          Sakit Kepala
                        </SelectItem>
                        <SelectItem value="Penjelasan lebih lanjut">
                          Lainnya
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* otherReason field conditional rendering */}
              {form.watch("sickReason") === "Penjelasan lebih lanjut" && (
                <FormField
                  name="otherReason"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jelaskan Alasan Lainnya</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan alasan sakit Anda"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full bg-primer" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Selanjutnya"}
              </Button>
            </form>
          </Form>
          {isLoading && <Progress value={50} className="w-full mt-4" />}
        </CardContent>
      </Card>
    </div>
  );
};

export default SickLeaveForm;
