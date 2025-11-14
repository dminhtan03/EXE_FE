import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BannerHome from "../../components/partner/BannerHomePartner";
import axios from "axios";
import "./CampingBookingScreen.css";

const CampingBookingScreen = () => {
  const { campingInforId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [tentsMap, setTentsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/v1/camping/booking/${campingInforId}?page=${page}&size=${size}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;
        const bookingsData = data.content || [];
        setBookings(bookingsData);
        setTotalPages(data.totalPages || 0);

        // Lấy thông tin lều
        const tentPromises = bookingsData.map((b) =>
          axios.get(
            `http://localhost:8080/api/tents/byTentId/${b.campingTentId}`
          )
        );
        const tentResponses = await Promise.all(tentPromises);
        const tentMapData = {};
        tentResponses.forEach((r) => {
          if (r.data && r.data.id) tentMapData[r.data.id] = r.data;
        });
        setTentsMap(tentMapData);
      } catch (err) {
        console.error("Lỗi khi load booking:", err);
        setError("Không tải được danh sách booking");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [campingInforId, page, size, refresh]);

  // Format helper
  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleString("vi-VN", { hour12: false }) : "-";
  const fmtPrice = (val) =>
    val === null || val === undefined
      ? "-"
      : `${Number(val).toLocaleString("vi-VN")} VND`;

  // ✅ Hàm cập nhật trạng thái booking theo đúng logic backend
  const handleUpdateStatus = async (bookingId, currentStatus, newStatus) => {
    // Validation theo logic backend
    if (newStatus === "CONFIRMED" && currentStatus !== "PENDING") {
      alert("Chỉ có thể xác nhận booking ở trạng thái PENDING!");
      return;
    }

    if (newStatus === "COMPLETED" && currentStatus !== "CONFIRMED") {
      alert("Chỉ có thể hoàn tất booking ở trạng thái CONFIRMED!");
      return;
    }

    if (newStatus === "CANCELLED" && currentStatus !== "PENDING" && currentStatus !== "CONFIRMED") {
      alert("Chỉ có thể hủy booking ở trạng thái PENDING hoặc CONFIRMED!");
      return;
    }

    const statusMessages = {
      CONFIRMED: "Xác nhận chuyển booking này sang CONFIRMED?",
      COMPLETED: "Xác nhận chuyển booking này sang COMPLETED?",
      CANCELLED: "Xác nhận hủy booking này?",
    };

    if (!window.confirm(statusMessages[newStatus] || "Xác nhận cập nhật trạng thái?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để thực hiện thao tác này!");
        return;
      }

      if (!bookingId) {
        alert("Booking ID không hợp lệ!");
        return;
      }

      // Xác định endpoint dựa trên trạng thái (theo đúng controller)
      let endpoint = "";
      switch (newStatus) {
        case "CONFIRMED":
          // Endpoint đúng là /confirmed (theo controller)
          endpoint = `http://localhost:8080/api/v1/bookings/${bookingId}/confirmed`;
          break;
        case "COMPLETED":
          endpoint = `http://localhost:8080/api/v1/bookings/${bookingId}/completed`;
          break;
        case "CANCELLED":
          endpoint = `http://localhost:8080/api/v1/bookings/${bookingId}/cancel`;
          break;
        default:
          alert("Trạng thái không hợp lệ!");
          return;
      }

      console.log(`Calling PUT ${endpoint} for booking ${bookingId}`);

      const response = await axios.put(
        endpoint, 
        null, // Không có body
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
        }
      );
      
      console.log("Response:", response.data);
      
      const successMessages = {
        CONFIRMED: "Đã chuyển sang CONFIRMED thành công!",
        COMPLETED: "Đã chuyển sang COMPLETED thành công!",
        CANCELLED: "Đã hủy booking thành công!",
      };
      
      alert(successMessages[newStatus] || "Cập nhật trạng thái thành công!");
      setRefresh((r) => !r); // reload danh sách
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      let errorMessage = "Không thể cập nhật trạng thái.";
      
      if (err.response) {
        // Server trả về lỗi
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          errorMessage = data?.message || "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại trạng thái booking.";
        } else if (status === 401) {
          errorMessage = "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.";
        } else if (status === 403) {
          errorMessage = "Bạn không có quyền thực hiện thao tác này.";
        } else if (status === 404) {
          errorMessage = "Không tìm thấy booking.";
        } else if (status === 500) {
          errorMessage = data?.message || "Lỗi server. Vui lòng thử lại sau hoặc liên hệ quản trị viên.";
        } else {
          errorMessage = data?.message || `Lỗi ${status}: ${data?.error || "Unknown error"}`;
        }
      } else if (err.request) {
        errorMessage = "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.";
      } else {
        errorMessage = err.message || "Đã xảy ra lỗi không xác định.";
      }
      
      alert(errorMessage);
    }
  };

  if (loading) return <p>Đang tải danh sách booking...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <BannerHome />
      <div className="container py-4">
        <h2>Danh sách booking</h2>
        <Link
          to={`/seller/camping/${campingInforId}`}
          className="btn btn-secondary mb-3"
        >
          ← Quay lại camping
        </Link>

        {bookings.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            Chưa có booking nào.
          </p>
        ) : (
          <>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Booking No</th>
                  <th>Tên người dùng</th>
                  <th>Lều</th>
                  <th>Dịch vụ</th>
                  <th>Thời gian bắt đầu</th>
                  <th>Thời gian kết thúc</th>
                  <th>Tổng giá</th>
                  <th>Trạng thái</th>
                  <th>Thời gian tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => {
                  const tent = tentsMap[b.campingTentId] || {};
                  return (
                    <tr key={b.bookingId}>
                      <td>{index + 1}</td>
                      <td>{b.userName || "-"}</td>
                      <td>{tent.tentName || "-"}</td>
                      <td>
                        {b.serviceNames?.length > 0
                          ? b.serviceNames.join(", ")
                          : "-"}
                      </td>
                      <td>{fmtDate(b.startTime)}</td>
                      <td>{fmtDate(b.endTime)}</td>
                      <td>{fmtPrice(b.totalPrice)}</td>
                      <td
                        className={
                          b.status === "PENDING"
                            ? "status-pending"
                            : b.status === "CONFIRMED"
                            ? "status-confirmed"
                            : b.status === "COMPLETED"
                            ? "status-completed"
                            : "status-cancelled"
                        }
                      >
                        {b.status === "PENDING"
                          ? "⏳ Đang xử lý"
                          : b.status === "CONFIRMED"
                          ? "✅ Đã xác nhận"
                          : b.status === "COMPLETED"
                          ? "✅ Hoàn tất"
                          : "❌ Đã hủy"}
                      </td>
                      <td>{fmtDate(b.createdAt)}</td>
                      <td>
                        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                          {b.status === "PENDING" && (
                            <>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleUpdateStatus(b.bookingId, b.status, "CONFIRMED")}
                                title="Xác nhận booking (chỉ từ PENDING)"
                              >
                                Xác nhận
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleUpdateStatus(b.bookingId, b.status, "CANCELLED")}
                                title="Hủy booking"
                              >
                                Hủy
                              </button>
                            </>
                          )}
                          {b.status === "CONFIRMED" && (
                            <>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleUpdateStatus(b.bookingId, b.status, "COMPLETED")}
                                title="Hoàn tất booking (chỉ từ CONFIRMED)"
                              >
                                Hoàn tất
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleUpdateStatus(b.bookingId, b.status, "CANCELLED")}
                                title="Hủy booking"
                              >
                                Hủy
                              </button>
                            </>
                          )}
                          {b.status === "COMPLETED" && (
                            <span className="badge bg-success">Đã hoàn tất</span>
                          )}
                          {b.status === "CANCELLED" && (
                            <span className="badge bg-secondary">Đã hủy</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-primary mx-2"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Trang trước
              </button>
              <span>
                Trang {page + 1} / {totalPages}
              </span>
              <button
                className="btn btn-outline-primary mx-2"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Trang sau →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampingBookingScreen;
