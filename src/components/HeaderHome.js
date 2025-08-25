import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfile } from "../api/authService";

const HeaderHome = () => {
  const location = useLocation();
  const { logout } = useAuth(); // dùng logout ở AuthContext
  const [showWelcome, setShowWelcome] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // lấy token sau login
        if (!token) {
          setProfile(null);
          return;
        }
        const res = await getProfile(token);
        // backend có Response.ofSucceeded -> dữ liệu thực nằm trong res.data
        setProfile(res.data);
        setShowWelcome(true);
        const timer = setTimeout(() => setShowWelcome(false), 3000);
        return () => clearTimeout(timer);
      } catch (err) {
        setError("Không thể lấy thông tin profile");
        setProfile(null);
      }
    };

    fetchProfile();
  }, []);

  const isActive = (path) => (currentPath === path ? "active" : "");
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="main-header header-one white-menu menu-absolute">
      <div className="header-upper py-30 rpy-0">
        <div className="container-fluid clearfix">
          <div className="header-inner rel d-flex align-items-center">
            {/* logo */}
            <div className="logo-outer">
              <div className="logo">
                <Link to="/">
                  <img src="/assets/images/logos/logo3.png" alt="Logo" />
                </Link>
              </div>
            </div>

            {/* menu */}
            <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo">
                    <Link to="/">
                      <img
                        src="/assets/images/logos/logo3 copy 2.png"
                        alt="Logo"
                        style={{ width: "150px", height: "70px" }}
                      />
                    </Link>
                  </div>
                </div>

                <div className="navbar-collapse collapse clearfix">
                  <ul className="navigation clearfix">
                    <li className={isActive("/")}>
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className={isActive("/about")}>
                      <Link to="/about">Giới thiệu</Link>
                    </li>
                    <li className={isActive("/experience")}>
                      <Link to="/experience">Kinh Nghiệm</Link>
                    </li>
                    <li className={isActive("/tours")}>
                      <Link to="/tours">Điểm đến</Link>
                    </li>
                    <li className={isActive("/service")}>
                      <Link to="/service">Dịch Vụ</Link>
                    </li>
                    <li className={isActive("/contact")}>
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            {/* search + dropdown */}
            <div className="menu-btns py-10">
              <Link to="/tours" className="theme-btn style-two bgc-secondary">
                <span data-hover="Đặt Ngay">Book Now</span>
                <i className="fal fa-arrow-right"></i>
              </Link>
              <div className="menu-sidebar">
                <li className="drop-down">
                  <button
                    className="dropdown-toggle bg-transparent"
                    onClick={toggleDropdown}
                    style={{ color: "white" }}
                  >
                    {profile?.avatar ? (
                      <img
                        className="img-account-profile rounded-circle"
                        src={profile.avatar}
                        style={{ width: 36, height: 36 }}
                        alt="avatar"
                      />
                    ) : (
                      <i
                        className="bx bxs-user bx-tada"
                        style={{ fontSize: 36, color: "white" }}
                      ></i>
                    )}
                  </button>

                  {showDropdown && (
                    <ul
                      className="dropdown-menu show"
                      id="dropdownMenu"
                      style={{ position: "absolute", top: "50px", right: 0 }}
                    >
                      {profile ? (
                        <>
                          <li>
                            <Link
                              to="/profile"
                              onClick={() => setShowDropdown(false)}
                            >
                              Thông tin cá nhân
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/my-bookings"
                              onClick={() => setShowDropdown(false)}
                            >
                              Camping đã đặt
                            </Link>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                logout();
                                localStorage.removeItem("token");
                                setProfile(null);
                                setShowDropdown(false);
                              }}
                            >
                              Đăng xuất
                            </button>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link
                            to="/login"
                            onClick={() => setShowDropdown(false)}
                          >
                            Đăng nhập
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}

                  {profile && showWelcome && (
                    <div className="welcome-banner">
                      👋 Xin chào {profile.firstName} {profile.lastName}!
                    </div>
                  )}
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
