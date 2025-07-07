import React, { useEffect } from 'react';

import BannerHome from '../components/BannerHome';

import { Link } from 'react-router-dom';

export default function HomePage({ tours = [], toursPopular = [] }) {
  useEffect(() => {
    window.AOS?.init();
  }, []);

  return (
    <>
      <BannerHome />

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
          <div className="row justify-content-center">
            {tours.map((tour, index) => (
              <div className="col-xxl-3 col-xl-4 col-md-6 mb-4" key={index}>
                <div className="destination-item block_tours" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                  <div className="image">
                    <div className="ratting"><i className="fas fa-star"></i> {tour.rating.toFixed(1)}</div>
                    <a href="#" className="heart"><i className="fas fa-heart"></i></a>
                    <img src={`/assets/images/gallery-tours/${tour.images[0]}`} alt="Destination" />
                  </div>
                  <div className="content">
                    <span className="location"><i className="fal fa-map-marker-alt"></i>{tour.destination}</span>
                    <h5><Link to={`/tour/${tour.tourId}`}>{tour.title}</Link></h5>
                    <span className="time">{tour.time}</span>
                  </div>
                  <div className="destination-footer">
                    <span className="price"><span>{tour.priceAdult.toLocaleString()}</span> VND / người</span>
                    <Link to={`/tour/${tour.tourId}`} className="read-more">Đặt ngay <i className="fal fa-angle-right"></i></Link>
                  </div>
                </div>
              </div>
            ))}
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
                <div className="divider counter-text-wrap mt-45 mb-55"><span>Chúng tôi có <span><span className="count-text plus" data-speed="3000" data-stop="5">0</span> Năm</span> kinh nghiệm</span></div>
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
                <Link to="/destination" className="theme-btn mt-10 style-two">
                  <span data-hover="Khám phá Điểm đến">Khám phá Điểm đến</span>
                  <i className="fal fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6" data-aos="fade-right" data-aos-duration="1500" data-aos-offset="50">
              <div className="about-us-image">
                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                  <div className="shape" key={n}><img src={`/assets/images/about/shape${n}.png`} alt={`Shape ${n}`} /></div>
                ))}
                <img src="/assets/images/about/about.png" alt="About" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
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
            <div className="container">
              <div className="row justify-content-center">
                {toursPopular.map((tour, idx) => (
                  <div className={(idx === 2 || idx === 3) ? 'col-md-6 item' : 'col-xl-3 col-md-6 item'} key={idx}>
                    <div className="destination-item style-two" data-aos-duration="1500" data-aos-offset="50">
                      <div className="image" style={{ maxHeight: 250 }}>
                        <a href="#" className="heart"><i className="fas fa-heart"></i></a>
                        <img src={`/assets/images/gallery-tours/${tour.images[0]}`} alt="Destination" />
                      </div>
                      <div className="content">
                        <h6 className="tour-title"><Link to={`/tour/${tour.tourId}`}>{tour.title}</Link></h6>
                        <span className="time">{tour.time}</span>
                        <Link to={`/tour/${tour.tourId}`} className="more"><i className="fas fa-chevron-right"></i></Link>
                      </div>
                    </div>
                  </div>
                ))}
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
                    <img src="/assets/images/features/features-box.jpg" alt="Features" />
                  </div>
                  <div className="content">
                    <div className="feature-authors mb-15">
                      {[1,2,3].map(n => (
                        <img key={n} src={`/assets/images/features/feature-author${n}.jpg`} alt="Author" />
                      ))}
                      <span>4k+</span>
                    </div>
                    <h6>850K+ Khách hàng hài lòng</h6>
                    <div className="divider style-two counter-text-wrap my-25"><span><span className="count-text plus" data-speed="3000" data-stop="5">0</span> Năm</span></div>
                    <p>Chúng tôi tự hào cung cấp các hành trình được cá nhân hóa</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6" data-aos="fade-right" data-aos-duration="1500" data-aos-offset="50">
              <div className="row pb-25">
                {[...Array(4)].map((_, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="feature-item mt-20">
                      <div className="icon"><i className="flaticon-tent"></i></div>
                      <div className="content">
                        <h5><Link to="/tours">Tên Điểm nhấn {i+1}</Link></h5>
                        <p>Mô tả ngắn gọn về điểm nhấn này.</p>
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
            {[1,2,3].map(n => (
              <div className="col-xl-4 col-md-6" data-aos="zoom-in-down" data-aos-delay={(n-1)*50} data-aos-duration="1500" data-aos-offset="50" key={n}>
                <div className="cta-item" style={{ backgroundImage: `url(/assets/images/cta/cta${n}.jpg)` }}>
                  <span className="category">Tiêu đề CTA {n}</span>
                  <h2>Mô tả CTA {n}</h2>
                  <Link to="/tours" className="theme-btn style-two bgc-secondary">
                    <span data-hover="Khám phá">Khám phá</span>
                    <i className="fal fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
