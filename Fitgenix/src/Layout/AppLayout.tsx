import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Styles/appLayout.css";

interface AppLayoutProps {
  setAuth: (auth: boolean) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ setAuth }) => {
  return (
    <div className="app-layout">
      {/* Navbar always visible inside layout */}
      <Navbar setAuth={setAuth} />
      <main className="app-content">
        <Outlet /> {/* ✅ renders child route here */}
      </main>
    </div>
  );
};

export default AppLayout;
