import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google";
  };

  return (
    <Card className="mx-auto max-w-sm w-1/2 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Login using Google or manual.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mr-2" />
            Login with Google
          </Button>
          <div className="flex items-center w-full justify-center gap-2">
            <Separator className="flex-1 h-px bg-gray-300"></Separator>
            <span className="text-sm text-gray-500">or</span>
            <Separator className="flex-1 h-px bg-gray-300"></Separator>
          </div>
          <Link to="/login-email" className="w-full">
            <Button className="w-full">Manually Login</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
