import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home'; // màn hình Home chính của bạn
import FooterHome from './components/FooterHome';
import HeaderHome from './components/HeaderHome';
export default function App() {
  return (
     
    <BrowserRouter>
      <HeaderHome/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Bạn có thể thêm các route khác ở đây */}
      </Routes>
        <FooterHome />
    </BrowserRouter>
  );
}
