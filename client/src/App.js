import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home'; // màn hình Home chính của bạn
import Tours from './screens/tour';
import Contact from './screens/contact';
import Service from './screens/service';
import FooterHome from './components/FooterHome';
import HeaderHome from './components/HeaderHome';
export default function App() {
  return (
     
    <BrowserRouter>
      <HeaderHome/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Bạn có thể thêm các route khác ở đây */}
        <Route path="/tours" element={<Tours />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/service" element={<Service />} />
      </Routes>
        <FooterHome />
    </BrowserRouter>
  );
}
