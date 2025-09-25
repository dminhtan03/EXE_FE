import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/home'; // màn hình Home chính của bạn
import ManagerCamping from './screens/ManagerCamping';
import Contact from './screens/contact';
import FooterHome from './components/FooterHome';
import HeaderHome from './components/HeaderHome';
import AboutPage from './screens/about';
import TourDetailScreen from './screens/TourDetailScreen';
import CreateCamping from './screens/CreateCamping';
import CampingDetailScreen from "./screens/ManagerCampingDetailScreen";
export default function App() {
  return (
     
    <BrowserRouter>
      <HeaderHome/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Bạn có thể thêm các route khác ở đây */}
        <Route path="/managercamping" element={<ManagerCamping />} />
        <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
           <Route path="/tours/:id" element={<TourDetailScreen />} />
           <Route path="/createCamp" element={<CreateCamping />} />
          <Route path="/camping/:id" element={<CampingDetailScreen />} />
           <Route path="/createCamp/:campingId" element={<CreateCamping />} />
      </Routes>
        <FooterHome />
    </BrowserRouter>
  );
}
