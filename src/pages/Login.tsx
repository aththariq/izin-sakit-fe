import { LoginForm } from "@/components/Login-form";
import useAuthRedirect from '@/hooks/useAuthRedirect';

export function Page() {
  useAuthRedirect();

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <LoginForm />
    </div>
  );
}
