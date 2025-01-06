import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateSickLeaveCard = () => {
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sick-leave-form`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.formId) {
        // Force refresh the dashboard after successful submission
        window.location.reload();
        // Or use a callback/event to trigger dashboard refresh
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Buat Surat Izin Sakit Baru</CardTitle>
        <CardDescription>Buat surat izin sakit dengan mudah.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Konten tambahan bisa dimasukkan di sini */}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link to="/form">
          <Button className="flex bg-primer ">
            Buat Surat
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CreateSickLeaveCard;
