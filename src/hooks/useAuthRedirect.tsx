import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/auth/current_user",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            navigate("/dashboard"); // Redirect ke dashboard jika login berhasil
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
