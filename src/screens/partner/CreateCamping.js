import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CreateCamping.css";
import BannerHome from "../../components/BannerHome";

const CLOUDINARY_CLOUD_NAME = "dex1n6s6f";
const CLOUDINARY_UPLOAD_PRESET = "uploadCampverse";

const CreateCamping = () => {
  const { campingId } = useParams();
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [campingSites, setCampingSites] = useState([]);
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : "guest";

  useEffect(() => {
    const fetchCampingSites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/camping-sites"
        );
        setCampingSites(res.data || []);
      } catch (err) {
        console.error("Error fetching camping sites:", err);
      }
    };
    fetchCampingSites();
  }, []);

  const [formData, setFormData] = useState({
    userId,
    campingSiteId: "",
    name: "",
    address: "",
    description: "",
    basePrice: "",
    capacity: "",
    thumbnail: "",
    active: true,
    services: [],
    tents: [],
    galleries: [],
  });

  const [newService, setNewService] = useState({ serviceName: "", price: "" });
  const [newTent, setNewTent] = useState({
    tentName: "",
    capacity: "",
    pricePerNight: "",
    quantity: "",
    thumbnail: "",
  });

  const [uploading, setUploading] = useState({
    thumbnail: false,
    gallery: false,
    tentThumbnail: false,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/service");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!campingId) return;

    const fetchCamping = async () => {
      try {
        const [campingRes, serviceRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/v1/camping/${campingId}`),
          axios.get("http://localhost:8080/api/v1/service"),
        ]);

        const serviceList = serviceRes.data;
        const campingData = campingRes.data;

        const updatedServices = (campingData.services || []).map((s) => {
          const match = serviceList.find((srv) => srv.id === s.serviceId);
          return {
            ...s,
            serviceName: match ? match.serviceName : s.serviceName || "Unknown",
          };
        });

        setFormData({ ...campingData, services: updatedServices });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCamping();
  }, [campingId]);

  // ✅ CHỈ CHO PHÉP NHẬP SỐ DƯƠNG
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "number") {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue <= 0) {
        setFormData((prev) => ({ ...prev, [name]: "" }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddService = () => {
    if (!newService.serviceName.trim()) return alert("Nhập tên dịch vụ mới!");
    const price = parseFloat(newService.price);
    if (isNaN(price) || price <= 0) {
      return alert("Giá dịch vụ phải là số dương lớn hơn 0!");
    }

    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          customName: newService.serviceName,
          price,
        },
      ],
    }));
    setNewService({ serviceName: "", price: "" });
  };

  const handleAddTent = () => {
    if (!newTent.tentName.trim()) return alert("Nhập tên lều!");
    const capacity = Number(newTent.capacity);
    const pricePerNight = Number(newTent.pricePerNight);
    const quantity = Number(newTent.quantity);

    if ([capacity, pricePerNight, quantity].some((n) => isNaN(n) || n <= 0)) {
      return alert(
        "Các giá trị Sức chứa, Giá mỗi đêm và Số lượng phải lớn hơn 0!"
      );
    }

    setFormData((prev) => ({
      ...prev,
      tents: [
        ...prev.tents,
        {
          ...newTent,
          capacity,
          pricePerNight,
          quantity,
        },
      ],
    }));
    setNewTent({
      tentName: "",
      capacity: "",
      pricePerNight: "",
      quantity: "",
      thumbnail: "",
    });
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleUploadImage = async (file) => {
    if (!file) {
      alert("Vui lòng chọn file ảnh!");
      return null;
    }

    if (!file.type.startsWith("image/")) {
      alert("File phải là ảnh!");
      return null;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Kích thước ảnh không được vượt quá 10MB!");
      return null;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      return res.data?.secure_url || null;
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Lỗi khi upload ảnh!");
      return null;
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, thumbnail: true }));

    try {
      const imageUrl = await handleUploadImage(file);
      if (imageUrl) setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
    } finally {
      setUploading((prev) => ({ ...prev, thumbnail: false }));
      e.target.value = "";
    }
  };

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading((prev) => ({ ...prev, gallery: true }));

    try {
      const imageUrls = await Promise.all(files.map(handleUploadImage));
      const validUrls = imageUrls.filter(Boolean);
      if (validUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          galleries: [
            ...prev.galleries,
            ...validUrls.map((url) => ({ imageUrl: url })),
          ],
        }));
      }
    } finally {
      setUploading((prev) => ({ ...prev, gallery: false }));
      e.target.value = "";
    }
  };

  const handleTentThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, tentThumbnail: true }));

    try {
      const imageUrl = await handleUploadImage(file);
      if (imageUrl) setNewTent((prev) => ({ ...prev, thumbnail: imageUrl }));
    } finally {
      setUploading((prev) => ({ ...prev, tentThumbnail: false }));
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = campingId
        ? `http://localhost:8080/api/v1/camping/update/${campingId}`
        : "http://localhost:8080/api/v1/camping";
      const method = campingId ? "put" : "post";

      const res = await axios[method](api, formData);

      if (res.status === 200 || res.status === 201) {
        setMessage(campingId ? "Cập nhật thành công!" : "Tạo mới thành công!");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (!campingId) {
          setFormData({
            userId,
            campingSiteId: "",
            name: "",
            address: "",
            description: "",
            basePrice: "100000",
            capacity: "",
            thumbnail: "",
            active: true,
            services: [],
            tents: [],
            galleries: [],
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi lưu camping.");
    }
  };

  return (
    <>
      <BannerHome />
      <div className="create-camping-container">
        <Link to="/seller/managercamping" className="btn btn-secondary">
          ← Quay lại
        </Link>
        <h2>{campingId ? "Cập nhật Camping" : "Tạo mới Camping"}</h2>
        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label>Tên Camping:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-section">
            <label>Chọn Camping Site:</label>
            <select
              name="campingSiteId"
              value={formData.campingSiteId}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn một site --</option>
              {campingSites.length > 0 ? (
                campingSites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.location}
                  </option>
                ))
              ) : (
                <option disabled>Không có site nào</option>
              )}
            </select>
          </div>

          <div className="form-section">
            <label>Địa chỉ:</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-section">
            <label>Mô tả:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* <div className="form-row">
            <div>
              <label>Giá cơ bản:</label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div> */}

          <div className="form-section">
            <label>Ảnh đại diện (Thumbnail):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              disabled={uploading.thumbnail}
            />
            {uploading.thumbnail && <p>Đang upload ảnh vui lòng đợi...</p>}
            {formData.thumbnail && (
              <img
                src={formData.thumbnail}
                alt="thumbnail"
                className="preview-img"
              />
            )}
          </div>

          <div className="nested-section">
            <h3>Dịch vụ (Services)</h3>
            {formData.services.map((s, i) => (
              <div key={i} className="nested-item">
                <p>
                  {s.serviceName || s.serviceId} -{" "}
                  {Number(s.price).toLocaleString("vi-VN")} VND
                </p>
                <button
                  type="button"
                  onClick={() => handleRemoveItem("services", i)}
                >
                  Xóa
                </button>
              </div>
            ))}
            <div className="add-subform">
              <input
                placeholder="Tên dịch vụ"
                value={newService.serviceName}
                onChange={(e) =>
                  setNewService({ ...newService, serviceName: e.target.value })
                }
              />
              <input
                type="number"
                min="1"
                placeholder="Giá"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
              />
              <button type="button" onClick={handleAddService}>
                + Thêm dịch vụ
              </button>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            {campingId ? "Cập nhật" : "Tạo mới"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCamping;
