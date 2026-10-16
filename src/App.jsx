
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Layouts/Sidebar";
import Navbar from "./Layouts/Navbar";
import Dashboard from "./pages/Merchant/Dashboard";
import Leads from "./pages/Merchant/Leads";
import Contacts from "./pages/Merchant/Contacts.jsx";
import ContactProfile from "./pages/Merchant/ContactProfile.jsx";
import Companies from "./pages/Merchant/Companies.jsx";

import "./App.css";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Sidebar />

      <div className="min-h-screen lg:pl-60">
        <Navbar />

        <main className="p-4 sm:p-6 lg:p-7">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contacts/:id" element={<ContactProfile />} />
            <Route path="/companies" element={<Companies />} />
            {/* Add more routes for other pages here */}

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
