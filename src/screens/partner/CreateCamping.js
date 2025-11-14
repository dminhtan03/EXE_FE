import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CreateCamping.css";
import BannerHome from "../../components/BannerHome";

// ================== Cấu hình Cloudinary ==================
const CLOUDINARY_CLOUD_NAME = "dex1n6s6f"; // Cloud name của bạn
const CLOUDINARY_UPLOAD_PRESET = "uploadCampverse"; // Unsigned preset bạn tạo

const CreateCamping = () => {
  const { campingId } = useParams();
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [campingSites, setCampingSites] = useState([]);
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : "guest";

  // ================== Load camping sites ==================
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

  // ================== Form state ==================
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

  // ================== Loading states cho upload ==================
  const [uploading, setUploading] = useState({
    thumbnail: false,
    gallery: false,
    tentThumbnail: false,
  });

  // ================== Load services ==================
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

  // ================== Load camping khi cập nhật ==================
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

  // ================== Xử lý input ==================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Validation cho các trường số
    if (type === "number" && value !== "") {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) {
        alert(`${name === "basePrice" ? "Giá cơ bản" : "Sức chứa"} phải là số dương!`);
        return;
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================== Thêm/xóa Services ==================
  const handleAddService = () => {
    // Validation
    if (!newService.serviceName.trim()) {
      alert("Vui lòng nhập tên dịch vụ!");
      return;
    }
    
    const price = parseFloat(newService.price);
    if (isNaN(price) || price <= 0) {
      alert("Giá dịch vụ phải là số dương lớn hơn 0!");
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          customName: newService.serviceName.trim(),
          price: price,
        },
      ],
    }));
    setNewService({ serviceName: "", price: "" });
  };

  // ================== Thêm/xóa Tents ==================
  const handleAddTent = () => {
    // Validation
    if (!newTent.tentName.trim()) {
      alert("Vui lòng nhập tên lều!");
      return;
    }
    
    const capacity = Number(newTent.capacity);
    const pricePerNight = Number(newTent.pricePerNight);
    const quantity = Number(newTent.quantity);
    
    if (isNaN(capacity) || capacity <= 0) {
      alert("Sức chứa phải là số dương lớn hơn 0!");
      return;
    }
    
    if (isNaN(pricePerNight) || pricePerNight <= 0) {
      alert("Giá mỗi đêm phải là số dương lớn hơn 0!");
      return;
    }
    
    if (isNaN(quantity) || quantity <= 0) {
      alert("Số lượng lều phải là số dương lớn hơn 0!");
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      tents: [
        ...prev.tents,
        {
          ...newTent,
          tentName: newTent.tentName.trim(),
          capacity: capacity,
          pricePerNight: pricePerNight,
          quantity: quantity,
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

  // ================== Upload Cloudinary ==================
  const handleUploadImage = async (file) => {
    // Validation file
    if (!file) {
      alert("Vui lòng chọn file ảnh!");
      return null;
    }

    // Kiểm tra loại file
    if (!file.type.startsWith("image/")) {
      alert("File phải là ảnh (JPG, PNG, GIF, etc.)!");
      return null;
    }

    // Kiểm tra kích thước file (tối đa 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
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
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Lấy secure_url từ Cloudinary response
      const imageUrl = res.data?.secure_url;
      if (!imageUrl) {
        throw new Error("Không nhận được URL từ Cloudinary");
      }

      return imageUrl;
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Lỗi khi upload ảnh lên Cloudinary. Vui lòng thử lại!");
      return null;
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, thumbnail: true }));
    try {
      // Upload ảnh lên Cloudinary
      const imageUrl = await handleUploadImage(file);

      if (imageUrl) {
        // Lưu link ảnh từ Cloudinary vào formData
        // Link này sẽ được lưu vào database khi submit form
        setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
      }
    } finally {
      setUploading((prev) => ({ ...prev, thumbnail: false }));
      // Reset input để có thể chọn lại cùng file
      e.target.value = "";
    }
  };

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading((prev) => ({ ...prev, gallery: true }));
    try {
      // Upload tất cả ảnh lên Cloudinary
      const uploadPromises = files.map((file) => handleUploadImage(file));
      const imageUrls = await Promise.all(uploadPromises);

      // Lọc các URL hợp lệ và lưu vào formData
      // Các link này sẽ được lưu vào database khi submit form
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
      // Reset input để có thể chọn lại cùng file
      e.target.value = "";
    }
  };

  const handleTentThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, tentThumbnail: true }));
    try {
      // Upload ảnh lên Cloudinary
      const imageUrl = await handleUploadImage(file);

      if (imageUrl) {
        // Lưu link ảnh từ Cloudinary vào newTent
        // Link này sẽ được lưu vào database khi thêm tent
        setNewTent((prev) => ({ ...prev, thumbnail: imageUrl }));
      }
    } finally {
      setUploading((prev) => ({ ...prev, tentThumbnail: false }));
      // Reset input để có thể chọn lại cùng file
      e.target.value = "";
    }
  };

  // ================== Submit form ==================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation trước khi submit
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên camping!");
      return;
    }
    
    if (!formData.campingSiteId) {
      alert("Vui lòng chọn camping site!");
      return;
    }
    
    if (!formData.address.trim()) {
      alert("Vui lòng nhập địa chỉ!");
      return;
    }
    
    if (formData.basePrice && (isNaN(Number(formData.basePrice)) || Number(formData.basePrice) < 0)) {
      alert("Giá cơ bản phải là số dương!");
      return;
    }
    
    if (!formData.thumbnail) {
      alert("Vui lòng upload ảnh đại diện!");
      return;
    }
    
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
            basePrice: "",
            capacity: "1",
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
      alert(err.response?.data?.message || "Lỗi khi lưu camping. Vui lòng thử lại!");
    }
  };

  // ================== Render ==================
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
          {/* Tên Camping */}
          <div className="form-section">
            <label>Tên Camping:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Chọn Camping Site */}
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

          {/* Địa chỉ */}
          <div className="form-section">
            <label>Địa chỉ:</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mô tả */}
          <div className="form-section">
            <label>Mô tả:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Giá cơ bản, sức chứa, active */}
          <div className="form-row">
            <div>
              <label>Giá cơ bản (VND):</label>
              <input
                type="number"
                name="basePrice"
                min="0"
                step="1000"
                value={formData.basePrice}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (Number(value) >= 0)) {
                    handleChange(e);
                  }
                }}
                placeholder="Nhập giá cơ bản"
              />
            </div>
            {/* <div>
              <label>Sức chứa:</label>
              <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
            </div> */}
            <div>
              <label>Kích hoạt:</label>
              <input
                type="hidden"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Thumbnail */}
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

          {/* Tents */}
          <div className="nested-section">
            <h3>Danh sách lều (Tents)</h3>
            {formData.tents.map((t, i) => (
              <div key={i} className="nested-item">
                <p>
                  <strong>{t.tentName}</strong> - {t.capacity} người - {Number(t.pricePerNight).toLocaleString("vi-VN")} VND / đêm x{" "}
                  {t.quantity} lều
                </p>
                {t.thumbnail && (
                  <img
                    src={t.thumbnail}
                    alt={t.tentName}
                    className="preview-img"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveItem("tents", i)}
                >
                  Xóa
                </button>
              </div>
            ))}
            <div className="add-subform">
              <input
                placeholder="Tên lều"
                value={newTent.tentName}
                onChange={(e) =>
                  setNewTent({ ...newTent, tentName: e.target.value })
                }
              />
              <input
                type="number"
                min="1"
                placeholder="Sức chứa (người)"
                value={newTent.capacity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (Number(value) > 0 && Number.isInteger(Number(value)))) {
                    setNewTent({ ...newTent, capacity: value });
                  }
                }}
              />
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="Giá/đêm (VND)"
                value={newTent.pricePerNight}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (Number(value) >= 0)) {
                    setNewTent({ ...newTent, pricePerNight: value });
                  }
                }}
              />
              <input
                type="number"
                min="1"
                placeholder="Số lượng lều"
                value={newTent.quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (Number(value) > 0 && Number.isInteger(Number(value)))) {
                    setNewTent({ ...newTent, quantity: value });
                  }
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleTentThumbnailChange}
                disabled={uploading.tentThumbnail}
              />
              {uploading.tentThumbnail && (
                <p>Đang upload ảnh lên Cloudinary...</p>
              )}
              {newTent.thumbnail && (
                <img
                  src={newTent.thumbnail}
                  alt="Tent Thumbnail"
                  className="preview-img"
                />
              )}
              <button type="button" onClick={handleAddTent}>
                + Thêm lều
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="nested-section">
            <h3>Dịch vụ (Services)</h3>
            {formData.services.map((s, i) => (
              <div key={i} className="nested-item">
                <p>
                  <strong>{s.serviceName || s.serviceId}</strong> - {Number(s.price).toLocaleString("vi-VN")} VND
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
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    const selectedService = services.find(s => s.serviceName === e.target.value);
                    if (selectedService) {
                      setNewService({ 
                        serviceName: selectedService.serviceName, 
                        price: selectedService.price || "" 
                      });
                    }
                  }
                }}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
              >
                <option value="">-- Chọn dịch vụ có sẵn --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.serviceName}>
                    {service.serviceName} - {Number(service.price || 0).toLocaleString("vi-VN")} VND
                  </option>
                ))}
              </select>
              <input
                placeholder="Tên dịch vụ (hoặc chọn từ danh sách trên)"
                value={newService.serviceName}
                onChange={(e) =>
                  setNewService({ ...newService, serviceName: e.target.value })
                }
              />
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="Giá (VND)"
                value={newService.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (Number(value) >= 0)) {
                    setNewService({ ...newService, price: value });
                  }
                }}
              />
              <button type="button" onClick={handleAddService}>
                + Thêm dịch vụ
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className="nested-section">
            <h3>Bộ sưu tập ảnh (Gallery)</h3>
            <div className="gallery-preview">
              {formData.galleries.map((g, i) => (
                <div key={i} className="gallery-item">
                  <img src={g.imageUrl} alt={`gallery-${i}`} />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("galleries", i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="add-subform">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                disabled={uploading.gallery}
              />
              {uploading.gallery && <p>Đang upload ảnh lên Cloudinary...</p>}
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
