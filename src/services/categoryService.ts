import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export const getCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(`${API_BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header
      },
    });
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

export const getCategoryById = async (
  documentId: string
): Promise<Category> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.get(
      `${API_BASE_URL}/categories/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header
        },
      }
    );

    // Pastikan respons sesuai dengan struktur yang diharapkan
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};
