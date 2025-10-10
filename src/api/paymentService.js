import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/payments";

export const payBooking = async (paymentData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API_BASE_URL}/booking`, paymentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Thanh toán thành công:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi thanh toán:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
