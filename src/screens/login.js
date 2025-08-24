import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../components/HeaderLogin";
import FooterLogin from "../components/FooterHome";
import { login } from "../api/authService";
import { register } from "../api/userSevices";
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";

const AuthPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // mặc định USER
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // để toggle login/register
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(email, password);
      console.log("Login success:", res);
      // Điều hướng sau khi login thành công
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await register(
        firstName,
        lastName,
        phoneNumber,
        address,
        department,
        email,
        gender,
        password,
        role
      );

      if (res) {
        console.log("Register success:", res);
        localStorage.setItem("registeredEmail", email); // lưu email đã đăng ký
        navigate("/verify-otp"); // hoặc setIsLogin(true) nếu muốn ở lại form login
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderLogin />
      <div
        className="login-template"
        style={{
          paddingTop: "100px",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <div className="main">
          {isLogin ? (
            <section className="sign-in show">
              <div className="container">
                <div className="signin-content row align-items-center">
                  <div className="signin-image col-md-6 text-center">
                    <figure>
                      <img
                        src="/assets/images/login/signin-image.jpg"
                        alt="sign in"
                        className="img-fluid"
                      />
                    </figure>
                    <button
                      className="signup-image-link btn btn-link"
                      onClick={toggleForm}
                    >
                      Tạo tài khoản
                    </button>
                  </div>

                  <div className="signin-form col-md-6">
                    <h2 className="form-title">Đăng nhập</h2>
                    <form onSubmit={handleLogin} className="login-form mt-4">
                      <div className="form-group mb-3">
                        <label htmlFor="username_login" className="form-label">
                          <i className="zmdi zmdi-account material-icons-name me-2"></i>
                        </label>
                        <input
                          type="text"
                          name="username_login"
                          id="username_login"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="form-control"
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_username"
                        ></div>
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="password_login" className="form-label">
                          <i className="zmdi zmdi-lock me-2"></i>
                        </label>
                        <input
                          type="password"
                          name="password_login"
                          id="password_login"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="form-control"
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_password"
                        ></div>
                      </div>

                      {error && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {error}
                        </p>
                      )}

                      <div className="form-group form-button">
                        <input
                          type="submit"
                          className="btn btn-primary w-100"
                          value={loading ? "Đang đăng nhập..." : "Đăng nhập"}
                          disabled={loading}
                        />
                      </div>
                    </form>

                    <div className="social-login mt-4 text-center">
                      <span className="social-label">Hoặc đăng nhập bằng</span>
                      <ul className="socials list-inline mt-2">
                        <li className="list-inline-item me-3">
                          <a href="#">
                            <i className="zmdi zmdi-facebook zmdi-hc-2x"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="/auth/google">
                            <i className="zmdi zmdi-google zmdi-hc-2x"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="signup">
              <div className="container">
                <div className="signup-content row align-items-center">
                  <div className="signup-form col-md-6">
                    <h2 className="form-title">Đăng ký</h2>
                    <form
                      onSubmit={handleRegister}
                      className="register-form mt-4"
                    >
                      {/* First Name */}
                      <div className="form-group mb-3">
                        <label htmlFor="firstName" className="form-label">
                          <i className="zmdi zmdi-account me-2"></i>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          required
                          className="form-control"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_firstName"
                        ></div>
                      </div>

                      {/* Last Name */}
                      <div className="form-group mb-3">
                        <label htmlFor="lastName" className="form-label">
                          <i className="zmdi zmdi-account-circle me-2"></i>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          required
                          className="form-control"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_lastName"
                        ></div>
                      </div>

                      {/* Phone Number */}
                      <div className="form-group mb-3">
                        <label htmlFor="phoneNumber" className="form-label">
                          <i className="zmdi zmdi-phone me-2"></i>
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="Phone Number"
                          required
                          className="form-control"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_phoneNumber"
                        ></div>
                      </div>

                      {/* Address */}
                      <div className="form-group mb-3">
                        <label htmlFor="address" className="form-label">
                          <i className="zmdi zmdi-pin me-2"></i>
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Address"
                          required
                          className="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_address"
                        ></div>
                      </div>

                      {/* Department */}
                      <div className="form-group mb-3">
                        <label htmlFor="department" className="form-label">
                          <i className="zmdi zmdi-city me-2"></i>
                        </label>
                        <input
                          type="text"
                          name="department"
                          id="department"
                          placeholder="Department"
                          required
                          className="form-control"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_department"
                        ></div>
                      </div>

                      {/* Email */}
                      <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="zmdi zmdi-email me-2"></i>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          required
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_email"
                        ></div>
                      </div>

                      {/* Gender */}
                      <div className="form-group mb-3">
                        <label htmlFor="gender" className="form-label">
                          <i className="zmdi zmdi-male-female me-2"></i>
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          className="form-select"
                          required
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">-- Select Gender --</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                        <div
                          className="invalid-feedback"
                          id="validate_gender"
                        ></div>
                      </div>

                      {/* Password */}
                      <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">
                          <i className="zmdi zmdi-lock me-2"></i>
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          required
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_password"
                        ></div>
                      </div>

                      {/* Confirm Password */}
                      <div className="form-group mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          <i className="zmdi zmdi-lock-outline me-2"></i>
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          required
                          className="form-control"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_confirmPassword"
                        ></div>
                      </div>

                      {/* Submit */}
                      <div className="form-group form-button">
                        <input
                          type="submit"
                          className="btn btn-success w-100"
                          value="Đăng ký"
                        />
                      </div>
                    </form>
                  </div>

                  <div className="signup-image col-md-6 text-center">
                    <figure>
                      <img
                        src="/assets/images/login/signup-image.jpg"
                        alt="sign up"
                        className="img-fluid"
                      />
                    </figure>
                    <button
                      className="signup-image-link btn btn-link"
                      onClick={toggleForm}
                    >
                      Tôi đã có tài khoản rồi
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      <FooterLogin />
    </>
  );
};

export default AuthPage;
