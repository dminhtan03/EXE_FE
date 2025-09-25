// src/screens/CampingDetailScreen.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BannerHome from "../components/BannerHome";
import axios from "axios";

const CampingDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [camping, setCamping] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👉 OwnerId tạm thời hardcode
  const ownerId = "a7ea138e-3ba5-42a3-9686-2c7f9a9d57f4";

  useEffect(() => {
    const fetchCamping = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/camping", {
          params: { ownerId },
        });

        const found = res.data.find((c) => String(c.id) === id);
        setCamping(found || null);
      } catch (error) {
        console.error("Lỗi khi load camping:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamping();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa camping này?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/camping/delete/${id}`);
      alert("Xóa camping thành công!");
      navigate("/managercamping"); // chuyển về trang danh sách
    } catch (error) {
      console.error("Lỗi khi xóa camping:", error);
      alert("Xóa camping thất bại. Thử lại sau.");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (!camping) return <p>Không tìm thấy camping.</p>;

  return (
    <>
      <BannerHome />
      <div className="container py-5">
        <div className="d-flex  mb-3">
          <Link to="/managercamping" className="btn btn-secondary me-2">
            ← Quay lại danh sách
          </Link>
           <button
              onClick={() => navigate(`/createCamp/${id}`)}
              className="btn btn-warning me-2"
            >
              Cập nhật Camping
            </button>
          <button onClick={handleDelete} className="btn btn-danger ">
            Xóa Camping
          </button>
        </div>

        <div className="row">
          <div className="col-md-6">
            {camping.thumbnail && (
              <img
                src={camping.thumbnail}
                alt={camping.name}
                className="img-fluid rounded shadow camping-img"
              />
            )}
          </div>
          <div className="col-md-6">
            <h2>{camping.name}</h2>
            <p>
              <i className="fal fa-map-marker-alt"></i> {camping.address}
            </p>
            <p>
              <strong>Mô tả:</strong> {camping.description}
            </p>
            <p>
              <strong>Giá cơ bản:</strong>{" "}
              {camping.basePrice?.toLocaleString("vi-VN")} VND
            </p>
            <p>
              <strong>Doanh thu:</strong>{" "}
              {camping.revenue
                ? camping.revenue.toLocaleString("vi-VN")
                : "Chưa có dữ liệu"}{" "}
              VND
            </p>

            <div className="mt-5">
              <h4>Dịch vụ đi kèm</h4>
              {camping.services && camping.services.length > 0 ? (
                <ul className="list-group">
                  {camping.services.map((service) => (
                    <li
                      key={service.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {service.serviceName}
                      <span className="badge bg-primary rounded-pill">
                        {service.price?.toLocaleString("vi-VN")} VND
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Không có dịch vụ đi kèm.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampingDetailScreen;
