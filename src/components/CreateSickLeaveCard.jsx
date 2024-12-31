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

const CreateSickLeaveCard = () => {
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
          <Button className="flex">
            Buat Surat
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CreateSickLeaveCard;
