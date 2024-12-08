import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadFile = async (file: File) => {
  try {
    // Membuat FormData
    const formData = new FormData();
    formData.append("files", file);

    // Mengambil token dari localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Mengirimkan permintaan POST ke endpoint upload
    const response = await axios.post(API_BASE_URL + "/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token dalam header Authorization
        "Content-Type": "multipart/form-data", // Mengatur konten tipe multipart
      },
    });

    return response.data[0]; // Mengembalikan response dari server
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};
