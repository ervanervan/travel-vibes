import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/local/register`, {
      email,
      username,
      password,
    });
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

export const getUserData = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Mengembalikan data pengguna
  } catch (error) {
    throw error; // Menangani error
  }
};

export const loginUser = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/local`, {
      identifier,
      password,
    });
    return response.data; // Mengembalikan data token dan user
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Jika error berasal dari Axios
      throw error.response?.data?.message || "Login failed";
    }
    throw "An unknown error occurred";
  }
};
