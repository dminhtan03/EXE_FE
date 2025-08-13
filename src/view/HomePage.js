import React, { useEffect } from "react";
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import '../assets/css/flaticon.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import BannerHome from "./components/BannerHome";


const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
    <Header/>
    <BannerHome/>
      {/* Form Back Drop */}
      <div className="form-back-drop"></div>

      {/* Destinations Area */}
      <section className="destinations-area bgc-black pt-100 pb-70 rel z-1">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section-title text-white text-center counter-text-wrap mb-70" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                <h2>Khám phá kho báu việt nam cùng Campverse</h2>
                <p>Website<span className="count-text plus" data-speed="3000" data-stop="24080">0</span> phổ biến nhất mà bạn sẽ nhớ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Area */}
      <section className="about-us-area py-100 rpb-90 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="about-us-content rmb-55" data-aos="fade-left" data-aos-duration="1500" data-aos-offset="50">
                <div className="section-title mb-25">
                  <h2>Du lịch với sự tự tin Lý do hàng đầu để chọn công ty chúng tôi</h2>
                </div>
                <p>Chúng tôi sẽ nỗ lực hết mình để biến giấc mơ du lịch của bạn thành hiện thực những viên ngọc ẩn và những điểm tham quan không thể bỏ qua</p>
                <div className="divider counter-text-wrap mt-45 mb-55">
                  <span>Chúng tôi có <span className="count-text plus" data-speed="3000" data-stop="5">0</span> Năm kinh nghiệm</span>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span className="count-text k-plus" data-speed="2000" data-stop="1">0</span>
                      <span className="counter-title">Điểm đến phổ biến</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span className="count-text m-plus" data-speed="3000" data-stop="8">0</span>
                      <span className="counter-title">Khách hàng hài lòng</span>
                    </div>
                  </div>
                </div>
                <a href="destination1.html" className="theme-btn mt-10 style-two">
                  <span data-hover="Khám phá Điểm đến">Khám phá Điểm đến</span>
                  <i className="fal fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6" data-aos="fade-right" data-aos-duration="1500" data-aos-offset="50">
              <div className="about-us-image">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div className="shape" key={i}>
                    <img src={require(`../assets/images/about/shape${i}.png`)} alt={`Shape ${i}`} />
                  </div>
                ))}
                <img src={require('../assets/images/about/about.png')} alt="About" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Area */}
      <section className="popular-destinations-area rel z-1">
        <div className="container-fluid">
          <div className="popular-destinations-wrap br-20 bgc-lighter pt-100 pb-70">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="section-title text-center counter-text-wrap mb-70" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                  <h2>Khám phá các điểm đến phổ biến</h2>
                  <p>Website <span className="count-text plus" data-speed="3000" data-stop="24080">0</span> trải nghiệm phổ biến nhất</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Area */}
      <section className="features-area pt-100 pb-45 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6">
              <div className="features-content-part mb-55" data-aos="fade-left" data-aos-duration="1500" data-aos-offset="50">
                <div className="section-title mb-60">
                  <h2>Trải nghiệm du lịch tuyệt đỉnh mang đến sự khác biệt cho công ty chúng tôi</h2>
                </div>
                <div className="features-customer-box">
                  <div className="image">
                    <img src={require('../assets/images/features/features-box.jpg')} alt="Features" />
                  </div>
                  <div className="content">
                    <div className="feature-authors mb-15">
                      {[1, 2, 3].map((i) => (
                        <img key={i} src={require(`../assets/images/features/feature-author${i}.jpg`)} alt="Author" />
                      ))}
                      <span>4k+</span>
                    </div>
                    <h6>850K+ Khách hàng hài lòng</h6>
                    <div className="divider style-two counter-text-wrap my-25">
                      <span><span className="count-text plus" data-speed="3000" data-stop="5">0</span> Năm</span>
                    </div>
                    <p>Chúng tôi tự hào cung cấp các hành trình được cá nhân hóa</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6" data-aos="fade-right" data-aos-duration="1500" data-aos-offset="50">
              <div className="row pb-25">
                {[
                  "Chinh Phục Cảnh Quan Việt Nam",
                  "Trải Nghiệm Đặc Sắc Việt Nam",
                  "Khám Phá Di Sản Việt Nam",
                  "Vẻ Đẹp Thiên Nhiên Việt"
                ].map((title, i) => (
                  <div className={`col-md-6 ${i === 2 ? "mt-20" : ""}`} key={i}>
                    <div className="feature-item">
                      <div className="icon"><i className="flaticon-tent"></i></div>
                      <div className="content">
                        <h5><a href="/tours">{title}</a></h5>
                        <p>Mô tả ngắn gọn về {title.toLowerCase()}.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Area */}
      <section className="cta-area pt-100 rel z-1">
        <div className="container-fluid">
          <div className="row">
            {[1, 2, 3].map((i, index) => {
              const cta = [
                {
                  category: "Khám Phá Vẻ Đẹp Văn Hóa Việt",
                  title: "Tìm hiểu những giá trị văn hóa độc đáo của các vùng miền Việt Nam.",
                  bg: "cta1.jpg"
                },
                {
                  category: "Bãi biển Sea",
                  title: "Bãi trong xanh dạt dào ở Việt Nam",
                  bg: "cta2.jpg"
                },
                {
                  category: "Thác nước",
                  title: "Thác nước lớn nhất Việt Nam",
                  bg: "cta3.jpg"
                }
              ][index];
              return (
                <div className="col-xl-4 col-md-6" data-aos="zoom-in-down" data-aos-delay={index * 50} data-aos-duration="1500" data-aos-offset="50" key={i}>
                  <div
                    className="cta-item"
                    style={{
                      backgroundImage: `url(${require(`../assets/images/cta/${cta.bg}`)})`
                    }}
                  >
                    <span className="category">{cta.category}</span>
                    <h2>{cta.title}</h2>
                    <a href="/tours" className={`theme-btn style-two ${index !== 1 ? "bgc-secondary" : ""}`}>
                      <span data-hover="Khám phá">Khám phá</span>
                      <i className="fal fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default HomePage;
