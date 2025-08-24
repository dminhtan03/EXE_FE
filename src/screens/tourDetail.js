"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/HeaderCamping"
import TourPreparationItems from "../components/Preparation"
import TentBookingSection from "./TentBookingSection"
import Footer from "../components/FooterHome"
import {tentAvailabilityData} from "../data/mockData";


const TourDetailPage = ({
  tourDetail,
  avgStar = 4,
  title = "Chi tiết tour",
  checkDisplay = "",
  tourRecommendations = [],
}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState("")
  const [selectedEndDate, setSelectedEndDate] = useState("")
  const [tentAvailability, setTentAvailability] = useState({})
  const [totalDays, setTotalDays] = useState(0)

  // Mock data for tent availability - In real app, this would come from API
  
  const tentTypes = [
    { id: 1, name: "Lều 2 người", capacity: "2 người", price: 150000 },
    { id: 2, name: "Lều 4 người", capacity: "4 người", price: 250000 },
    { id: 3, name: "Lều gia đình", capacity: "6-8 người", price: 400000 },
    { id: 4, name: "Lều cao cấp", capacity: "4 người", price: 350000 },
  ]

  // Initialize dates with tour default dates
  useEffect(() => {
    if (tourDetail?.startDate && tourDetail?.endDate) {
      const startDate = new Date(tourDetail.startDate).toISOString().split("T")[0]
      const endDate = new Date(tourDetail.endDate).toISOString().split("T")[0]
      setSelectedStartDate(startDate)
      setSelectedEndDate(endDate)
    }
  }, [tourDetail])

  // Calculate days and check availability when dates change
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate)
      const end = new Date(selectedEndDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setTotalDays(diffDays)

      // Check availability for selected date range
      checkTentAvailability(selectedStartDate, selectedEndDate)
    }
  }, [selectedStartDate, selectedEndDate])

  const checkTentAvailability = (startDate, endDate) => {
    const availability = {}
    const start = new Date(startDate)
    const end = new Date(endDate)

    tentTypes.forEach((tent) => {
      let minAvailable = Number.POSITIVE_INFINITY
      const currentDate = new Date(start)

      // Check each day in the range
      while (currentDate <= end) {
        const dateStr = currentDate.toISOString().split("T")[0]
        const dayAvailability = tentAvailabilityData[dateStr] || {}
        const tentKey = `tent${tent.id}`
        const available = dayAvailability[tentKey] || 0

        minAvailable = Math.min(minAvailable, available)
        currentDate.setDate(currentDate.getDate() + 1)
      }

      // Nếu không có data cho ngày nào, mặc định là có 5 lều
      availability[tent.id] = minAvailable === Number.POSITIVE_INFINITY ? 5 : minAvailable
    })

    setTentAvailability(availability)
  }

  const handleOpenPopup = () => {
    if (!selectedStartDate || !selectedEndDate) {
      alert("Vui lòng chọn ngày bắt đầu và kết thúc!")
      return
    }

    if (new Date(selectedStartDate) >= new Date(selectedEndDate)) {
      alert("Ngày kết thúc phải sau ngày bắt đầu!")
      return
    }

    setShowPopup(true)
    document.body.style.overflow = "hidden"
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    document.body.style.overflow = "unset"
  }

  // Close popup when pressing ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27 && showPopup) {
        handleClosePopup()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "unset"
    }
  }, [showPopup])

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={i < count ? "fas fa-star" : "far fa-star"}></i>
    ))
  }

  const preparationItems = [
    { icon: "/assets/images/icon-para/sacduphong.jpg", label: "Sạc dự phòng" },
    { icon: "/assets/images/icon-para/khantam.jpg", label: "Khăn tắm đa năng" },
    { icon: "/assets/images/icon-para/kinh.jpg", label: "Kính dâm" },
    { icon: "/assets/images/icon-para/mayanh.jpg", label: "Máy ảnh" },
    { icon: "/assets/images/icon-para/giay.jpg", label: "Giày leo núi" },
    { icon: "/assets/images/icon-para/binhnuoc.jpg", label: "Bình nước" },
    { icon: "/assets/images/icon-para/thuoc.jpg", label: "Thuốc chống côn trùng" },
  ]

  const handleNavClick = (e) => {
    e.preventDefault()
    const targetId = e.currentTarget.getAttribute("href").substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const offset = 80
      const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      })
    }
  }

  // Get today's date for min date restriction
  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      <style>
        {`
                    .booking-popup-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.75);
                        backdrop-filter: blur(4px);
                        z-index: 9999;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        animation: fadeIn 0.3s ease-out;
                    }

                    .booking-popup-content {
                        background: white;
                        border-radius: 20px;
                        max-width: 95vw;
                        max-height: 95vh;
                        width: 1200px;
                        overflow: hidden;
                        position: relative;
                        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                        animation: slideUp 0.3s ease-out;
                    }

                    .booking-popup-header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 20px 30px;
                        position: relative;
                        border-radius: 20px 20px 0 0;
                    }

                    .booking-popup-header h4 {
                        margin: 0;
                        font-size: 1.5rem;
                        font-weight: 700;
                    }

                    .booking-popup-close {
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        font-size: 18px;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(10px);
                    }

                    .booking-popup-close:hover {
                        background: rgba(255, 255, 255, 0.3);
                        transform: scale(1.1);
                    }

                    .booking-popup-body {
                        max-height: calc(95vh - 80px);
                        overflow-y: auto;
                        padding: 0;
                    }

                    .booking-popup-body::-webkit-scrollbar {
                        width: 8px;
                    }

                    .booking-popup-body::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 4px;
                    }

                    .booking-popup-body::-webkit-scrollbar-thumb {
                        background: #c1c1c1;
                        border-radius: 4px;
                    }

                    .booking-popup-body::-webkit-scrollbar-thumb:hover {
                        background: #a8a8a8;
                    }

                    .availability-badge {
                        font-size: 0.75rem;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-weight: 600;
                        margin-left: 8px;
                    }

                    .available {
                        background-color: #d4edda;
                        color: #155724;
                        border: 1px solid #c3e6cb;
                    }

                    .unavailable {
                        background-color: #f8d7da;
                        color: #721c24;
                        border: 1px solid #f5c6cb;
                    }

                    .limited {
                        background-color: #fff3cd;
                        color: #856404;
                        border: 1px solid #ffeaa7;
                    }

                    .date-input {
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        padding: 10px 12px;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    }

                    .date-input:focus {
                        border-color: #007bff;
                        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                        outline: none;
                    }

                    .days-info {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 16px;
                        border-radius: 10px;
                        text-align: center;
                        margin: 15px 0;
                        font-weight: 600;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideUp {
                        from { 
                            opacity: 0;
                            transform: translateY(30px) scale(0.95);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }

                    @media (max-width: 768px) {
                        .booking-popup-content {
                            margin: 10px;
                            max-height: calc(100vh - 20px);
                            width: calc(100vw - 20px);
                        }
                        
                        .booking-popup-header {
                            padding: 15px 20px;
                        }
                        
                        .booking-popup-header h4 {
                            font-size: 1.25rem;
                            padding-right: 50px;
                        }
                    }

                    .tour-nav-tabs {
                        z-index: 1000;
                    }
                `}
      </style>

      <Header tourDetail={tourDetail} />
      <nav className="tour-nav-tabs sticky-top bg-white shadow-sm z-index-10" style={{ marginBottom: "40px" }}>
        <div className="container-fluid">
          <ul className="nav nav-pills py-4 gap-4 justify-content-center">
            <li className="nav-item">
              <a className="nav-link px-4 py-2 rounded-pill fw-semibold" href="#overview" onClick={handleNavClick}>
                Chi tiết khu cắm trại
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 py-2 rounded-pill fw-semibold" href="#timeline" onClick={handleNavClick}>
                Lịch trình
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 py-2 rounded-pill fw-semibold" href="#gallery" onClick={handleNavClick}>
                Thư viện ảnh
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-4 py-2 rounded-pill fw-semibold" href="#prepare" onClick={handleNavClick}>
                Chuẩn bị
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-primary text-white px-4 py-2 rounded-pill fw-semibold"
                href="#booking"
                onClick={handleNavClick}
              >
                Đặt ngay
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section
        id="overview"
        className="mb-5"
        style={{
          marginBottom: "80px",
          paddingTop: "120px",
          marginTop: "0px",
        }}
      >
        <div className="container">
          <div className="row">
            {/* Left Content - Thông tin tour */}
            <div className="col-lg-8">
              <section className="mb-5">
                <h3>Thông tin khu cắm trại</h3>
                <div className="tour-description mb-4">
                  <p>{tourDetail?.description?.split("🔹").shift()}</p>
                  <ul className="ps-3">
                    {tourDetail?.description
                      ?.split("🔹")
                      .slice(1)
                      .map((item, index) => (
                        <li key={index} className="mb-2">
                          <i className="fas fa-check-circle text-success me-2"></i>
                          {item.trim()}
                        </li>
                      ))}
                  </ul>
                </div>
              </section>

              <section
                id="timeline"
                className="mb-5"
                style={{
                  marginBottom: "80px",
                  paddingTop: "120px",
                  marginTop: "0px",
                }}
              >
                <h3>Lịch trình</h3>
                <div className="accordion" id="timelineAccordion">
                  {tourDetail?.timeline?.map((item, index) => (
                    <div className="accordion-item" key={item.timeLineId || index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`collapse${index}`}
                        >
                          {item.title}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#timelineAccordion"
                      >
                        <div className="accordion-body">
                          <p dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="gallery"
                className="mb-5"
                style={{
                  marginBottom: "80px",
                  paddingTop: "120px",
                  marginTop: "0px",
                }}
              >
                <h3>Thư viện ảnh</h3>
                <div className="row g-3">
                  {tourDetail?.gallery?.map((img, i) => (
                    <div className="col-6 col-lg-4" key={i}>
                      <div
                        className="position-relative overflow-hidden rounded-3 shadow-sm"
                        style={{ height: "280px" }}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Gallery ${i + 1}`}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="prepare"
                className="mb-5"
                style={{
                  marginBottom: "100px",
                  paddingTop: "120px",
                  marginTop: "20px",
                  paddingBottom:"100px"
                }}
              >
                <TourPreparationItems items={preparationItems} />
              </section>
            </div>

            {/* Right Sidebar - Đặt tour */}
            <div className="col-lg-4">
              <section
                id="booking"
                style={{
                  paddingTop: "30px",
                  marginTop: "0px",
                }}
              >
                <div className="bg-light p-4 rounded shadow-sm mb-4">
                  <h4 className="mb-3">
                    <i className="fas fa-campground me-2"></i>
                    Đặt Camping
                  </h4>

                  {/* Date Selection */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-calendar-alt me-1"></i>
                      Ngày bắt đầu:
                    </label>
                    <input
                      type="date"
                      value={selectedStartDate}
                      onChange={(e) => setSelectedStartDate(e.target.value)}
                      min={today}
                      className="form-control date-input"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      <i className="fas fa-calendar-alt me-1"></i>
                      Ngày kết thúc:
                    </label>
                    <input
                      type="date"
                      value={selectedEndDate}
                      onChange={(e) => setSelectedEndDate(e.target.value)}
                      min={selectedStartDate || today}
                      className="form-control date-input"
                    />
                  </div>

                  {/* Days Info */}
                  {/* {totalDays > 0 && (
                    <div className="days-info">
                      <i className="fas fa-clock me-2"></i>
                      {totalDays} ngày {totalDays - 1} đêm
                    </div>
                  )} */}

                  <hr />

                  {/* Tent Availability */}
                  <h6 className="mb-3">
                    <i className="fas fa-home me-1"></i>
                    Tình trạng lều:
                  </h6>
                  <div className="mb-3">
                    {tentTypes.map((tent) => {
                      const available = tentAvailability[tent.id] || 0
                      let badgeClass = "unavailable"
                      let badgeText = "Hết"
                      let icon = "fas fa-times-circle"

                      if (available > 3) {
                        badgeClass = "available"
                        badgeText = "Còn"
                        icon = "fas fa-check-circle"
                      } else if (available > 0) {
                        badgeClass = "limited"
                        badgeText = `Còn ${available}`
                        icon = "fas fa-exclamation-circle"
                      }

                      return (
                        <div key={tent.id} className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <small className="text-muted">{tent.name}</small>
                            <br />
                            <small className="fw-bold">{tent.price.toLocaleString()} VND/đêm</small>
                          </div>
                          <span className={`availability-badge ${badgeClass}`}>
                            <i className={`${icon} me-1`}></i>
                            {badgeText}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <hr />

                  {/* Pricing Info */}
                  <h6 className="mb-2">
                    <i className="fas fa-ticket-alt me-1"></i>
                    Vé tham quan:
                  </h6>
                  <ul className="list-unstyled mb-3">
                    <li className="d-flex justify-content-between">
                      <span>Người lớn:</span>
                      <strong>{tourDetail.priceAdult?.toLocaleString()} VND</strong>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span>Trẻ em:</span>
                      <strong>{tourDetail.priceChild?.toLocaleString()} VND</strong>
                    </li>
                  </ul>

                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={handleOpenPopup}
                    disabled={!selectedStartDate || !selectedEndDate || totalDays <= 0}
                  >
                    <i className="fas fa-calendar-check me-2"></i>
                    {!selectedStartDate || !selectedEndDate
                      ? "Chọn ngày để đặt"
                      : totalDays <= 0
                        ? "Ngày không hợp lệ"
                        : "Đặt ngay"}
                  </button>

                  {(!selectedStartDate || !selectedEndDate) && (
                    <small className="text-muted d-block mt-2 text-center">
                      <i className="fas fa-info-circle me-1"></i>
                      Vui lòng chọn ngày để xem tình trạng lều
                    </small>
                  )}
                </div>
              </section>

              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-3">Cần trợ giúp?</h5>
                <ul className="list-unstyled">
                  <li>
                    <i className="far fa-envelope"></i> <a href="mailto:minhdien.dev@gmail.com">Campaverse</a>
                  </li>
                  <li>
                    <i className="far fa-phone-volume"></i> <a href="tel:+0968866886">0968866886</a>
                  </li>
                </ul>
              </div>

              {tourRecommendations.length > 0 && (
                <div className="mt-4">
                  <h6>Tours tương tự</h6>
                  {tourRecommendations.map((tour) => (
                    <div className="d-flex align-items-center mb-3" key={tour.tourId}>
                      <img
                        src={`/admin/assets/images/gallery-tours/${tour.images[0]}`}
                        alt="Tour"
                        className="me-3 rounded"
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                      />
                      <div>
                        <p className="mb-1 text-muted">
                          <i className="fal fa-map-marker-alt"></i> {tour.destination}
                        </p>
                        <Link to={`/tours/${tour.tourId}`} className="fw-bold text-dark">
                          {tour.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Popup Modal */}
      {showPopup && (
        <div className="booking-popup-overlay" onClick={handleClosePopup}>
          <div className="booking-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="booking-popup-header">
              <h4>
                <i className="fas fa-campground me-2"></i>
                Đặt Camping & Thuê Lều
              </h4>
              <button className="booking-popup-close" onClick={handleClosePopup} title="Đóng (ESC)">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="booking-popup-body">
              <TentBookingSection
                tourDetail={{
                  ...tourDetail,
                  startDate: selectedStartDate,
                  endDate: selectedEndDate,
                  time: `${totalDays} ngày ${totalDays - 1} đêm`,
                }}
              />
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  )
}

export default TourDetailPage
