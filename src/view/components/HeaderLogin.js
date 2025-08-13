import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../../assets/css/style.css';
import '../../assets/css/css-login/style2.css';
import '../../assets/css/aos.css';
import '../../assets/css/slick.min.css';
import '../../assets/css/fontawesome-5.14.0.min.css';
import 'boxicons/css/boxicons.min.css';
import logo from '../../assets/images/logos/logo3.png';

const HeaderLogin = ({ isLoggedIn, username, avatar }) => {
  const location = useLocation();

  // Thêm hiệu ứng scroll sticky
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.main-header');
      if (window.scrollY > 100) {
        header.classList.add('fixed-header');
      } else {
        header.classList.remove('fixed-header');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname === path;
  };

  return (
    <header className="main-header header-one">
      <div className="header-upper bg-white py-30 rpy-0">
        <div className="container-fluid clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="Logo" title="Logo" />
                </Link>
              </div>
            </div>

            <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo">
                    <Link to="/">
                      <img
                        src={require('../../assets/images/logos/logo-two.png')}
                        alt="Logo"
                        title="Logo"
                      />
                    </Link>
                  </div>

                  <button
                    type="button"
                    className="navbar-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div className="navbar-collapse collapse">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navigation">
                    <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                      <Link className="nav-link" to="/">Trang chủ</Link>
                    </li>

                    <li className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
                      <Link className="nav-link" to="/about">Giới thiệu</Link>
                    </li>

                    <li className={`nav-item dropdown ${['/tours', '/team', '/tour-detail'].some(path => location.pathname.includes(path)) ? 'active' : ''}`}>
                      <Link className="nav-link dropdown-toggle" to="/tours" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tours
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/tours">Tours</Link></li>
                        <li><Link className="dropdown-item" to="/team">Hướng dẫn viên</Link></li>
                      </ul>
                    </li>

                    <li className={`nav-item ${isActive('/experience') ? 'active' : ''}`}>
                      <Link className="nav-link" to="/experience">Trải nghiệm</Link>
                    </li>

                    <li className={`nav-item ${isActive('/destination') ? 'active' : ''}`}>
                      <Link className="nav-link" to="/destination">Điểm đến</Link>
                    </li>

                    <li className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
                      <Link className="nav-link" to="/shop">Mua sắm</Link>
                    </li>

                    <li className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>
                      <Link className="nav-link" to="/contact">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="menu-btns py-10">
              <Link to="/tours" className="theme-btn style-two bgc-secondary">
                <span data-hover="Đặt Ngay">Book Now</span>
                <i className="fal fa-arrow-right"></i>
              </Link>

              <div className="dropdown">
                <button
                  className="dropdown-toggle bg-transparent border-0"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: 'white' }}
                >
                  {isLoggedIn ? (
                    <img
                      src={avatar || require('../../assets/images/user-profile/user_avatar.jpg')}
                      alt="Avatar"
                      className="img-account-profile rounded-circle"
                      style={{ width: 36, height: 36 }}
                    />
                  ) : (
                    <i className="bx bxs-user bx-tada" style={{ fontSize: 36, color: 'white' }}></i>
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  {isLoggedIn ? (
                    <>
                      <li><Link className="dropdown-item" to="/user-profile">Thông tin cá nhân</Link></li>
                      <li><Link className="dropdown-item" to="/my-tours">Tour đã đặt</Link></li>
                      <li><Link className="dropdown-item" to="/logout">Đăng xuất</Link></li>
                    </>
                  ) : (
                    <li><Link className="dropdown-item" to="/login">Đăng nhập</Link></li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLogin;