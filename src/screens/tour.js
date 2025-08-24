import React, { useState, useEffect } from 'react';
import BannerHome from '../components/BannerHome';
import TourList from '../components/TourList';
import { Link } from 'react-router-dom';
import { tours as allTours } from '../data/mockData';

const TourScreen = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTours, setFilteredTours] = useState([]);
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
    let filtered = allTours;

    // Chuẩn hóa giá trị tìm kiếm (viết thường + loại bỏ khoảng trắng 2 đầu)
    const keyword = searchParams.destination.trim().toLowerCase();

    // Lọc theo địa điểm
    if (keyword) {
      filtered = filtered.filter((tour) =>
        tour.destination.toLowerCase().includes(keyword)
      );
    }

    // Lọc theo ngày bắt đầu (nếu được nhập)
    if (searchParams.start_date) {
      filtered = filtered.filter((tour) =>
        new Date(tour.start_date) >= new Date(searchParams.start_date)
      );
    }

    // Lọc theo ngày kết thúc (nếu được nhập)
    if (searchParams.end_date) {
      filtered = filtered.filter((tour) =>
        new Date(tour.end_date) <= new Date(searchParams.end_date)
      );
    }

    setFilteredTours(filtered);
  }, [searchParams]);

  const indexOfLastTour = currentPage * itemsPerPage;
  const indexOfFirstTour = indexOfLastTour - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

  return (
    <>
      <Link to="#" className="chatbot-fixed" title="Trợ lý ảo Campverse">
        <img src="/assets/images/login/chatbot.png" alt="Chatbot" />
      </Link>

      <BannerHome onSearch={handleSearch} />

      <div className="tour-grid-wrap container">
        <div className="row" id="tours-container">
          {currentTours.length > 0 ? (
            <TourList
              tours={currentTours}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          ) : (
            <div className="col-12 text-center py-5">
              <h5>Không tìm thấy tour nào phù hợp.</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TourScreen;
