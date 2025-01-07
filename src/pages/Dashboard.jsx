import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CreateSickLeaveCard from "@/components/CreateSickLeaveCard";
import SickLeaveListCard from "@/components/SickLeaveListCard";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const search = location.search;
  const [sickLeaves, setSickLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Store token with Bearer prefix
      const authToken = `Bearer ${token}`;
      localStorage.setItem("token", authToken);
      login(authToken);
      
      // Clean URL immediately
      window.history.replaceState({}, document.title, "/dashboard");
    } else {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        navigate("/login");
        return;
      }
    }

    // Fetch data immediately after token check
    fetchDashboardData();
  }, [navigate, login]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const bearerToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      if (!bearerToken) {
        console.log("No token found");
        navigate("/login");
        return;
      }

      // Pastikan VITE_API_URL ada
      if (!import.meta.env.VITE_API_URL) {
        console.error("VITE_API_URL is not defined");
        setError("API URL is not configured");
        return;
      }

      console.log("API URL:", import.meta.env.VITE_API_URL); // Debug URL
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/user/sick-leaves`;
      console.log("Full API URL:", apiUrl);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: bearerToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Response headers:", response.headers);
      console.log("Response type:", response.headers["content-type"]);
      console.log("Raw response:", response);

      // Verifikasi tipe konten
      const contentType = response.headers["content-type"];
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Invalid content type:", contentType);
        setError("Server returned invalid content type");
        return;
      }

      const data = response.data;
      if (Array.isArray(data)) {
        setSickLeaves(data);
      } else {
        console.error("Unexpected data format:", data);
        setError("Data format is incorrect");
      }

      setLoading(false);
    } catch (err) {
      console.error("Full error details:", {
        message: err.message,
        response: err.response,
        config: err.config,
      });
      setError("Failed to load sick leave data");
      setLoading(false);
    }
  };

  // Add effect to refresh data periodically
  useEffect(() => {
    fetchDashboardData();

    // Optional: Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-8">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            <CreateSickLeaveCard />
            {Array.isArray(sickLeaves) &&
              sickLeaves.map((leave) => (
                <SickLeaveListCard key={leave._id} leave={leave} />
              ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
