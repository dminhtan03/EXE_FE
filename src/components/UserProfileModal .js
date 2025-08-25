import React, { useState } from "react";

const UserProfileModal = ({ isOpen, onClose, userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile || {});

  // Default user data nếu không truyền prop
  const defaultProfile = {
    firstName: "Đinh",
    lastName: "Tân",
    phoneNumber: "0866458780",
    address: "0921856516",
    department: "IT",
    email: "minhtand318@gmail.com",
    gender: "MALE",
  };

  const profile = userProfile || defaultProfile;

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Logic save profile ở đây
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
    // Có thể call API để update profile
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getGenderDisplay = (gender) => {
    return gender === "MALE" ? "Nam" : gender === "FEMALE" ? "Nữ" : "Khác";
  };

  const getAvatarInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content" style={{ borderRadius: "1rem" }}>
            {/* Modal Header */}
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                {isEditing ? "Chỉnh sửa thông tin" : "Thông tin cá nhân"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                style={{ fontSize: "0.8rem" }}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body pt-2">
              {/* Avatar Section */}
              <div className="text-center mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#0d6efd",
                    fontSize: "1.5rem",
                  }}
                >
                  {getAvatarInitials(profile.firstName, profile.lastName)}
                </div>
                <h6 className="mt-2 mb-0 fw-bold">
                  {profile.firstName} {profile.lastName}
                </h6>
                <small className="text-muted">{profile.email}</small>
              </div>

              {/* Profile Information */}
              <div className="row g-3">
                {/* First Name */}
                <div className="col-6">
                  <label className="form-label fw-semibold text-muted">
                    Họ
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedProfile.firstName || ""}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  ) : (
                    <div
                      className="p-2 bg-light rounded"
                      style={{ minHeight: "38px" }}
                    >
                      {profile.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="col-6">
                  <label className="form-label fw-semibold text-muted">
                    Tên
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedProfile.lastName || ""}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  ) : (
                    <div
                      className="p-2 bg-light rounded"
                      style={{ minHeight: "38px" }}
                    >
                      {profile.lastName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="col-12">
                  <label className="form-label fw-semibold text-muted">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      value={editedProfile.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  ) : (
                    <div
                      className="p-2 bg-light rounded d-flex align-items-center"
                      style={{ minHeight: "38px" }}
                    >
                      <span className="me-2">📧</span>
                      {profile.email}
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="col-6">
                  <label className="form-label fw-semibold text-muted">
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      value={editedProfile.phoneNumber || ""}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                    />
                  ) : (
                    <div
                      className="p-2 bg-light rounded d-flex align-items-center"
                      style={{ minHeight: "38px" }}
                    >
                      <span className="me-2">📱</span>
                      {profile.phoneNumber}
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div className="col-6">
                  <label className="form-label fw-semibold text-muted">
                    Giới tính
                  </label>
                  {isEditing ? (
                    <select
                      className="form-select"
                      value={editedProfile.gender || ""}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                    >
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                      <option value="OTHER">Khác</option>
                    </select>
                  ) : (
                    <div
                      className="p-2 bg-light rounded d-flex align-items-center"
                      style={{ minHeight: "38px" }}
                    >
                      <span className="me-2">
                        {profile.gender === "MALE" ? "👨" : "👩"}
                      </span>
                      {getGenderDisplay(profile.gender)}
                    </div>
                  )}
                </div>

                {/* Department */}
                <div className="col-6">
                  <label className="form-label fw-semibold text-muted">
                    Phòng ban
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedProfile.department || ""}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                    />
                  ) : (
                    <div
                      className="p-2 bg-light rounded d-flex align-items-center"
                      style={{ minHeight: "38px" }}
                    >
                      <span className="me-2">🏢</span>
                      {profile.department}
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="col-6">
                  <label className="form-label fw-semibold text-muted">
                    Địa chỉ
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedProfile.address || ""}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  ) : (
                    <div
                      className="p-2 bg-light rounded d-flex align-items-center"
                      style={{ minHeight: "38px" }}
                    >
                      <span className="me-2">📍</span>
                      {profile.address}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer border-0 pt-2">
              {isEditing ? (
                <div className="d-flex gap-2 w-100">
                  <button
                    type="button"
                    className="btn btn-outline-secondary flex-fill"
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary flex-fill"
                    onClick={handleSave}
                  >
                    Lưu thay đổi
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2 w-100">
                  <button
                    type="button"
                    className="btn btn-outline-primary flex-fill"
                    onClick={() => {
                      setEditedProfile(profile);
                      setIsEditing(true);
                    }}
                  >
                    ✏️ Chỉnh sửa
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={onClose}
                  >
                    Đóng
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Demo Component để test modal
const ProfileModalDemo = () => {
  const [showModal, setShowModal] = useState(false);

  const sampleUser = {
    firstName: "Đinh",
    lastName: "Tân",
    phoneNumber: "0866458780",
    address: "0921856516",
    department: "IT",
    email: "minhtand318@gmail.com",
    gender: "MALE",
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="mb-4">User Profile Modal Demo</h2>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShowModal(true)}
        >
          Xem Profile 👤
        </button>
      </div>

      <UserProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userProfile={sampleUser}
      />
    </div>
  );
};

export default ProfileModalDemo;
