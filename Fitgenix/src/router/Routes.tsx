import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
//import Home from "../pages/Home";
import ForgotPassword from "../components/ForgotPassword"; // ✅ Add this

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ New route */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
