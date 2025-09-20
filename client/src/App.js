import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home'; // màn hình Home chính của bạn
import Tours from './screens/tour';
import Contact from './screens/contact';
import Service from './screens/service';
import FooterHome from './components/FooterHome';
import HeaderHome from './components/HeaderHome';
import AboutPage from './screens/about';
import Experience from './screens/experience'
import TourDetailScreen from './screens/TourDetailScreen';
import CreateCamping from './screens/CreateCamping';
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
          <Route path="/about" element={<AboutPage />} />
           <Route path="/experience" element={<Experience />} />
           <Route path="/tours/:id" element={<TourDetailScreen />} />
           <Route path="/createCamp" element={<CreateCamping />} />
      </Routes>
        <FooterHome />
    </BrowserRouter>
  );
}
