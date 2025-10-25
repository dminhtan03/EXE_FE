import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/camping";

// 🏕️ Lấy toàn bộ danh sách địa điểm camping
export const getAllCampingSites = async () => {
  try {
    const res = await axios.get(API_BASE_URL);
    console.log("Lấy danh sách địa điểm camping thành công:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy danh sách địa điểm camping:", error);
    throw error;
  }
};

// 🏕️ Lấy chi tiết địa điểm camping theo ID
export const getCampingRoomsBySiteId = async (campingSiteId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${campingSiteId}`);
    console.log("✅ Camping Rooms:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API getCampingRoomsBySiteId:", error);
    return [];
  }
};
