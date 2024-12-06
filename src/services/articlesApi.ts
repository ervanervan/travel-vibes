import axios from "axios";
import { Article, PaginationMeta } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Mendapatkan semua artikel dengan pagination
export const getArticles = async (
  page = 1,
  pageSize = 25
): Promise<{ articles: Article[]; meta: PaginationMeta }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`, {
      params: { page, pageSize },
    });

    return {
      articles: response.data.data as Article[], // Tipe array artikel
      meta: response.data.meta as PaginationMeta, // Tipe meta data
    };
  } catch (error) {
    throw error;
  }
};

// Mendapatkan artikel berdasarkan ID
export const getArticleById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
    return response.data; // Mengembalikan data artikel
  } catch (error) {
    throw error;
  }
};

// Membuat artikel baru
export const createArticle = async (token: string, articleData: object) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/articles`, articleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Data artikel yang baru dibuat
  } catch (error) {
    throw error;
  }
};

// Memperbarui artikel
export const updateArticle = async (
  token: string,
  id: number,
  articleData: object
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/articles/${id}`,
      articleData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Artikel yang diperbarui
  } catch (error) {
    throw error;
  }
};

// Menghapus artikel
export const deleteArticle = async (token: string, id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Konfirmasi penghapusan
  } catch (error) {
    throw error;
  }
};
