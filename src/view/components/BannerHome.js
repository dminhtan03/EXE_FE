import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import DatePicker from 'react-datepicker';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/responsive.css';
import heroImage from '../../assets/images/hero/hero.jpg';

const HeroSection = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="hero-area bgc-black pt-200 rpt-120 rel z-2">
      <div className="container-fluid">
        <h1
          className="hero-title"
          data-aos="flip-up"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-offset="50"
        >
          Camping Du Lịch
        </h1>
        <div
          className="main-hero-image bgs-cover"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        ></div>
      </div>

      <form action="/search" method="GET" id="search_form">
        <div className="container container-1400">
          <div
            className="search-filter-inner"
            data-aos="zoom-out-down"
            data-aos-duration="1500"
            data-aos-offset="50"
          >
            {/* Điểm đến */}
            <div className="filter-item clearfix">
              <div className="icon">
                <i className="fal fa-map-marker-alt"></i>
              </div>
              <span className="title">Điểm đến</span>
              <select name="destination" id="destination" defaultValue="">
                <option value="">Chọn điểm đến</option>
                {[
                  ['dn', 'Đà Nẵng'],
                  ['cd', 'Côn Đảo'],
                  ['hn', 'Hà Nội'],
                  ['hcm', 'TP. Hồ Chí Minh'],
                  ['hl', 'Hạ Long'],
                  ['nb', 'Ninh Bình'],
                  ['pq', 'Phú Quốc'],
                  ['dl', 'Đà Lạt'],
                  ['qt', 'Quảng Trị'],
                  ['kh', 'Khánh Hòa (Nha Trang)'],
                  ['ct', 'Cần Thơ'],
                  ['vt', 'Vũng Tàu'],
                  ['qn', 'Quảng Ninh'],
                  ['la', 'Lào Cai (Sa Pa)'],
                  ['bd', 'Bình Định (Quy Nhơn)'],
                ].map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            {/* Ngày khởi hành */}
            <div className="filter-item clearfix">
              <div className="icon">
                <i className="fal fa-calendar-alt"></i>
              </div>
              <span className="title">Ngày khởi hành</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Chọn ngày đi"
                className="datetimepicker-custom"
                name="start_date"
              />
            </div>

            {/* Ngày kết thúc */}
            <div className="filter-item clearfix">
              <div className="icon">
                <i className="fal fa-calendar-alt"></i>
              </div>
              <span className="title">Ngày kết thúc</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Chọn ngày về"
                className="datetimepicker-custom"
                name="end_date"
              />
            </div>

            {/* Nút Tìm kiếm */}
            <div class="search-button">
                    <button class="theme-btn" type="submit">
                        <span data-hover="Tìm kiếm">Tìm kiếm</span>
                        <i class="far fa-search"></i>
                    </button>
                </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default HeroSection;
