import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CalendarDays, Thermometer, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SickLeaveListCard = ({ leave }) => {
  const navigate = useNavigate();
  const formattedDate = format(new Date(leave.date), "dd MMM yyyy");

  // Helper function to get last 6 characters of ID
  const shortenId = (id) => id.slice(-6);

  const handleViewDetails = () => {
    navigate("/result", {
      state: {
        formId: leave._id,
        otherReason: leave.otherReason || "",
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{leave.reason} #{shortenId(leave._id)}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays className="mr-2 h-4 w-4" />
            <p>Dibuat pada: {formattedDate}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <Thermometer className="mr-2 h-4 w-4" />
            <p>Status: {leave.status}</p>
          </div>
          {leave.institution && (
            <p className="text-sm text-gray-600">Institusi: {leave.institution}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SickLeaveListCard;
