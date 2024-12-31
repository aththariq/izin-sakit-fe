import React from "react";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import LandingPage from "@/pages/LandingPages";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import AuthProvider from "@/contexts/AuthContext";
import RequireAuth from "@/components/RequireAuth";
import Forms from "@/pages/Forms";
import AIQuestionsPage from "@/pages/AIQuestionsPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/Dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/form" element={<Forms />} />
          <Route path="/ai-questions" element={<AIQuestionsPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
