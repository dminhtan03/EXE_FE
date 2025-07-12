import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderHome = ({ user }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path ? 'active' : '';

  return (
    <header className="main-header header-one white-menu menu-absolute">
      <div className="header-upper py-30 rpy-0">
        <div className="container-fluid clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
              <Link to="/">
                <img
                  src="/assets/images/logos/logo3 copy 2.png"
                  alt="Logo"
                  title="Logo"
                  style={{ width: '150px', height: '70px' }}
                />
              </Link>
              </div>
            </div>

            <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo">
                    <Link to="/">
                      <img src="/clients/assets/images/logos/logo3 copy 2.png" alt="Logo" title="Logo" />
                    </Link>
                  </div>
                  <button type="button" className="navbar-toggle" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div className="navbar-collapse collapse clearfix">
                  <ul className="navigation clearfix">
                    <li className={isActive('/')}> <Link to="/">Trang chủ</Link></li>
                    <li className={isActive('/about')}> <Link to="/about">Giới thiệu</Link></li>
                    
                    {/* <li className={`dropdown ${['/tours', '/team'].includes(currentPath) ? 'active' : ''}`}>
                       <a href="#">Tours</a>
                      <ul>
                        <li><Link to="/tours">Tours</Link></li>
                        <li><Link to="/team">Hướng dẫn viên</Link></li>
                      </ul>
                    </li> */}
                    <li className={isActive('/experience')}> <Link to="/experience">Kinh Nghiệm</Link></li>
                    <li className={isActive('/destination')}> <Link to="/tours">Điểm đến</Link></li>
                     <li className={isActive('/service')}> <Link to="/service">Dịch Vụ</Link></li>
                    <li className={isActive('/contact')}> <Link to="/contact">Liên hệ</Link></li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="nav-search">
              <button className="far fa-search"></button>
              <form action="/search-voice-text" className="hide" method="GET">
                <input type="text" name="keyword" placeholder="Search" className="searchbox" required />
                <i className="fa fa-microphone" style={{ margin: '0 16px' }} id="voice-search"></i>
                <button type="submit" className="searchbutton far fa-search"></button>
              </form>
            </div>

            <div className="menu-btns py-10">
              <Link to="/tours" className="theme-btn style-two bgc-secondary">
                <span data-hover="Đặt Ngay">Book Now</span>
                <i className="fal fa-arrow-right"></i>
              </Link>
              <div className="menu-sidebar">
                <li className="drop-down">
                  <button className="dropdown-toggle bg-transparent" id="userDropdown" style={{ color: 'white' }}>
                    {user?.avatar ? (
                      <img className="img-account-profile rounded-circle" src={user.avatar} style={{ width: 36, height: 36 }} alt="avatar" />
                    ) : (
                      <i className='bx bxs-user bx-tada' style={{ fontSize: 36, color: 'white' }}></i>
                    )}
                  </button>
                  <ul className="dropdown-menu" id="dropdownMenu">
                    {user?.username ? (
                      <>
                        <li><Link to="/profile">Thông tin cá nhân</Link></li>
                        <li><Link to="/my-tours">Tour đã đặt</Link></li>
                        <li><Link to="/logout">Đăng xuất</Link></li>
                      </>
                    ) : (
                      <li><Link to="/login">Đăng nhập</Link></li>
                    )}
                  </ul>
                </li>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
