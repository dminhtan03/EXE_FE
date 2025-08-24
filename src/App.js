import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";


import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";

import AboutPage from './screens/about';
import Experience from './screens/experience'
import Home from "./screens/home";
import Tours from "./screens/tour";
import Contact from "./screens/contact";
import Service from "./screens/service";

import Login from "./screens/login";
import UserProfile from "./screens/profileUser";
import TourDetailWrapper from './screens/tourDetailWrapper';
import PaymentPage from "./screens/PaymentPage";
import MyBookingsPage from "./screens/MyBookingPage"




const PublicLayout = () => (
  <>
    <HeaderHome />
    <Outlet />
    <FooterHome />
  </>
);

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
            <Route path="/service" element={<Service />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<Experience />} />
          </Route>
          <Route path="/my-bookings" element={<MyBookingsPage />} />
           <Route path="/payment" element={<PaymentPage />} />
          <Route path="/tour-detail/:id" element={<TourDetailWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}