import React, { useEffect } from 'react';

export default function BannerHome() {
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    // Load scripts tuần tự
    const loadScripts = async () => {
      try {
        await loadScript('/assets/js/jquery.datetimepicker.full.min.js');
        await loadScript('/assets/js/aos.js');

        // Khởi tạo datetimepicker
        if (window.$) {
          window.$('.datetimepicker').datetimepicker({
            format: 'd/m/Y',
            timepicker: false,
          });
        }

        // Khởi tạo AOS
        if (window.AOS) {
          window.AOS.init();
        }
      } catch (error) {
        console.error('Failed to load script:', error);
      }
    };

    loadScripts();
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
          Tours Du Lịch
        </h1>
        <div
          className="main-hero-image bgs-cover"
          style={{ backgroundImage: `url(/assets/images/hero/hero.jpg)` }}
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
              <select name="destination" id="destination">
                <option value="">Chọn điểm đến</option>
                <option value="dn">Đà Nẵng</option>
                <option value="cd">Côn Đảo</option>
                <option value="hn">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="hl">Hạ Long</option>
                <option value="nb">Ninh Bình</option>
                <option value="pq">Phú Quốc</option>
                <option value="dl">Đà Lạt</option>
                <option value="qt">Quảng Trị</option>
                <option value="kh">Khánh Hòa (Nha Trang)</option>
                <option value="ct">Cần Thơ</option>
                <option value="vt">Vũng Tàu</option>
                <option value="qn">Quảng Ninh</option>
                <option value="la">Lào Cai (Sa Pa)</option>
                <option value="bd">Bình Định (Quy Nhơn)</option>
              </select>
            </div>

            {/* Ngày đi */}
            <div className="filter-item clearfix">
              <div className="icon">
                <i className="fal fa-calendar-alt"></i>
              </div>
              <span className="title">Ngày khởi hành</span>
              <input
                type="text"
                id="start_date"
                name="start_date"
                className="datetimepicker datetimepicker-custom"
                placeholder="Chọn ngày đi"
                readOnly
              />
            </div>

            {/* Ngày về */}
            <div className="filter-item clearfix">
              <div className="icon">
                <i className="fal fa-calendar-alt"></i>
              </div>
              <span className="title">Ngày kết thúc</span>
              <input
                type="text"
                id="end_date"
                name="end_date"
                className="datetimepicker datetimepicker-custom"
                placeholder="Chọn ngày về"
                readOnly
              />
            </div>

            {/* Nút tìm kiếm */}
            <div className="search-button">
              <button className="theme-btn" type="submit">
                <span data-hover="Tìm kiếm">Tìm kiếm</span>
                <i className="far fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
