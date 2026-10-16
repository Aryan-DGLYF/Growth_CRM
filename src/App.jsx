
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Layouts/Sidebar";
import Navbar from "./Layouts/Navbar";




import Deals from "./pages/Merchant/Deals";
import Tasks from "./pages/Merchant/Tasks";
import Calendar from "./pages/Merchant/Calendar";

import "./App.css";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Sidebar />

      <div className="min-h-screen lg:pl-60">
        <Navbar />

        <main className="p-4 sm:p-6 lg:p-7">
          <Routes>

          
          
          
          <Route path="/deals" element={<Deals />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />

           

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
