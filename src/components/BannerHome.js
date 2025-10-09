import React, { useEffect, useRef } from "react";

export default function BannerHome() {
  const formRef = useRef();

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    const loadScripts = async () => {
      try {
        await loadScript("/assets/js/jquery.datetimepicker.full.min.js");
        await loadScript("/assets/js/aos.js");

        if (window.$) {
          window.$(".datetimepicker").datetimepicker({
            format: "d/m/Y", // format dd/MM/yyyy
            timepicker: false, // chỉ chọn ngày
          });
        }

        if (window.AOS) {
          window.AOS.init();
        }
      } catch (error) {
        console.error("Failed to load script:", error);
      }
    };

    loadScripts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const destination = formData.get("destination");
    const startDateStr = formData.get("start_date");
    const endDateStr = formData.get("end_date");

    // Chỉ log ra để test, không gọi API
    console.log("Form submitted:", {
      destination,
      startDateStr,
      endDateStr,
    });
  };

  return (
    <section className="hero-area bgc-black pt-200 rpt-120 rel z-2">
      <div className="container-fluid" style={{ marginBottom: "40px" }}>
        <h1
          className="hero-title"
          style={{ marginTop: "100px" }}
          data-aos="flip-up"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-offset="50"
        >
          CAMPVERSE
        </h1>
        <div
          className="main-hero-image bgs-cover"
          style={{ backgroundImage: `url(/assets/images/hero/hero.jpg)` }}
        ></div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} id="search_form">
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
                <option value="Hà Nội">Hà Nội</option>
                <option value="Sóc Sơn">Sóc Sơn (Hà Nội)</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Bắc Giang">Bắc Giang</option>
                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                <option value="Thái Bình">Thái Bình</option>
                <option value="Nam Định">Nam Định</option>
                <option value="Ninh Bình">Ninh Bình</option>
                <option value="Hòa Bình">Hòa Bình</option>
                <option value="Phú Thọ">Phú Thọ</option>
                <option value="Hưng Yên">Hưng Yên</option>
                <option value="Hà Nam">Hà Nam</option>
                <option value="Quảng Ninh">Quảng Ninh (Hạ Long)</option>
                <option value="Lạng Sơn">Lạng Sơn</option>
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
