import React, { useState } from "react";
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";
import "../assets/css/css-login/style2.css";
import Header from "./components/HeaderLogin";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContent";
import { login } from "../api/authService"; // Giả sử bạn có một hàm login trong authService
const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      navigate("/home");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    // e.preventDefault();
    // const username = document.getElementById("username_register").value;
    // const email = document.getElementById("email_register").value;
    // const password = document.getElementById("password_register").value;
    // const re_pass = document.getElementById("re_pass").value;
    // if (password !== re_pass) {
    //   alert("Mật khẩu nhập lại không khớp");
    //   return;
    // }
    // try {
    //   const res = await fetch("http://localhost:5000/api/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, email, password }),
    //   });
    //   const data = await res.json();
    //   if (res.ok && data.success) {
    //     alert("Đăng ký thành công! Vui lòng đăng nhập.");
    //     setIsLogin(true);
    //   } else {
    //     alert(data.message || "Đăng ký thất bại");
    //   }
    // } catch (error) {
    //   console.error("Lỗi khi gửi đăng ký:", error);
    //   alert("Lỗi kết nối đến máy chủ");
    // }
  };

  return (
    <>
      <Header />
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
                        src={require("../assets/images/login/signin-image.jpg")}
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
                      <div className="form-group mb-3">
                        <label
                          htmlFor="username_register"
                          className="form-label"
                        >
                          <i className="zmdi zmdi-account material-icons-name me-2"></i>
                        </label>
                        <input
                          type="text"
                          name="username_register"
                          id="username_register"
                          placeholder="Tên tài khoản"
                          required
                          className="form-control"
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_username_regis"
                        ></div>
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="email_register" className="form-label">
                          <i className="zmdi zmdi-email me-2"></i>
                        </label>
                        <input
                          type="email"
                          name="email_register"
                          id="email_register"
                          placeholder="Email"
                          required
                          className="form-control"
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_email_regis"
                        ></div>
                      </div>

                      <div className="form-group mb-3">
                        <label
                          htmlFor="password_register"
                          className="form-label"
                        >
                          <i className="zmdi zmdi-lock me-2"></i>
                        </label>
                        <input
                          type="password"
                          name="password_register"
                          id="password_register"
                          placeholder="Mật khẩu"
                          required
                          className="form-control"
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_password_regis"
                        ></div>
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="re_pass" className="form-label">
                          <i className="zmdi zmdi-lock-outline me-2"></i>
                        </label>
                        <input
                          type="password"
                          name="re_pass"
                          id="re_pass"
                          placeholder="Nhập lại mật khẩu"
                          required
                          className="form-control"
                        />
                        <div
                          className="invalid-feedback"
                          id="validate_repass"
                        ></div>
                      </div>

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
                        src={require("../assets/images/login/signup-image.jpg")}
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
      <Footer />
    </>
  );
};

export default AuthPage;
