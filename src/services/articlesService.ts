import axios from "axios";
import { Article } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all articles
export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles`);
    return response.data.data; // Ambil array dari properti "data"
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

// Fetch a single article by ID
export const getArticleById = async (
  id: string,
  token: string
): Promise<Article> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header
      },
    });
    return response.data.data; // Ambil data dari properti "data"
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error; // Lemparkan error untuk ditangani di komponen
  }
};

// Create a new article
export const createArticle = async (
  article: Article,
  token: string // Token untuk autentikasi
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/articles`, article, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header
      },
    });
    return response.data; // Mengembalikan data dari API
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating article:", error.response?.data);
      throw new Error(error.response?.data.message || "Error creating article");
    } else {
      throw new Error("Unknown error");
    }
  }
};
