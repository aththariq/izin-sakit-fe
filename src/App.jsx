import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPages";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import AuthProvider from "@/contexts/AuthContext";
import RequireAuth from "@/components/RequireAuth";
import Forms from "@/pages/Forms";
import AIQuestionsPage from "@/pages/AIQuestionsPage";
import Error from "@/pages/Error";
import Result from "@/pages/ResultPage";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="/form" element={<Forms />} />
          <Route path="/ai-questions" element={<AIQuestionsPage />} />
          <Route path="/result" element={<Result />} /> {/* Pastikan path ini benar */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
