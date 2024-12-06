import axios from "axios";

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await axios.post(
      "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local/register",
      {
        email,
        username,
        password,
      }
    );
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

export const getUserData = async (token: string) => {
  try {
    const response = await axios.get(
      "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Mengembalikan data pengguna
  } catch (error) {
    throw error; // Menangani error
  }
};

const API_URL =
  "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local";

export const loginUser = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(API_URL, {
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
