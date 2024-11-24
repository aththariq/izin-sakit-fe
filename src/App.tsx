import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Page as Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { LoginWithEmail } from "./pages/LoginWithEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login-email" element={<LoginWithEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
