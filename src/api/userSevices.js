import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/user";
export const register = async (
  firstName,
  lastName,
  phoneNumber,
  address,
  department,
  email,
  gender,
  password,
  role
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/register`, {
      firstName,
      lastName,
      phoneNumber,
      address,
      department,
      email,
      gender,
      password,
      role,
    });

    console.log("Register success:", res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Register failed:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};
