import React, { useState, useEffect } from "react";
import BannerHome from "../components/BannerHome";
import TourList from "../components/TourList";
import { Link } from "react-router-dom";
import { getCampingSites } from "../api/tourService"; // gọi API thật

const TourScreen = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCampingSites();

        if (!Array.isArray(data)) {
          throw new Error("Dữ liệu API không hợp lệ");
        }

        const normalized = data.map((item) => ({
          id: item.roomId || Math.random().toString(), // fallback ID
          destination: item.location || "Chưa cập nhật",
          start_date: "2025-10-01", // default nếu API chưa có
          end_date: "2025-10-05",
          description: item.description || "Không có mô tả",
          image: item.imageUrl || "/assets/images/tours/default.jpg", // lấy từ DB
          price: item.pricePerNight || 0,
          name: item.roomName || "Tên phòng",
          site: item.siteName || "Chưa xác định",
        }));

        setTours(normalized);
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu tour. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const indexOfLastTour = currentPage * itemsPerPage;
  const indexOfFirstTour = indexOfLastTour - itemsPerPage;
  const currentTours = Array.isArray(tours)
    ? tours.slice(indexOfFirstTour, indexOfLastTour)
    : [];
  const totalPages = Math.ceil((tours?.length || 0) / itemsPerPage);

  return (
    <>
      <Link to="#" className="chatbot-fixed" title="Trợ lý ảo Campverse">
        <img src="/assets/images/login/chatbot.png" alt="Chatbot" />
      </Link>

      <BannerHome />

      <div className="tour-grid-wrap container">
        <div className="row" id="tours-container">
          {loading ? (
            <div className="col-12 text-center py-5">
              <h5>Đang tải dữ liệu...</h5>
            </div>
          ) : error ? (
            <div className="col-12 text-center py-5 text-danger">
              <h5>{error}</h5>
            </div>
          ) : currentTours.length > 0 ? (
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
