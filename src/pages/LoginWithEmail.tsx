import { LoginForm } from "@/components/Login-form";
import useAuthRedirect from "@/hooks/useAuthRedirect";

export function LoginWithEmail() {
  useAuthRedirect();

  return (
    <div className="flex min-h-screen w-full">
      {/* Gambar di sebelah kiri */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center bg-[url(login.jpg)]">
        {/* Gambar sebagai background */}
      </div>

      {/* Login form di sebelah kanan */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
