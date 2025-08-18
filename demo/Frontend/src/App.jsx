import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import CampaignsPage from "./pages/CampaignsPage";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import TestAdminLogin from "./pages/TestAdminLogin";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnly from "./components/PublicOnly";
import About from "./pages/About";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
      <Routes>
        <Route path="/" element={<PublicOnly><LandingPage /></PublicOnly>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/create" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/test-admin-login" element={<TestAdminLogin />} />
      </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
}
