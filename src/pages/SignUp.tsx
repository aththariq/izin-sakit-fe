import { useState } from "react";
import { AlertMessage } from "@/components/AlertMessage"; // Import AlertMessage
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState<{ type: string; title: string; message: string } | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setAlert({ type: "error", title: "Error", message: "Passwords do not match" });
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setAlert({ type: "success", title: "Success", message: "Registration successful" });
        setTimeout(() => {
          window.location.href = "/login-email";
        }, 2000);
      } else {
        setAlert({ type: "error", title: "Error", message: data.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({ type: "error", title: "Error", message: "An error occurred" });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm my-auto">
        {alert && (
          <AlertMessage type={alert.type as "success" | "error"} title={alert.title} message={alert.message} />
        )}
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input
              id="full-name"
              placeholder="John Doe"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="me@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
