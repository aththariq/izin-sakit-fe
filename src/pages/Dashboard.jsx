import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import CreateSickLeaveCard from "@/components/CreateSickLeaveCard";
import SickLeaveListCard from "@/components/SickLeaveListCard";
import { AuthContext } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const search = location.search;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const token = urlSearchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      login(token);
      window.history.replaceState({}, document.title, "/Dashboard");
    } else {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        navigate("/login");
      }
    }
  }, [navigate, login, search]);

  const sickLeaves = [
    { date: "2023-10-01", reason: "Flu", status: "Diajukan" },
    { date: "2023-10-05", reason: "Migrain", status: "Disetujui" },
    { date: "2023-10-10", reason: "Demam", status: "Ditolak" },
    { date: "2023-10-15", reason: "Sakit Kepala", status: "Diajukan" },
    { date: "2023-10-20", reason: "Pusing", status: "Disetujui" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-8">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            <CreateSickLeaveCard />
            {sickLeaves.map((leave, index) => (
              <SickLeaveListCard key={index} leave={leave} />
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
