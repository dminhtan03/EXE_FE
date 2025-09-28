import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";

import AboutPage from "./screens/about";
import Experience from "./screens/experience";
import Home from "./screens/home";
import Tours from "./screens/tour";
import Contact from "./screens/contact";
import Service from "./screens/service";

import Login from "./screens/login";
import UserProfileModal from "./components/UserProfileModal";
import TourDetailWrapper from "./screens/tourDetailWrapper";
import PaymentPage from "./screens/PaymentPage";
import MyBookingsPage from "./screens/MyBookingPage";
import OTPInputPage from "./screens/verifyOTP";
import ForgotPasswordPage from "./screens/forgotPassword";
import ChangePasswordModal from "./components/ChangePasswordModal";

import AdminDashboard from "./components/admin/AdminDashboard"
import ManagerUser from "./components/admin/ManagerUser"
import ManagerPartner from "./components/admin/ManagerPanter"


const PublicLayout = () => (
  <>
    <HeaderHome />
    <Outlet />
    <FooterHome />
  </>
);
const AdminLayout = () => (
  <div className="admin-layout">
    <Outlet />
  </div>
)

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/tour-detail/:id" element={<TourDetailWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OTPInputPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<UserProfileModal />} />
          <Route path="/change-password" element={<ChangePasswordModal />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManagerUser />} />
            <Route path="partners" element={<ManagerPartner />} />
            {/* <Route path="partner-requests" element={<PartnerRequest />} /> */}
          </Route>



        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
