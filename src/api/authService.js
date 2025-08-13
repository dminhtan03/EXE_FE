import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/auth";

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/doLogin`, {
      email,
      password,
    });

    // Nếu backend trả token, lưu vào localStorage
    if (res.data.data.accessToken) {
      localStorage.setItem("token", res.data.data.accessToken);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
