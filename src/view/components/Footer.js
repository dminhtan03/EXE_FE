import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../assets/css/responsive.css';
import '../../assets/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../assets/css/style.css';

const Footer = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <footer
      className="main-footer bgs-cover overlay rel z-1 pb-25"
      style={{ backgroundImage: `url(/clients/assets/images/backgrounds/footer.jpg)` }}
    >
      <div className="container">
        <div className="footer-top pt-100 pb-30">
          <div className="row justify-content-between">
            <div className="col-xl-5 col-lg-6" data-aos="fade-up">
              <div className="footer-widget footer-text">
                <div className="footer-logo mb-25">
                  <Link to="/">
                    <img src="/clients/assets/images/logos/logo.png" alt="Logo" />
                  </Link>
                </div>
                <p>
                  Chúng tôi biên soạn các hành trình riêng biệt phù hợp với sở thích của bạn, đảm bảo mọi chuyến đi
                  đều liền mạch và làm phong phú thêm những viên ngọc ẩn giấu
                </p>
                <div className="social-style-one mt-15">
                  <a href="https://www.facebook.com/dienne.dev"><i className="fab fa-facebook-f"></i></a>
                  <a href="/contact"><i className="fab fa-youtube"></i></a>
                  <a href="/contact"><i className="fab fa-pinterest"></i></a>
                  <a href="/contact"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-6" data-aos="fade-up" data-aos-delay="50">
              <div className="section-title counter-text-wrap mb-35">
                <h2>Đăng ký nhận bản tin</h2>
                <p>
                  Website <span className="count-text plus" data-speed="3000" data-stop="34500">0</span> trải nghiệm phổ biến nhất mà bạn sẽ nhớ
                </p>
              </div>
              <form className="newsletter-form mb-50">
                <input id="news-email" type="email" placeholder="Email Address" required />
                <button type="submit" className="theme-btn bgc-secondary style-two">
                  <span data-hover="Đăng ký">Đăng ký</span>
                  <i className="fal fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="widget-area pt-95 pb-45">
          <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
            <div className="col col-small" data-aos="fade-up">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Dịch vụ</h5>
                </div>
                <ul className="list-style-three">
                  <li><Link to="/team">Hướng dẫn viên du lịch tốt nhất</Link></li>
                  <li><Link to="/tours">Đặt tour</Link></li>
                  <li><Link to="/tours">Đặt vé</Link></li>
                </ul>
              </div>
            </div>

            <div className="col col-small" data-aos="fade-up" data-aos-delay="50">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Công ty</h5>
                </div>
                <ul className="list-style-three">
                  <li><Link to="/about">Giới thiệu về công ty</Link></li>
                  <li><Link to="/contact">Việc làm và nghề nghiệp</Link></li>
                  <li><Link to="/contact">Liên hệ với chúng tôi</Link></li>
                </ul>
              </div>
            </div>

            <div className="col col-small" data-aos="fade-up" data-aos-delay="100">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Điểm đến</h5>
                </div>
                <ul className="list-style-three">
                  <li><Link to="/destination">Miền Bắc</Link></li>
                  <li><Link to="/destination">Miền Trung</Link></li>
                  <li><Link to="/destination">Miền Nam</Link></li>
                </ul>
              </div>
            </div>

            <div className="col col-small" data-aos="fade-up" data-aos-delay="150">
              <div className="footer-widget footer-links">
                <div className="footer-title">
                  <h5>Thể loại</h5>
                </div>
                <ul className="list-style-three">
                  <li><Link to="/contact">Phiêu lưu</Link></li>
                  <li><Link to="/contact">Tour gia đình</Link></li>
                  <li><Link to="/contact">Tour động vật hoang dã</Link></li>
                </ul>
              </div>
            </div>

            <div className="col col-md-6 col-10 col-small" data-aos="fade-up" data-aos-delay="200">
              <div className="footer-widget footer-contact">
                <div className="footer-title">
                  <h5>Liên hệ</h5>
                </div>
                <ul className="list-style-one">
                  <li><i className="fal fa-map-marked-alt"></i> FPT University</li>
                  <li><i className="fal fa-envelope"></i> <a href="mailto:Anhtraisaybye@gmail.com">Anhtraisaybye@gmail.com</a></li>
                  <li><i className="fal fa-clock"></i> Thứ 2 - Thứ 6, 08am - 05pm</li>
                  <li><i className="fal fa-phone-volume"></i> <a href="tel:+88012334588">+880 (123) 345 88</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div className="footer-bottom pt-20 pb-5">
          <div className="row">
            <div className="col-lg-5">
              <div className="copyright-text text-center text-lg-start">
                <p>@Copy 2025 <Link to="/">Campverse</Link>, All rights reserved</p>
              </div>
            </div>
            <div className="col-lg-7 text-center text-lg-end">
              <ul className="footer-bottom-nav">
                <li><Link to="/about">Điều khoản</Link></li>
                <li><Link to="/about">Chính sách bảo mật</Link></li>
                <li><Link to="/about">Thông báo pháp lý</Link></li>
                <li><Link to="/about">Khả năng truy cập</Link></li>
              </ul>
            </div>
          </div>

          {/* Scroll Top Button */}
          <button className="scroll-top scroll-to-target" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={require('../../assets/images/icons/scroll-up.png')} alt="Scroll Up" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
