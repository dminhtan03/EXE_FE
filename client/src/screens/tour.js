import React, { useState } from 'react';
import TourList from '../components/TourList';
import { tours } from '../data/mockData';
import BannerHome from '../components/BannerHome';
const TourScreen = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTour = currentPage * itemsPerPage;
  const indexOfFirstTour = indexOfLastTour - itemsPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  return (
    <>
      <BannerHome />

    <div className="tour-grid-wrap">
      <div className="row" id="tours-container">
        <TourList
          tours={currentTours}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
    </>
  );
};

export default TourScreen;
