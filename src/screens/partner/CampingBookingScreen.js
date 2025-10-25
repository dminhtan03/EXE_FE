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

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Lấy danh sách booking
        const res = await axios.get(
          `http://localhost:8080/api/v1/camping/booking/${campingInforId}`
        );
        const bookingsData = res.data || [];
        setBookings(bookingsData);

        // Lấy tất cả tent theo booking
        const tentPromises = bookingsData.map((b) =>
          axios.get(`http://localhost:8080/api/tents/byTentId/${b.campingTentId}`)
        );

        const tentResponses = await Promise.all(tentPromises);

        // Map tentId -> tentData
        const tentMapData = {};
        tentResponses.forEach((r) => {
          if (r.data && r.data.id) {
            tentMapData[r.data.id] = r.data;
          }
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
  }, [campingInforId]);

  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleString("vi-VN", { hour12: false }) : "-";

  const fmtPrice = (val) =>
    val === null || val === undefined
      ? "-"
      : `${Number(val).toLocaleString("vi-VN")} VND`;

  if (loading) return <p>Đang tải danh sách booking...</p>;
  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>Chưa có booking nào.</p>;

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

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Camping Tent</th>
              <th>Dịch vụ</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => {
              const tent = tentsMap[b.campingTentId] || {};
              return (
                <tr key={b.bookingId}>
                  <td data-label="Booking ID">{b.bookingId}</td>
                  <td data-label="User ID">{b.userId}</td>
                  <td data-label="Camping Tent">{tent.tentName || "-"}</td>
                  <td data-label="Dịch vụ">
                    {b.serviceNames?.length > 0 ? b.serviceNames.join(", ") : "-"}
                  </td>
                  <td data-label="Start Time">{fmtDate(b.startTime)}</td>
                  <td data-label="End Time">{fmtDate(b.endTime)}</td>
                  <td data-label="Total Price">{fmtPrice(b.totalPrice)}</td>
                  <td
                    data-label="Status"
                    className={
                      b.status === "PENDING"
                        ? "status-pending"
                        : b.status === "CONFIRMED"
                        ? "status-confirmed"
                        : "status-cancelled"
                    }
                  >
                    {b.status === "PENDING" ? "⏳ Pending" : b.status === "CONFIRMED" ? "✅ Confirmed" : "❌ Cancelled"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampingBookingScreen;
