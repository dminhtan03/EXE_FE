// src/screens/TourScreen.js
import React, { useState, useEffect } from 'react';
import BannerHome from '../components/BannerHome';
import TourList from '../components/TourList';
import { tours as allTours } from '../data/mockData';

const TourScreen = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTours, setFilteredTours] = useState(allTours);

  const [searchParams, setSearchParams] = useState({
    destination: '',
    start_date: '',
    end_date: '',
  });

  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  useEffect(() => {
    let result = allTours;

    if (searchParams.destination) {
      result = result.filter((tour) => tour.destination === searchParams.destination);
    }

    setFilteredTours(result);
  }, [searchParams]);

  const indexOfLastTour = currentPage * itemsPerPage;
  const indexOfFirstTour = indexOfLastTour - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

  return (
    <>
      <BannerHome onSearch={handleSearch} />
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
