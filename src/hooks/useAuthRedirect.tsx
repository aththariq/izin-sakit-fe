import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const BACKEND_URL =
          process.env.NODE_ENV === "production"
            ? "https://web-tst-backend.up.railway.app"
            : "http://localhost:5000";

        const response = await fetch(`${BACKEND_URL}/auth/current_user`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            navigate("/dashboard");
          }
        }
      } catch (error) {
        console.error("Not logged in:", error);
      }
    };

    checkLogin();
  }, [navigate]);
}

export default useAuthRedirect;
