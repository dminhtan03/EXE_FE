import React from "react";
import { Link } from "react-router-dom";

const destinationMap = {
  hn: "Hà Nội",
  ss: "Sóc Sơn (Hà Nội)",
  bn: "Bắc Ninh",
  bg: "Bắc Giang",
  vp: "Vĩnh Phúc (Tam Đảo)",
  tb: "Thái Bình",
  nd: "Nam Định",
  nb: "Ninh Bình",
  hb: "Hòa Bình",
  pt: "Phú Thọ",
  hy: "Hưng Yên",
  ha: "Hà Nam",
  qn: "Quảng Ninh (Hạ Long)",
  lc: "Lạng Sơn",
};

const TourList = ({ tours, currentPage, totalPages, onPageChange }) => {
  return (
    <>
      {tours.map((tour, index) => (
        <div
          className="col-xl-4 col-md-6"
          style={{ marginBottom: "30px" }}
          key={index}
        >
          <div className="destination-item tour-grid style-three bgc-lighter">
            <div className="image">
              <span className="badge bgc-pink">Featured</span>
              <Link to="#" className="heart">
                <i className="fas fa-heart"></i>
              </Link>
              <img src={tour.images[0]} alt="Tour" />
            </div>
            <div className="content">
              <div className="destination-header">
                <span className="location">
                  <i className="fal fa-map-marker-alt"></i>{" "}
                  {destinationMap[tour.destination] || tour.destination}
                </span>
                <div className="ratting">
                  {[1, 2, 3, 4, 5].map((i) =>
                    i <= tour.rating ? (
                      <i className="fas fa-star" key={i}></i>
                    ) : (
                      <i className="far fa-star" key={i}></i>
                    )
                  )}
                </div>
              </div>
              <h6>
                <Link to={`/tour-detail/${tour.tourId}`}>{tour.title}</Link>
              </h6>
              <ul className="blog-meta">
                <li>
                  <i className="far fa-clock"></i> {tour.time}
                </li>
                <li>
                  <i className="far fa-user"></i> {tour.quantity}
                </li>
              </ul>
              <div className="destination-footer">
                {/* <span className="price">{tour.priceAdult.toLocaleString('vi-VN')} VND / người</span> */}
                <Link
                  to={`/tour-detail/${tour.tourId}`}
                  className="theme-btn style-two style-three"
                >
                  <i className="fal fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="col-lg-12">
        <ul className="pagination justify-content-center pt-15 flex-wrap">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <i className="far fa-chevron-left"></i>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <i className="far fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TourList;
