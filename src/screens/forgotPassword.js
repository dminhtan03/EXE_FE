import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resendOTP, activeAccount, forgotPassword } from "../api/userSevices";

const ForgotPasswordPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email) {
      setError("Vui lòng nhập địa chỉ email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ");
      return;
    }

    setIsLoading(true);

    try {
      // Mock success response
      const res = await forgotPassword(email);

      if (res) {
        setIsEmailSent(true);
        setSuccess("Email khôi phục mật khẩu đã được gửi thành công!");
        navigate("/verify-otp"); // truyền email qua để verify OTP
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setEmail("");
    setIsEmailSent(false);
    setError("");
    setSuccess("");
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  };

  const cardStyle = {
    maxWidth: "450px",
    borderRadius: "1rem",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const iconContainerStyle = {
    width: "5rem",
    height: "5rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    backdropFilter: "blur(10px)",
  };

  if (isEmailSent) {
    return (
      <div
        className="d-flex align-items-center justify-content-center p-4"
        style={containerStyle}
      >
        <div className="card bg-white" style={cardStyle}>
          <div className="card-body p-5">
            {/* Success State */}
            <div className="text-center">
              {/* Success Icon */}
              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: "5rem",
                  height: "5rem",
                  backgroundColor: "#d4edda",
                  borderRadius: "50%",
                }}
              >
                <svg width="36" height="36" fill="#28a745" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="h3 fw-bold text-dark mb-3">Email đã được gửi!</h2>
              <p className="text-muted mb-4">
                Chúng tôi đã gửi link khôi phục mật khẩu đến email:
                <br />
                <strong className="text-primary">{email}</strong>
              </p>

              <div className="alert alert-info" role="alert">
                <div className="d-flex align-items-center">
                  <span className="me-2">💡</span>
                  <div className="text-start">
                    <strong>Lưu ý:</strong>
                    <ul className="mb-0 mt-1" style={{ fontSize: "0.9rem" }}>
                      <li>Kiểm tra cả thư mục spam/junk</li>
                      <li>Link có hiệu lực trong 30 phút</li>
                      <li>Chỉ sử dụng được 1 lần</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate("/login")}
                >
                  Quay lại đăng nhập
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  Gửi lại email khác
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center p-4"
      style={containerStyle}
    >
      <div className="card bg-white" style={cardStyle}>
        <div className="card-body p-5">
          {/* Header */}
          <div className="text-center mb-4">
            {/* Icon */}
            <div
              className="d-flex align-items-center justify-content-center mx-auto mb-4"
              style={iconContainerStyle}
            >
              <svg width="40" height="40" fill="#667eea" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l-1.13-1.13c.08-.27.12-.55.12-.83 0-1.93-1.57-3.5-3.5-3.5S8.75 10.57 8.75 12.5s1.57 3.5 3.5 3.5c.28 0 .56-.04.83-.12l1.13 1.13C13.75 16.9 12.9 17 12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>

            <h2 className="h3 fw-bold text-dark mb-2">Quên mật khẩu?</h2>
            <p className="text-muted">
              Không sao! Nhập email của bạn và chúng tôi sẽ gửi OTP khôi phục
              mật khẩu.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-semibold">
                Địa chỉ Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  className={`form-control border-start-0 ${
                    error ? "border-danger" : success ? "border-success" : ""
                  }`}
                  id="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  disabled={isLoading}
                  style={{
                    fontSize: "1rem",
                    padding: "0.75rem 1rem",
                  }}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger" role="alert">
                <div className="d-flex align-items-center">
                  <span className="me-2">⚠️</span>
                  {error}
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="alert alert-success" role="alert">
                <div className="d-flex align-items-center">
                  <span className="me-2">✅</span>
                  {success}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="d-grid mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-lg ${
                  isLoading ? "btn-secondary" : "btn-primary"
                }`}
                style={{ padding: "0.75rem" }}
              >
                {isLoading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Đang gửi...
                  </div>
                ) : (
                  <>📧 Gửi link khôi phục</>
                )}
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="text-center">
            <button
              type="button"
              className="btn btn-link text-decoration-none p-0"
              onClick={() => navigate("/login")}
              disabled={isLoading}
            >
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="me-1"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Quay lại đăng nhập
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-4 pt-4 border-top">
            <div className="text-center">
              <small className="text-muted">
                Cần hỗ trợ? Liên hệ{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-decoration-none"
                >
                  campverse8386@gmail.com
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
