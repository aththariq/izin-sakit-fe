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

const SickLeaveListCard = ({ leave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{leave.reason}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays className="mr-2 h-4 w-4" />
            <p>Dibuat pada: {leave.date}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-600">
          <Thermometer className="mr-2 h-4 w-4" />
          <p>Status: {leave.status || "Diajukan"}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SickLeaveListCard;
